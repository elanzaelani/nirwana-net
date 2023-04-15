import React, { useEffect } from "react";
import FormAddProduct from '../../components/produk/FormAddProduct'
import Layout from '../Layout';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import FormAddJabatan from "../../components/jabatan/FormAddJabatan";

const AddJabatan = () => {
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
    <FormAddJabatan/>
   </Layout>
  )
}

export default AddJabatan