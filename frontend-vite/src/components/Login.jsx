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
    // <div className="container d-flex">
    //   <div className="login-box m-auto ">
    //     <div className="login-logo">
          
    //         <b>Nirwana</b>NET
    //     </div>
    //     {/* /.login-logo */}
    //     <div>
    //     <div className="card ">
    //       <div className="card-body login-card-body pt-5">
            
    //         <form onSubmit={Auth} >
    //        {isError && <p className="text-center text-danger">{message}</p>}
    //           <div className="input-group mb-3">
    //             <input
    //               type="text"
    //               className="form-control"
    //               placeholder="Email"
    //               value={email}
    //               onChange={(e)=>setEmail(e.target.value)}
    //             />
    //             <div className="input-group-append">
    //               <div className="input-group-text">
    //                 <span className="fas fa-envelope" />
    //               </div>
    //             </div>
    //           </div>
    //           <div className="input-group mb-3">
    //             <input
    //             spellCheck='false'
    //               type="password"
    //               className="form-control"
    //               placeholder="Password"
    //               value={password}
    //               onChange={(e)=>setPassword(e.target.value)}
    //             />
    //             <div className="input-group-append">
    //               <div className="input-group-text">
    //                 <span className="fas fa-lock" />
    //               </div>
    //             </div>
    //           </div>
    //           <div className="row">
                
    //             {/* /.col */}
    //             <div className="col-12">
    //               <button type="submit" className="btn btn-primary btn-block">
    //               {isLoading ? "Loading.............." : "Login"}
    //               </button>
    //             </div>
    //             {/* /.col */}
    //           </div>
    //         </form>
           
          
          
    //       </div>
    //       {/* /.login-card-body */}
    //     </div>
    //     </div>
    //   </div>
    // </div>
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                <h1 className="title is-2 is-centered">Sign In</h1>
                {isError && <p className="has-text-centered ">{message}</p>}
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

 

export default Login;
