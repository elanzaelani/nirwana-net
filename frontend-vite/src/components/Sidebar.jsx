import React,{useEffect, useState} from 'react'
import { NavLink,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { API_URL } from '../utils/Constans';
import { LogOut, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from 'react-icons/fa';


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [rowProduks, setRowProduks] = useState();
  const [rowUsers, setRowUsers] = useState();
  
  useEffect(() => {
    getRowProduk();
  }, []);

  useEffect(() => {
    getRowUsers();
  }, []);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  
  const getRowProduk = async () => {
    const response = await axios.get(API_URL+`produkRows`);
    setRowProduks(response.data.totalRows);

  };
  const getRowUsers = async () => {
    const response = await axios.get(API_URL+`userRows`);
    setRowUsers(response.data.totalRows);

  };




  return (
    <div>
   <aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}

  <a href="index3.html" className="brand-link">
    {/* <img src="dist/img/nirwana1.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} /> */}
    <span className="brand-text font-weight-light">Nirwana NET</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    {/* <div className="user/  -panel mt-3 pb-3 mb-3 d-flex">
      // <div className="image">
      //   <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      // </div>
      <div className="info">
        <a href="#" className="d-block">Admin</a>
      </div>
    </div> */}
    {/* SidebarSearch Form */}
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item menu-open">
          <NavLink to={"/dashboard"} className="nav-link ">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Dashboard
             
            </p>
          </NavLink>
         
        </li>
        
        <li className="nav-header">EXAMPLES</li>
        <li className="nav-item">
          <NavLink to={"/produk"} className="nav-link">
            <i className="nav-icon far fa-calendar-alt" />
            <p>
              Produk
              <span className="badge badge-info right">{rowProduks}</span>
            </p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/pelanggan" className="nav-link">
            <i className="nav-icon far fa-image" />
            <p>
             Pelanggan
            </p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/karyawan" className="nav-link">
            {/* <i className="nav-icon fas fa-columns" /> */}
            <FaEdit className='mr-2'/> 
            <p>
              Karyawan
            </p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/jabatan" className="nav-link">
            {/* <i className="nav-icon fas fa-columns" /> */}
            <FaEdit className='mr-2'/> 
            <p>
              Jabatan
            </p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/users"} className="nav-link">
            <i className="nav-icon far fa-calendar-alt" />
            <p>
              User
              <span className="badge badge-info right">{rowUsers}</span>
            </p>
          </NavLink>
        </li>
       
        <li className="nav-item">
          <NavLink to={"/paket"} className="nav-link">
            <i className="nav-icon far fa-calendar-alt" />
            <p>
              Paket
              <span className="badge badge-info right"></span>
            </p>
          </NavLink>
        </li>

        <li>
            <button onClick={logout} className="button is-white">
            
              Logout
            </button>
          </li>
        {/* <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon far fa-envelope" />
            <p>
              Mailbox
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/mailbox/mailbox.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Inbox</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/mailbox/compose.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Compose</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/mailbox/read-mail.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Read</p>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-book" />
            <p>
              Pages
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/examples/invoice.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Invoice</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/profile.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Profile</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/e-commerce.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>E-commerce</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/projects.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Projects</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/project-add.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Project Add</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/project-edit.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Project Edit</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/project-detail.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Project Detail</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/contacts.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Contacts</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/faq.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>FAQ</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/contact-us.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Contact us</p>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon far fa-plus-square" />
            <p>
              Extras
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>
                  Login &amp; Register v1
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/examples/login.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Login v1</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/register.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Register v1</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/forgot-password.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Forgot Password v1</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/recover-password.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Recover Password v1</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>
                  Login &amp; Register v2
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/examples/login-v2.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Login v2</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/register-v2.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Register v2</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/forgot-password-v2.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Forgot Password v2</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/recover-password-v2.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Recover Password v2</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="pages/examples/lockscreen.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Lockscreen</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/legacy-user-menu.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Legacy User Menu</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/language-menu.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Language Menu</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/404.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Error 404</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/500.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Error 500</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/pace.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Pace</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/blank.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Blank Page</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="starter.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Starter Page</p>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-search" />
            <p>
              Search
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/search/simple.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Simple Search</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/search/enhanced.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Enhanced</p>
              </a>
            </li>
          </ul>
        </li>
        */}
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

    </div>
  )
}

export default Sidebar
