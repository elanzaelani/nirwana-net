import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../utils/Constans";
import { FiEdit } from "react-icons/fi";

const FormEditPaket = () => {
  
  const [produk, setProduk] = useState([]);
  const [namaPaket, setNamaPaket] = useState("");
  const [speed, setSpeed] = useState("");
  const [harga, setHarga] = useState("");
  const [hrgProrata, setHargaProrata] = useState("");
  const [produkId, setProdukId] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPaketById = async () => {
      try {
        const response = await axios.get(API_URL+`paket/${id}`);
        setNamaPaket(response.data.nama_paket);
        setSpeed(response.data.speed);
        setHarga(response.data.harga);
        setHargaProrata(response.data.hrg_prorata);
        setProdukId(response.data.produkId);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPaketById();
  }, [id]);

  useEffect(() => {
    getProduks();
  }, []);

  const getProduks = async () => {
    const response = await axios.get(API_URL + `produks`);
    setProduk(response.data);
  };

  const updatePaket = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(API_URL + `paket/${id}`, {
        nama_paket: namaPaket,
        speed:speed,
        harga:harga,
        hrg_prorata:hrgProrata,
        produkId:produkId,

      });
      swal("Oke", "data Paket Berhasil Di Edit", "success", {
        timer: 1500,
      });
      navigate("/paket");

      navigate("/paket");
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
                <h1>Paket</h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Paket</a>
                  </li>
                  <li className="breadcrumb-item active">Edit Paket</li>
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
              <h3 className="card-title">Edit Paket</h3>
            </div>
            <div className="container">
              <div className="col">
                <div className="row">
                  <form onSubmit={updatePaket}>
                    <p className="has-text-centered">{msg}</p>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="nama-paket">Nama Paket</label>
                        <input
                          type="text"
                          className="input"
                          value={namaPaket}
                          placeholder="Nama Paket"
                          onChange={(e) => setNamaPaket(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="speed">Speed</label>
                        <input
                          type="text"
                          className="input"
                          value={speed}
                          placeholder="Speed"
                          onChange={(e) => setSpeed(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="harga">Harga</label>
                        <input
                        name="harga"
                          type="text"
                          className="input"
                          value={harga}
                          placeholder="Harga"
                          onChange={(e) => setHarga(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="hrg-prorata">Harga prorata</label>
                        <input
                          type="text"
                          className="input"
                          value={hrgProrata}
                          placeholder="Harga prorata"
                          onChange={(e) => setHargaProrata(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="produk">Produk </label>
                        <select
                          class="form-control"
                          value={produkId}
                          onChange={(e) => setProdukId(e.target.value)}
                        >
                          {produk.map((prd) => (
                            <option key={prd.id} value={prd.id}>
                              {prd.nama_produk}
                            </option>
                          ))}
                          <option value="">Pilih Produk</option>
                        </select>
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

export default FormEditPaket;
