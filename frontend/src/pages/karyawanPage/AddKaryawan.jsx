import React, { useEffect } from "react";
import FormAddProduct from '../../components/produk/FormAddProduct'
import Layout from '../Layout';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import FormAddPaket from "../../components/paket/FormAddPaket";
import FormAddKaryawan from "../../components/karyawan/FormAddKaryawan";

const AddKaryawan = () => {
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
    <FormAddKaryawan/>
   </Layout>
  )
}

export default AddKaryawan