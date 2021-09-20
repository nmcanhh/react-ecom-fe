import React from "react";
import Navbar from "../../../layouts/frontend/Navbar";

const Login = () => {
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
                <form>
                  <div className="form-group mb-3">
                    <label htmlFor="">Email ID</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Password</label>
                    <input type="password" class="form-control" id="password" />
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
