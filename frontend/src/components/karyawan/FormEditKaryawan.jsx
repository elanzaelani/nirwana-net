import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../utils/Constans";
import { FiEdit } from "react-icons/fi";
import { useEffect } from "react";
import moment from "moment";

const FormEditKaryawan = () => {
  const [jabatans, setJabatan] = useState([]);
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [tglLahir, setTglLahir] = useState();
  const [jKelamin, setJKelamin] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noKontak, setNoKontak] = useState("");
  const [file, setFile] = useState("");
  const [status, setStatus] = useState("");
  const [jabId, setJabId] = useState("");
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getKaryawanById = async () => {
      try {
        const response = await axios.get(API_URL + `karyawan/${id}`);
        setNama(response.data.nama);
        setNik(response.data.nik);
        setTglLahir(moment(response.data.tgl_lahir).format("YYYY-MM-DD"));
        setJKelamin(response.data.j_kelamin);
        setAlamat(response.data.alamat);
        setStatus(response.data.status);
        setNoKontak(response.data.no_kontak);
        setJabId(response.data.jabatan.nama_jab);
        setFile(response.data.foto);
        setPreview(response.data.url);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
    getKaryawanById();
  }, [id]);

  useEffect(() => {
    getJabatans();
  }, []);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const getJabatans = async () => {
    const response = await axios.get(API_URL + `jabatans`);
    setJabatan(response.data);
  };

  const saveKaryawan = async (e) => {
    e.preventDefault();
    const formData = new FormData(tglLahir);
    formData.append("nik", nik);
    formData.append("nama", nama);
    formData.append("tgl_lahir", tglLahir);
    formData.append("j_kelamin", jKelamin);
    formData.append("alamat", alamat);
    formData.append("no_kontak", noKontak);
    formData.append("status", status);
    formData.append("jabId", jabId);
    formData.append("foto", file);
    try {
      await axios.post(API_URL + "karyawan", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      swal("Mantap", "Data Karyawan Berhasil Tersimpan", "success", {
        timer: 1500,
      });
      navigate("/karyawan");
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
                <h1>Karyawan</h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="#">Karyawan</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Karyawan</li>
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
              <h3 className="card-title">Edit Karyawan</h3>
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <form onSubmit={saveKaryawan}>
                    <p className="has-text-centered">{msg}</p>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="nik">NIK</label>
                        <input
                          type="text"
                          className="input"
                          name="nik"
                          value={nik}
                          placeholder="NIK"
                          onChange={(e) => setNik(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="nama_karyawan">Nama Karyawan</label>
                        <input
                          type="text"
                          className="input"
                          name="nama_karyawan"
                          value={nama}
                          placeholder="Nama Karyawan"
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
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="j_kelamin">Jenis kelamin</label>
                        <select
                          className="form-control"
                          value={jKelamin}
                          required
                          onChange={(e) => setJKelamin(e.target.value)}
                        >
                          <option value="">Pilih Jenis kelamin</option>
                          <option value="Laki - laki">Laki - laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="alamat">Alamat</label>
                        <input
                          type="text"
                          className="input"
                          name="alamat"
                          value={alamat}
                          placeholder="Alamat"
                          onChange={(e) => setAlamat(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="no-kontak">No Kontak</label>
                        <input
                          type="text"
                          className="input"
                          name="kontak"
                          value={noKontak}
                          placeholder="No Kontak"
                          onChange={(e) => setNoKontak(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input
                          type="text"
                          className="input"
                          name="status"
                          value={status}
                          placeholder="No status"
                          onChange={(e) => setStatus(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="jabatan">Jabatan </label>
                        <select
                          className="form-control"
                          value={jabId}
                          required
                          onChange={(e) => setJabId(e.target.value)}
                        >
                          {jabatans.map((jabatan) => (
                            <option key={jabatan.id} value={jabatan.id}>
                              {jabatan.nama_jab}
                            </option>
                          ))}
                          <option value="">Pilih Jabatan</option>
                        </select>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Foto</label>
                        <input
                          type="file"
                          className="form-control-file"
                          // value={noKontak}
                          placeholder="Pilih Foto"
                          onChange={loadImage}
                        />
                        {preview ? (
                          <figure className="image is-128x128 ">
                            <img src={preview} alt="Preview" />
                          </figure>
                        ) : (
                          ""
                        )}
                      </div>
                      <br />
                      <br />

                      <button type="submit" className="btn btn-primary">
                        <FiEdit /> Edit
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

export default FormEditKaryawan;
