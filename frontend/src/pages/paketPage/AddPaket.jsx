import React, { useEffect } from "react";
import FormAddProduct from '../../components/produk/FormAddProduct'
import Layout from '../Layout';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import FormAddPaket from "../../components/paket/FormAddPaket";

const AddPaket = () => {
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
    <FormAddPaket/>
   </Layout>
  )
}

export default AddPaket