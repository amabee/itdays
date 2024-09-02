"use client";
import { useEffect, useState } from "react";
import "../../public/css/main.css";
import "../../public/css/util.css";
import "../../public/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../public/vendor/animate/animate.css";
import "../../public/vendor/bootstrap/css/bootstrap.min.css";
import "../../public/vendor/css-hamburgers/hamburgers.min.css";
import "../../public/vendor/select2/select2.min.css";
import { getSession, login } from "./lib";
import { ErrorMessage } from "@/globals/swal";

const MasterAuth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let errors = {};

    if (
      !email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      const { success, message } = await login(email, password);

      if (!success) {
        ErrorMessage(message);
        return;
      }

      window.location.href = "master/dashboard";
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        window.location.href = "/master/dashboard";
      } else {
        setIsSessionAvailable(true);
      }
    };
    checkSession();
  }, []);

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src="/images/img-01.png" alt="IMG" />
          </div>

          <form className="login100-form validate-form">
            <span className="login100-form-title">Master Login</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: teacher_email@phinmed.com"
            >
              <input
                className={`input100 ${errors.email ? "error" : ""}`}
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <button
                type="button"
                className="login100-form-btn"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>

            <div className="text-center p-t-12">
              <span className="txt1">Forgot </span>
              <a className="txt2" href="#">
                Username / Password?
              </a>
            </div>

            <div className="text-center p-t-136"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MasterAuth;
