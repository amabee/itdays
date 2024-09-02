"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "fastbootstrap/dist/css/fastbootstrap.min.css";
import { addHandler, getHandler, getTribus } from "../funcs";
import { ErrorMessage, SuccessMessage } from "@/globals/swal";

const HandlersListPage = ({ isDarkMode }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [hid, setHid] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [tribu, setTribu] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [handlers, setHandlers] = useState([]);
  const [tribus, setTribus] = useState([]);

  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    const length = 8;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    setPwd(password);
  };

  const inputValidation = () => {
    const errors = [];

    if (!hid) {
      errors.push("Handler ID is required.");
    }

    if (!fname) {
      errors.push("First Name is required.");
    }

    if (!lname) {
      errors.push("Last Name is required.");
    }

    if (!email) {
      errors.push("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Email format is invalid.");
    }

    if (!pwd) {
      errors.push("Password is required.");
    } else if (pwd.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }

    if (!gender) {
      errors.push("Gender selection is required.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }

    return true;
  };

  const handleAddHandler = async () => {
    if (inputValidation) {
      const { success, message } = await addHandler(
        hid,
        fname,
        lname,
        email,
        pwd
      );

      if (!success) {
        ErrorMessage(message);
      }

      SuccessMessage(message);
      setFname("");
      setLname("");
      setHid("");
      setEmail("");
      setPwd("");
    }
  };

  useEffect(() => {
    const fetchHandlers = async () => {
      try {
        const { success, message, data } = await getHandler();
        if (!success) {
          return ErrorMessage(message);
        }

        setHandlers(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch handlers:", error);
      }
    };
    const fetchTribus = async () => {
      try {
        const { success, message, data } = await getTribus();
        if (!success) {
          return ErrorMessage(message);
        }

        setTribus(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch tribe list:", error);
      }
    };

    fetchTribus();
    fetchHandlers();
  }, []);

  return (
    <main
      style={isDarkMode ? { background: "#060714" } : { background: "white" }}
    >
      <div className="head-title">
        <div className="left">
          <h1 style={isDarkMode ? { color: "white" } : { color: "black" }}>
            Handlers List
          </h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Handler List</a>
            </li>
            <li>
              <i className="bi bi-chevron-right"></i>
            </li>
            <li>
              <a
                className="active"
                href="#"
                style={isDarkMode ? { color: "white" } : { color: "black" }}
              >
                Main
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex justify-content-end mb-3 mr-4">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i class="bi bi-person-plus-fill"></i> Add Handler
        </button>
        <div class="dropdown">
          <button
            class="btn btn-discovery dropdown-toggle "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort by:
          </button>
          <ul class="dropdown-menu" role="menu">
            <li>
              <a class="dropdown-item" href="#">
                Tribu
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Time In
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another Action
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="table-data"
        style={{ height: "23.5rem", overflowX: "hidden" }}
      >
        <div className="order table-responsive">
          <div className="head">
            <h3>Handler List</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table
            class={
              isDarkMode
                ? "table-dark table-hover table-borderless"
                : "table table-hover table-borderless"
            }
          >
            <thead>
              <tr>
                <th>Handler ID</th>
                <th>Handler Name</th>
                <th>Tribu</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {Array.isArray(handlers) &&
                handlers.length > 0 &&
                handlers.map((handler, index) => (
                  <tr key={index}>
                    <td>{handler.handler_id}</td>
                    <td>
                      <p>
                        {handler.h_fname} {handler.h_lname}
                      </p>
                    </td>
                    <td>
                      {handler.tribu_name
                        ? handler.tribu_name
                        : "Not yet assigned"}
                    </td>
                    <td>
                      {new Date(handler.created_at).toLocaleDateString()} /{" "}
                      {new Date(handler.created_at).toLocaleTimeString()}
                    </td>
                    <td>
                      <span className="status completed">{handler.status}</span>
                    </td>
                    <td>
                      <div className="mb-3">
                        <label htmlFor="tribuSelect" className="form-label">
                          Assigned Tribu
                        </label>
                        <select
                          id="tribuSelect"
                          className="form-select"
                          aria-label="Tribu"
                          onChange={(e) => setTribu(e.target.value)}
                        >
                          <option value="" disabled selected>
                            {handler.tribu_name
                              ? handler.tribu_name
                              : "Select Tribu"}
                          </option>

                          {tribus.map((tribu) => (
                            <option key={tribu.pid} value={tribu.pid}>
                              {tribu.tribu_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* MODAL FOR ADDING HANDLERS */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                ADD Handler
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Handler ID</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Handler ID"
                  aria-label="Handler ID"
                  value={hid}
                  onChange={(e) => setHid(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">First Name</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  aria-label="First Name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Last Name</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  aria-label="Last Name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Email</span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Password"
                  aria-label="Password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
                <button
                  className="btn btn-info"
                  onClick={generateRandomPassword}
                >
                  🔃
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAddHandler()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HandlersListPage;
