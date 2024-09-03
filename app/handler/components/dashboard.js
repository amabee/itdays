import React from "react";
import { FaCrown } from "react-icons/fa";
const Dashboard = ({ isDarkMode }) => {
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

      <div className="table-data" style={{height:"25.5rem"}}>
        <div className="order">
          <div className="head">
            <h3>Tribu Member Monitoring</h3>
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
              <FaCrown className="bx" />
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
