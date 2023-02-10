import React, { useEffect } from 'react'
import ProdukList from '../../ProdukList';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from '../../../features/authSlice';

const Produk = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
    
    useEffect(() => {
      if(isError){
        navigate("/login");
      }
    }, [isError,navigate]);
    return (
          <ProdukList />
    );
  
}

export default Produk
