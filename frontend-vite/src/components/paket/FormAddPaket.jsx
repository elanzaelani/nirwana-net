import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../utils/Constans";
import { FiSave } from "react-icons/fi";
import { useEffect } from "react";

const FormAddPaket = () => {
  const [produk,setProduk]=useState([])
  const [namaPaket, setNamaPaket] = useState("");
  const [speed, setSpeed] = useState("");
  const [harga, setHarga] = useState("");
  const [hargaProrata, sethargaProrata] = useState("");
  const [produkId, setProdukId] = useState("");
  const [msg,setMsg]=useState("")
  
  const navigate = useNavigate();
  
 

  useEffect(() => {
    getProduks();
  }, []);

  const getProduks = async () => {
    const response = await axios.get(API_URL + `produks`);
    setProduk(response.data);
  };
  console.log(produk);

  const savePaket = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "paket", {
        nama_paket: namaPaket,
        speed: speed,
        harga: harga,
        hrg_prorata: hargaProrata,
        produkId: produkId
        
      });
      swal("Mantap", "Data Paket Berhasil Tersimpan", "success", {
        timer: 1500,
      });
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
                  <li className="breadcrumb-item active">Tambah Paket</li>
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
              <h3 className="card-title">Tambah Paket</h3>
            </div>
          <div className="container">
              <div className="row">
            <div className="col">
              <form onSubmit={savePaket}>
              <p className="has-text-centered">{msg}</p>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="nama_paket">Nama Paket</label>
                  <input
                    type="text"
                    className="input"
                    name="nama_paket"
                    value={namaPaket}
                    placeholder="Nama Paket"
                    onChange={(e) => setNamaPaket(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="speed">Speed </label>
                  <input
                    type="text"
                    className="input"
                    name="speed"
                    value={speed}
                    placeholder="Speed"
                    onChange={(e) => setSpeed(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="harga">Harga</label>
                  <input
                    type="number"
                    className="input"
                    name="harga"
                    value={harga}
                    placeholder="Harga"
                    onChange={(e) => setHarga(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="harga">Harga Prorata</label>
                  <input
                    type="number"
                    className="input"
                    name="harga_prorata"
                    value={hargaProrata}
                    placeholder="Harga Prorata"
                    onChange={(e) => sethargaProrata(e.target.value)}
                 />
                </div>
             
               

                <div className="form-group">
                  <label htmlFor="produk">Produk </label>
                  <select
                    class="form-control"
                    value={produkId}
                    onChange={(e) =>setProdukId(e.target.value)}
                  >
                    {produk.map((prd) => (
                      <option key={prd.id}value={prd.id} >
                        {prd.nama_produk}
                      </option>
                    ))}
                    <option value="">Pilih Produk</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary">
                  <FiSave /> Simpan
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

export default FormAddPaket;
