import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { BsSearch } from "react-icons/bs";

const ProdukList = () => {
  const [pelanggan, setPelanggan] = useState([]);
  const [msg, setMsg] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    getPelanggans();
  }, []);

  const getPelanggans = async () => {
    const response = await axios.get(`http://localhost:5000/pelanggans`);
    setPelanggan(response.data);
  };

  const deletePeelanggan = async (pelangganId) => {
    await axios.delete(`http://localhost:5000/pelanggan/${pelangganId}`);
    getPelanggans();
  };
  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Pelanggan</h1>
                <div>
                  <Link to="/pelanggan/add" className="button is-primary mt-5">
                    Add
                  </Link>
                </div>
                {/* <div className="alert alert-success" role="alert">
                  {msg}
                </div> */}
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Pelanggan</a>
                  </li>
                  <li className="breadcrumb-item active">Daftar Pelanggan</li>
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
              <h3 className="card-title">Daftar Pelanggan</h3>
              <div className="d-flex  align-items-center">
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
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>Tgl Lahir</th>
                    <th>J_Kelamin</th>
                    <th>Alamat</th>
                    <th>No Kontak</th>
                    <th>Email</th>
                    <th>Pekerjaan</th>
                    <th>Tipe Koneksi</th>
                    <th>Ip_Address</th>
                    <th>Tgl Koneksi</th>
                    <th>Status</th>
                    <th>Paket</th>
                    <th>User</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pelanggan.map((plg, index) => (
                    <tr key={plg.uuid}>
                      <td>{index + 1}</td>
                      <td>{plg.nik}</td>
                      <td>{plg.nama}</td>
                      <td>{plg.tgl_lahir}</td>
                      <td>{plg.j_kelamin}</td>
                      <td>{plg.alamat}</td>
                      <td>{plg.no_kontak}</td>
                      <td>{plg.email}</td>
                      <td>{plg.pekerjaan}</td>
                      <td>{plg.tipe_koneksi}</td>
                      <td>{plg.ip_address}</td>
                      <td>{plg.tgl_koneksi}</td>
                      <td>{plg.status_koneksi}</td>
                      <td>{plg.paket.nama_paket}</td>
                      <td>{plg.user.name}</td>
                      <td>
                        <NavLink
                          to={`/pelanggan/edit/${pelanggan.uuid}`}
                          className="btn btn-info"
                        >
                          Edit
                        </NavLink>
                        <Button
                          onClick={() => deletePeelanggan(plg.uuid)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Hapus
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

export default ProdukList;
