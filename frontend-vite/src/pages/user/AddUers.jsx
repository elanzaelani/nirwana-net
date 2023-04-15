import React, { useEffect } from "react";
import FormAddUser from '../../components/user/FormAddUser'
import Layout from '../Layout';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const AddUers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError ,user} = useSelector((state) => state.auth);

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
    <FormAddUser/>
   </Layout>
  )
}

export default AddUers