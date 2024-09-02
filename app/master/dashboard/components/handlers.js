"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "fastbootstrap/dist/css/fastbootstrap.min.css";

const HandlersListPage = ({ isDarkMode }) => {
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
          <table class={isDarkMode ? "table-dark table-hover table-borderless" : "table table-hover table-borderless"}>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Tribu</th>
                <th>Arrival Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr>
                <td>
                  <span class="avatar">
                    <i class="bi bi-person"></i>
                  </span>
                  <p>Paul</p>
                </td>
                <td>Magic</td>
                <td>01-10-2021</td>
                <td>
                  <span className="status completed">Early Arrival</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* MODAL FOR ADDING STUDENTS */}
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
                  aria-label="Student ID"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">First Name</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  aria-label="First Name"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Last Name</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  aria-label="Last Name"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Email</span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  aria-label="Email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="genderSelect" className="form-label">
                  Gender
                </label>
                <select
                  id="genderSelect"
                  className="form-select"
                  aria-label="Gender"
                >
                  <option value="" disabled selected>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
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
              <button type="button" className="btn btn-primary">
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
