import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist = () => {};
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          if (res.data.role === "admin") {
            history.push("/admin/dashboard/");
          } else {
            history.push("/");
          }
        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        } else {
          setLoginInput({
            ...loginInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="">Email ID</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={handleInput}
                      value={loginInput.email}
                    />
                    <span>{loginInput.error_list?.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={handleInput}
                      value={loginInput.password}
                    />
                    <span>{loginInput.error_list?.password}</span>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
