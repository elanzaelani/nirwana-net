import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../utils/Constans";
import { FiSave } from "react-icons/fi";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormAddPelanggan = () => {
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [tglLahir, setTglLahir] = useState("")
  const [jKelamin, setJKelamin] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noKontak, setNoKontak] = useState("");
  const [email, setEmail] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [tipeKoneksi, setTipeKoneksi] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [tglKoneksi, settglKoneksi] = useState("");
  const [statusKoneksi, setStatusKoneksi] = useState("");
  const [paketId, setPaketId] = useState("");
  const [msg, setMsg] = useState("");
  const [paket, setPaket] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPakets();
  }, []);

  const getPakets = async () => {
    const response = await axios.get(API_URL + `pakets`);
    setPaket(response.data);
  };



  const savePelanggan = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "pelanggan", {
        nik: nik,
        nama: nama,
        tgl_lahir: tglLahir,
        j_kelamin: jKelamin,
        alamat: alamat,
        no_kontak: noKontak,
        email: email,
        pekerjaan: pekerjaan,
        tipe_koneksi: tipeKoneksi,
        ip_address: ipAddress,
        tgl_koneksi: tglKoneksi,
        status_koneksi: statusKoneksi,
        paketId: paketId,
      });
      swal("Mantap", "Data Pelanggan Berhasil Tersimpan", "success", {
        timer: 1500,
      });
      navigate("/pelanggan");
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
                <h1>Pelanggan</h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Pelanggan</a>
                  </li>
                  <li className="breadcrumb-item active">Tambah Pelanggan</li>
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
              <h3 className="card-title">Tambah Pelanggan</h3>
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <form onSubmit={savePelanggan}>
                    <p className="has-text-centered">{msg}</p>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="nik">NIk</label>
                        <input
                          type="text"
                          className="input"
                          name="nik"
                          value={nik}
                          placeholder="NIK"
                          onChange={(e) => setNik(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="nama-pelanggan">Nama </label>
                        <input
                          type="text"
                          className="input"
                          name="nama-pelanggan"
                          value={nama}
                          placeholder="Nama Pelanggan"
                          onChange={(e) => setNama(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="tgl-lahir">Tgl Lahir </label>
                        <input
                    type="date"
                    className="input"
                    name="tgl-lahir"
                    value={tglLahir}
                    placeholder="Tgl Lahir"
                    onChange={(e) => setTglLahir(e.target.value)}
                    required
                       /></div>
                          {/* <DatePicker
                            selected={tglLahir}
                            // value={tglLahir}
                            onChange={tglLahir=>setTglLahir(tglLahir)}
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()}
                            isClearable
                            showYearDropdown
                            scrollableYearDropdown
                            scrollableMonthYearDropdown
                          />
                      </div> */}

                      <div className="form-group">
                        <label htmlFor="jenis-kelamin">Jenis kelamin </label>
                        <select
                          className="form-control"
                          value={jKelamin}
                          onChange={(e) => setJKelamin(e.target.value)}
                        >
                          <option placeholder="Jneis kelamin"></option>
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="alamat">Alamat </label>
                        <input
                          type="text"
                          className="input"
                          name="alamat"
                          value={alamat}
                          placeholder="Alamat"
                          onChange={(e) => setAlamat(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="no-kontak">No Kontak </label>
                        <input
                          type="text"
                          className="input"
                          name="no-kontak"
                          value={noKontak}
                          placeholder="No Kontak"
                          onChange={(e) => setNoKontak(e.target.value)}
                          required
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
                        <label htmlFor="pekerjaan">Pekerjaan </label>
                        <input
                          type="text"
                          className="input"
                          name="pekerjaan"
                          value={pekerjaan}
                          placeholder="Pekerjaan"
                          onChange={(e) => setPekerjaan(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="tipeKoneksi">Tipe Koneksi </label>
                        <input
                          type="text"
                          className="input"
                          name="tipeKoneksi"
                          value={tipeKoneksi}
                          placeholder="Tipe Koneksi"
                          onChange={(e) => setTipeKoneksi(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="ipAddress">Ip Address </label>
                        <input
                          type="text"
                          className="input"
                          name="ipAddress"
                          value={ipAddress}
                          placeholder="Ip Address"
                          onChange={(e) => setIpAddress(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="tglKoneksi">Tanggal Koneksi </label>
                        <input
                    type="date"
                    className="input"
                    name="tgl-lahir"
                    value={tglKoneksi}
                    placeholder="Tgl Lahir"
                    onChange={(e) => settglKoneksi(e.target.value)}
                       /></div>
                        {/* <DatePicker
                            selected={tglKoneksi}
                            // value={tglLahir}
                            onChange={tglKoneksi=>settglKoneksi(tglKoneksi)}
                            dateFormat="dd/MM/yyyy"
                            // maxDate={new Date()}
                            isClearable
                            showYearDropdown
                            scrollableYearDropdown
                            scrollableMonthYearDropdown
                          /> */}

                      <div className="form-group">
                        <label htmlFor="statusKoneksi">Status Koneksi </label>
                        <input
                          type="text"
                          className="input"
                          name="statusKoneksi"
                          value={statusKoneksi}
                          placeholder="Status Koneksi"
                          onChange={(e) => setStatusKoneksi(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="Paket">Paket </label>
                        <select
                          class="form-control"
                          value={paketId}
                          onChange={(e) => setPaketId(e.target.value)}
                        >
                          {paket.map((pkt) => (
                            <option key={pkt.id} value={pkt.id}>
                              {pkt.nama_paket}
                            </option>
                          ))}
                          <option value="">Pilih paket</option>
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

export default FormAddPelanggan;
