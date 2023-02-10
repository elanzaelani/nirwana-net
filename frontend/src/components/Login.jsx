import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSUccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSUccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSUccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };  return (
    <div className="my-auto">
      <div className="login-box m-auto ">
        <div className="login-logo">
          
            <b>Nirwana</b>NET
        </div>
        {/* /.login-logo */}
        <div>
        <div className="card ">
          <div className="card-body login-card-body pt-5">
            
            <form onSubmit={Auth} >
           {isError && <p className="text-center text-danger">{message}</p>}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                spellCheck='false'
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                
                {/* /.col */}
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                  {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
           
          
          
          </div>
          {/* /.login-card-body */}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
