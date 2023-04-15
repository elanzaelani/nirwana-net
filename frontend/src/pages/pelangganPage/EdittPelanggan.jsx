import React, { useEffect } from "react";
import FormEditUser from "../../components/user/FormEditUser";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import FormEditPelanggan from "../../components/pelanggan/FormEditPelanggan";

const EditPelanggan = () => {
  //Protect blm login
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError,user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  useEffect(() => {
    if(isError){
      navigate("/");
    }
    if(user && user.role !== "admin"){
      navigate("/dashboard");
    }
  }, [isError,user,navigate]);
  return (
    <Layout>
      <FormEditPelanggan />
    </Layout>
  );
};

export default EditPelanggan;
