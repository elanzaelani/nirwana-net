import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../utils/Constans";
import { FiEdit } from "react-icons/fi";

const FormEditProduct = () => {
  const [namaProduk, setNamaProduk] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/produk/${id}`);
        setNamaProduk(response.data.nama_produk);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(API_URL + `produk/${id}`, {
        nama_produk: namaProduk,
      });
      swal("Oke", "data Produk Berhasil Di Edit", "success", {
        timer: 1500,
      });
      navigate("/produk");

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
                  <li className="breadcrumb-item active">Edit Produk</li>
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
              <h3 className="card-title">Edit Produk</h3>
            </div>
            <div className="container">
              <div className="col">
                <div className="row">
                  <form onSubmit={updateProduct}>
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

export default FormEditProduct;
