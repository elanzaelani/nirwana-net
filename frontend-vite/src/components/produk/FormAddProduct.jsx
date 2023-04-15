import React, { useState } from "react";
import axios from "axios";
import {  Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../utils/Constans";
import { FiSave } from "react-icons/fi";

const FormAddProduct = () => {
  const [namaProduk, setNamaProduk] = useState("");
  const [satuan, setSatuan] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "produk", {
        nama_produk: namaProduk,
        satuan: satuan,
      });
      swal("Mantap", "data Produk Berhasil Tersimpan", "success", {
        timer: 1500,
      });
      navigate("/produk");
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
                <h1>Produk</h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="#">Produk</Link>
                  </li>
                  <li className="breadcrumb-item active">Daftar Produk</li>
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
              <h3 className="card-title">Tambah Produk</h3>
            </div>

            <form onSubmit={saveProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="nama-produk">Nama Produk</label>
                  <input
                    type="text"
                    className="input"
                    value={namaProduk}
                    placeholder="Nama Produk"
                    onChange={(e) => setNamaProduk(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nama-produk">Satuan</label>
                  <input
                    type="text"
                    className="input"
                    value={satuan}
                    placeholder="Satuan"
                    onChange={(e) => setSatuan(e.target.value)}
                  />
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  <FiSave /> Simpan
                </button>
              </div>
            </form>
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default FormAddProduct;
