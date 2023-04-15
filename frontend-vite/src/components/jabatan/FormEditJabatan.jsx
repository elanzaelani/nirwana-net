import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../utils/Constans";
import { FiEdit } from "react-icons/fi";

const FormEditJabatan = () => {
  const [namaJabatan, setNamaJabatan] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getJabatanById = async () => {
      try {
        const response = await axios.get(API_URL+`jabatan/${id}`);
        setNamaJabatan(response.data.nama_jab);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getJabatanById();
  }, [id]);

  const updateJabatan = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(API_URL + `jabatan/${id}`, {
        nama_jab: namaJabatan,
      });
      swal("Oke", "data Jabatan Berhasil Di Edit", "success", {
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
                <h1>jabatan</h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="#">jabatan</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit jabatan</li>
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
              <h3 className="card-title">Edit jabatan</h3>
            </div>
            <div className="container">
              <div className="col">
                <div className="row">
                  <form onSubmit={updateJabatan}>
                    <p className="has-text-centered">{msg}</p>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="nama-jabatan">Nama jabatan</label>
                        <input
                          type="text"
                          name="nama-jabatan"
                          className="input"
                          value={namaJabatan}
                          placeholder="Nama jabatan"
                          onChange={(e) => setNamaJabatan(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        <FiEdit/> Edit
                      </button>
                    </div>
                    <div className="card-footer">
                    </div>
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

export default FormEditJabatan;
