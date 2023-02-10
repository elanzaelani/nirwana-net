import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AddProduct from './pages/produkPage/AddProduct';
import AddUers from './pages/AddUers';
import Dashboard from './pages/Dashboard';
import EditProduct from './pages/produkPage/EditProduct';
import Edituser from './pages/EditUser';
import PageNotFound from './pages/PageNotFound';
import Produk from './pages/produkPage/Produk';
import Users from './pages/Users';
import Pelanggan from './pages/pelangganPage/Pelanggan';
import AddPelanggan from './pages/pelangganPage/AddPelanggan';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUers />} />
          <Route path="/users/edit/:id" element={<Edituser />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/pelanggan/add" element={<AddPelanggan />} />
          <Route path="/produk/add" element={<AddProduct />} />
          <Route path="/produk/edit/:id" element={<EditProduct />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
