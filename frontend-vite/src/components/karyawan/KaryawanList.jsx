import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { API_URL } from "../../utils/Constans";
import swal from "sweetalert";
import { GoDiffAdded } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";

const KaryawanList = () => {
  const [karyawan, setkaryawan] = useState([]);
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  // console.log(produks.filter(produk=>produk.nama_produk.toLowerCase().includes("pak")))
  useEffect(() => {
    getKaryawans();
  }, []);

  const getKaryawans = async () => {
    const response = await axios.get(API_URL + `karyawans`);
    setkaryawan(response.data);
  };

  const deleteKaryawan = async (karyawanId) => {
    swal({
      title: "Yakin Hapus?",
      text: "Setelah dihapus, Anda tidak akan dapat memulihkan data ini lagi loh..!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(API_URL + `karyawan/${karyawanId}`);
        getKaryawans();
        swal("Oke! Data Karyawan sudah berhasil dihapus!", {
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
                <h1>Karyawan</h1>
                <div>
                  <Link to="/karyawan/add" className="btn btn-primary mt-5">
                    <GoDiffAdded className="mr-2" />
                    Tambah Karyawan
                  </Link>
                </div>
                {/* <div className="alert alert-success" role="alert">
                  {msg}
                </div> */}
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Karyawan</a>
                  </li>
                  <li className="breadcrumb-item active">Daftar Karyawan</li>
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
              <h3 className="card-title">Daftar Karyawan</h3>
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
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>Tgl Lahir</th>
                    <th>J Kelamin</th>
                    <th>Alamat</th>
                    <th>No Kontak</th>
                    <th style={{width:"150px"}}>Foto</th>
                    <th>Status</th>
                    <th>Jabatan</th>
                    <th>User</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {karyawan
                    .filter(
                      (kry) =>
                        kry.nama.toLowerCase().includes(query) ||
                        kry.alamat.toLowerCase().includes(query)
                    )
                    .map((kry, index) => (
                      <tr key={kry.uuid}>
                        <td>{index + 1}</td>
                        <td>{kry.nik}</td>
                        <td>{kry.nama}</td>
                        <td>{kry.tgl_lahir}</td>
                        <td>{kry.j_kelamin}</td>
                        <td>{kry.alamat}</td>
                        <td>{kry.no_kontak}</td>
                        <td>
                          <img src={kry.url}
                          width={60} alt="foto" />
                        </td>
                        <td>{kry.status}</td>
                        <td>{kry.jabatan.nama_jab}</td>
                        <td>{kry.user.name}</td>
                        <td>
                          <Link to={`/karyawan/edit/${kry.uuid}`}
                            className="btn btn-info"
                          >
                            <FiEdit />
                          </Link>
                          <Button
                            onClick={() => deleteKaryawan(kry.uuid)}
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

export default KaryawanList;
