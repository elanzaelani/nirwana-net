import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AddProduct from './pages/produkPage/AddProduct';
import Users from './pages/user/Users';
import AddUers from './pages/user/AddUers';
import Edituser from './pages/user/EditUser';
import Dashboard from './pages/Dashboard';
import EditProduct from './pages/produkPage/EditProduct';
import PageNotFound from './pages/PageNotFound';
import Produk from './pages/produkPage/Produk';
import Pelanggan from './pages/pelangganPage/Pelanggan';
import AddPelanggan from './pages/pelangganPage/AddPelanggan';
import Paket from './pages/paketPage/Paket';
import AddPaket from './pages/paketPage/AddPaket';
import EditPelanggan from './pages/pelangganPage/EdittPelanggan';
import EditPaket from './pages/paketPage/EditPaket';
import Karyawan from './pages/karyawanPage/Karyawan';
import Jabatan from './pages/jabatanPage/Jabatan';
import AddJabatan from './pages/jabatanPage/AddJabatan';
import EditJabatan from './pages/jabatanPage/EditJabatan';
import AddKaryawan from './pages/karyawanPage/AddKaryawan';
import EditKaryawan from './pages/karyawanPage/EditKaryawan';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUers />} />
          <Route path="/user/edit/:id" element={<Edituser />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/produk/add" element={<AddProduct />} />
          <Route path="/produk/edit/:id" element={<EditProduct />} />
          <Route path="/paket" element={<Paket/>} />
          <Route path="/paket/add" element={<AddPaket />} />
          <Route path="/paket/edit/:id" element={<EditPaket />} />
          <Route path="/pelanggan/add" element={<AddPelanggan />} />
          <Route path="/pelanggan/edit/:id" element={<EditPelanggan />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/karyawan" element={<Karyawan />} />
          <Route path="/karyawan/add" element={<AddKaryawan />} />
          <Route path="/karyawan/edit/:id" element={<EditKaryawan />} />
          <Route path="/jabatan" element={<Jabatan />} />
          <Route path="/jabatan/add" element={<AddJabatan />} />
          <Route path="/jabatan/edit/:id" element={<EditJabatan />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
