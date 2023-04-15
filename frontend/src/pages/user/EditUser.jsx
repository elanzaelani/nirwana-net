import React, { useEffect } from "react";
import FormEditUser from "../../components/user/FormEditUser";
import Layout from "../../pages/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Edituser = () => {
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
      <FormEditUser />
    </Layout>
  );
};

export default Edituser;
