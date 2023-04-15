import React, { useState, useEffect } from "react";
import  axios  from "axios";
import { Link ,NavLink} from "react-router-dom";
import { GoDiffAdded } from "react-icons/go";
import { BsSearch, BsTrash } from "react-icons/bs";
import Button from "react-bootstrap/esm/Button";
import { FiEdit } from "react-icons/fi";
import { API_URL } from "../../utils/Constans";
import swal from "sweetalert";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  // const getUsers = async () => {
  //   const response = await axios.get(`http://localhost:5000/users`);
  //   setUsers(response.data);
  // };

  const getUsers = async () => {
    const response = await axios.get(API_URL+`users`);
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    // await axios.delete(API_URL+`user/${userId}`);
    // getUsers()
    swal({
      title: "Yakin Hapus?",
      text: "Setelah dihapus, Anda tidak akan dapat memulihkan data ini lagi loh..!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(API_URL + `user/${userId}`);
        getUsers();
        swal("Oke! Data Users sudah berhasil dihapus!", {
          icon: "success",
          timer: 1500,
        });
      } else {
        swal("ciyehh Gak jadi, berarti data Anda Aman ;) ", {
          timer: 1500,
          buttons: false,
        });
      }
    });

  };

  return (
    <div>
     <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Users</h1>
                <div>
                  <Link to="/users/add" className="btn btn-primary mt-5">
                    <GoDiffAdded className="mr-2" />
                    Tambah Users
                  </Link>
                </div>
                {/* <div className="alert alert-success" role="alert">
                  {msg}
                </div> */}
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Users</a>
                  </li>
                  <li className="breadcrumb-item active">Daftar Users</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h3 className="card-title">Daftar Users</h3>
              <div className="d-flex justify-content-center align-items-center">
                <BsSearch size={25} className="mr-3" />
                <input
                  type="text"
                  className="input w-70 "
                  placeholder="Cari... "
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div>
              {/* <p className="has-text-centered">{msg}</p> */}
            </div>
            <div className="card-body table-responsive p-0">
              <table id="example1" className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(
                      (user) =>
                        user.name.toLowerCase().includes(query) ||
                        user.email.toLowerCase().includes(query)
                    )
                    .map((user, index) => (
                      <tr key={user.uuid}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <NavLink
                            to={`/user/edit/${user.uuid}`}
                            className="btn btn-info"
                          >
                            <FiEdit />
                          </NavLink>
                          <Button
                            onClick={() => deleteUser(user.uuid)}
                            type="button"
                            className="btn btn-danger"
                          >
                            <BsTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default UserList;
