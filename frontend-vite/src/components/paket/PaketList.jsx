import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { API_URL } from "../../utils/Constans";
import swal from "sweetalert";
import { GoDiffAdded } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";

const PaketList = () => {
  const [paket, setPaket] = useState([]);
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  // console.log(produks.filter(produk=>produk.nama_produk.toLowerCase().includes("pak")))
  useEffect(() => {
    getPakets();
  }, []);

  const getPakets = async () => {
    const response = await axios.get(API_URL + `pakets`);
    setPaket(response.data);
  };

  const deletePaket = async (paketId) => {
    swal({
      title: "Yakin Hapus?",
      text: "Setelah dihapus, Anda tidak akan dapat memulihkan data ini lagi loh..!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(API_URL + `paket/${paketId}`);
        getPakets();
        swal("Oke! Data Paket sudah berhasil dihapus!", {
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
                <h1>Paket</h1>
                <div>
                  <Link to="/paket/add" className="btn btn-primary mt-5">
                    <GoDiffAdded className="mr-2" />
                    Tambah Paket
                  </Link>
                </div>
                {/* <div className="alert alert-success" role="alert">
                  {msg}
                </div> */}
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Paket</a>
                  </li>
                  <li className="breadcrumb-item active">Daftar Paket</li>
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
              <h3 className="card-title">Daftar Paket</h3>
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
                    <th>Nama Paket</th>
                    <th>Speed</th>
                    <th>Harga</th>
                    <th>Hrg Perorata</th>
                    <th>Nama produk</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paket
                    .filter(
                      (pkt) =>
                        pkt.nama_paket.toLowerCase().includes(query) ||
                        pkt.user.name.toLowerCase().includes(query)
                    )
                    .map((paket, index) => (
                      <tr key={paket.uuid}>
                        <td>{index + 1}</td>
                        <td>{paket.nama_paket}</td>
                        <td>{paket.speed}</td>
                        <td>{paket.harga}</td>
                        <td>{paket.hrg_prorata}</td>
                        <td>{paket.produk.nama_produk}</td>
                        <td>{paket.user.name}</td>
                        <td>
                          <NavLink
                            to={`/paket/edit/${paket.uuid}`}
                            className="btn btn-info"
                          >
                            <FiEdit />
                          </NavLink>
                          <Button
                            onClick={() => deletePaket(paket.uuid)}
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

export default PaketList;
