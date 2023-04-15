import React, { useEffect } from "react";
import Layout from "../Layout";
import PelangganList from "../../components/pelanggan/PelangganList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import KaryawanList from "../../components/karyawan/KaryawanList";

const Karyawan = () => {
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
        <KaryawanList/>
      </Layout>
   
  );
};

export default Karyawan;
