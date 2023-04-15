import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Edituser from "../../pages/user/EditUser";
import { FiEdit } from "react-icons/fi";
import swal from "sweetalert";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
  

    getUserById();
  }, [id]);

  
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/user/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      swal("Oke", "Data User Berhasil Di Edit", "success", {
        timer: 1500,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
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
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Users</a>
                  </li>
                  <li className="breadcrumb-item active">Tambah Users</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Tambah Users</h3>
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <form onSubmit={updateUser}>
                    <p className="has-text-centered">{msg}</p>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="namaUser">Nama Users</label>
                        <input
                          type="text"
                          className="input"
                          name="namaUser"
                          value={name}
                          placeholder="Nama Users"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email </label>
                        <input
                          type="email"
                          className="input"
                          name="email"
                          value={email}
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password </label>
                        <input
                          type="password"
                          className="input"
                          name="password"
                          value={password}
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="confPassword">
                          Confirmasi Password
                        </label>
                        <input
                          type="password"
                          className="input"
                          name="confPassword"
                          value={confPassword}
                          placeholder="Password"
                          onChange={(e) => setConfPassword(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="role">Role </label>
                        <select
                          class="form-control"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          
                          <option value="">-- Pilih Role --</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>

                      <button type="submit" className="btn btn-primary">
                      <FiEdit /> Edit
                      </button>
                    </div>
                    <div className="card-footer"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default FormEditUser;
