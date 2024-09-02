"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "fastbootstrap/dist/css/fastbootstrap.min.css";

const TribuListPage = ({ isDarkMode }) => {
  return (
    <main
      style={isDarkMode ? { background: "#060714" } : { background: "white" }}
    >
      <div className="head-title">
        <div className="left">
          <h1 style={isDarkMode ? { color: "white" } : { color: "black" }}>
            Tribu List
          </h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Tribu List</a>
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
          <i class="bi bi-person-plus-fill"></i> Add Tribu
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
        <div className="order ">
          <div className="head">
            <h3>Student List</h3>
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
                <th>Tribu Name</th>
                <th>Member Count</th>
                <th>Attendance Count</th>
                <th># of Absent Member</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr>
                <td>
                  <span class="avatar">
                    <i class="bi bi-person"></i>
                  </span>
                  <p>Magic</p>
                </td>
                <td>Magic</td>
                <td>01-10-2021</td>
                {/* <td>
                  <span className="status completed">Early Arrival</span>
                </td> */}
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default TribuListPage;
