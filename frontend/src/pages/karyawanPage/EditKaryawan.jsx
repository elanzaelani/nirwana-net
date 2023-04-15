import React, { useEffect } from "react";
import FormEditPaket from '../../components/paket/FormEditPaket'
import Layout from '../Layout';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import FormEditKaryawan from "../../components/karyawan/FormEditKaryawan";

const EditKaryawan = () => {
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
    <FormEditKaryawan/>
</Layout>
  )
}

export default EditKaryawan