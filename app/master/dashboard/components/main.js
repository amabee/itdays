import React from "react";
import { FaCrown } from "react-icons/fa";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "fastbootstrap/dist/css/fastbootstrap.min.css";
const MainDashboard = ({ isDarkMode }) => {
  return (
    <main
      style={isDarkMode ? { background: "#060714" } : { background: "white" }}
    >
      <div className="head-title">
        <div className="left">
          <h1 style={isDarkMode ? { color: "white" } : { color: "black" }}>
            Dashboard
          </h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
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
                Home
              </a>
            </li>
          </ul>
        </div>
      </div>

      <ul className="box-info">
        <li>
          <i className="bx bi bi-people-fill"></i>
          <span className="text">
            <h3>0</h3>
            <p>Total Students</p>
          </span>
        </li>
        <li>
          <i className="bx bi bi-people-fill"></i>
          <span className="text">
            <h3>0</h3>
            <p>Total attendance of the day</p>
          </span>
        </li>
        <li>
          <i className="bx bi bi-alarm-fill"></i>
          <span className="text">
            <h3>0</h3>
            <p>Late arrivals</p>
          </span>
        </li>
        <li>
          <i className="bx bi bi-alarm-fill"></i>
          <span className="text">
            <h3>0</h3>
            <p>Early Departures</p>
          </span>
        </li>
        <li>
          <i className="bx bi bi-person-fill-up"></i>
          <span className="text">
            <h3>0</h3>
            <p>Highest Attendance By Tribu</p>
          </span>
        </li>
        <li>
          <i className="bx bi bi-person-fill-down"></i>
          <span className="text">
            <h3>0</h3>
            <p>Lowest Attendance By Tribu</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Recent Activity</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Tribu</th>
                <th>Arrival Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="img/people.png" alt="user" />
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
        <div className="todo">
          <div className="head">
            <h3>Tribu Attendance Ranking</h3>
            <i className="bx bx-plus"></i>
            <i className="bx bx-filter"></i>
          </div>
          <ul className="todo-list">
            <li className="completed">
              <p>Tribu Name</p>
              <FaCrown className="bx"/>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default MainDashboard;
