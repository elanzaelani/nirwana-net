import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
// import { faBloggerB } from "react-icons/fa";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { API_URL } from "../../utils/Constans";
import swal from "sweetalert";
import { GoDiffAdded } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";

const JabatanList = () => {
  const [jabatans, setJabatan] = useState([]);
  const [msg, setMsg] = useState("");
  const [query, setQuery] = useState("");

  // console.log(produks.filter(jabatan=>jabatan.nama_produk.toLowerCase().includes("pak")))
  useEffect(() => {
    getJabatans();
  }, []);

  const getJabatans = async () => {
    const response = await axios.get(API_URL + `jabatans`);
    setJabatan(response.data);
  };

  const deleteJabatan = async (jabatanId) => {
    swal({
      title: "Yakin Hapus?",
      text: "Setelah dihapus, Anda tidak akan dapat memulihkan data ini lagi loh..!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(API_URL + `jabatan/${jabatanId}`);
        getJabatans();
        swal("Poof! Your imaginary file has been deleted!", {
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
                <h1>Jabatan</h1>
                <div>
                  <Link to="/jabatan/add" className="btn btn-primary mt-5">
                    <GoDiffAdded className="mr-2" />
                    Tambah Jabatan
                  </Link>
                </div>
                {/* <div className="alert alert-success" role="alert">
                  {msg}
                </div> */}
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Jabatan</a>
                  </li>
                  <li className="breadcrumb-item active">Daftar Jabatan</li>
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
              <h3 className="card-title">Daftar Jabatan</h3>
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
              <p className="has-text-centered">{msg}</p>
            </div>
            <div className="card-body table-responsive p-0">
              <table id="example1" className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Jabatan</th>
                    <th>User</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {jabatans
                    .filter(
                      (jabatan) =>
                        jabatan.nama_jab.toLowerCase().includes(query) ||
                        jabatan.user.name.toLowerCase().includes(query)
                    )
                    .map((jabatan, index) => (
                      <tr key={jabatan.uuid}>
                        <td>{index + 1}</td>
                        <td>{jabatan.nama_jab}</td>
                        <td>{jabatan.user.name}</td>
                        <td>
                          <NavLink
                            to={`/jabatan/edit/${jabatan.uuid}`}
                            className="btn btn-info"
                          >
                            <FiEdit />
                          </NavLink>
                          <Button
                            onClick={() => deleteJabatan(jabatan.uuid)}
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

export default JabatanList;
