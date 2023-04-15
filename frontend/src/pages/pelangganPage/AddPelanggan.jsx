import React, { useEffect } from "react";
import FormAddProduct from '../../components/produk/FormAddProduct'
import Layout from '../Layout';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import FormAddPelanggan from "../../components/pelanggan/FormAddPelanggan";

const AddPelanggan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  useEffect(() => {
    if(isError){
      navigate("/");
    }
  }, [isError,navigate]);
  return (
   <Layout>
    <FormAddPelanggan/>
   </Layout>
  )
}

export default AddPelanggan