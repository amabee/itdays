"use client";
import { useState } from "react";
import "../public/css/main.css";
import "../public/css/util.css";
import "../public/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../public/vendor/animate/animate.css";
import "../public/vendor/bootstrap/css/bootstrap.min.css";
import "../public/vendor/css-hamburgers/hamburgers.min.css";
import "../public/vendor/select2/select2.min.css";

const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (
      !formData.email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data:", formData);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src="/images/img-01.png" alt="IMG" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">Handler Login</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: teacher_email@phinmed.com"
            >
              <input
                className={`input100 ${errors.email ? "error" : ""}`}
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className={`input100 ${errors.password ? "error" : ""}`}
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Login
              </button>
            </div>

            <div className="text-center p-t-12">
              <span className="txt1">Forgot </span>
              <a className="txt2" href="#">
                Username / Password?
              </a>
            </div>

            <div className="text-center p-t-136">
              {/* <a className="txt2" href="#">
                Create your Account
                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
              </a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
