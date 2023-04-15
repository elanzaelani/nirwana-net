import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../utils/Constans";
import { FiSave } from "react-icons/fi";

const FormAddJabatan = () => {
  const [namaJabatan, setNamaJabatan] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveJabatan = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "jabatan", {
        nama_jab: namaJabatan,
      });
      swal("Mantap", "data Jabatan Berhasil Tersimpan", "success", {
        timer: 1500,
      });
      navigate("/jabatan");
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
                <h1>Jabatan</h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/jabatan">Jabatan</Link>
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
            <div className="card-header">
              <h3 className="card-title">Tambah Jabatan</h3>
            </div>

            <form onSubmit={saveJabatan}>
              <p className="has-text-centered">{msg}</p>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="nama-jab">Nama Jabatan</label>
                  <input
                    type="text"
                    name="nama-jab"
                    className="input"
                    value={namaJabatan}
                    placeholder="Nama Jabatan"
                    onChange={(e) => setNamaJabatan(e.target.value)}
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

export default FormAddJabatan;
