"use client";
import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "fastbootstrap/dist/css/fastbootstrap.min.css";
import { Popover, OverlayTrigger } from "react-bootstrap";

const StudentsListPage = ({ isDarkMode }) => {
  const popOver = (
    <Popover id="popover-basic" className="text-center">
      <Popover.Header as="h3">Select Event</Popover.Header>
      <Popover.Body>
        <ul>
          <li>EVENT NAME</li>
          <li>EVENT NAME</li>
          <li>EVENT NAME</li>
          <li>EVENT NAME</li>
          <li>EVENT NAME</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <main
      style={isDarkMode ? { background: "#060714" } : { background: "white" }}
    >
      <div className="head-title">
        <div className="left">
          <h1 style={isDarkMode ? { color: "white" } : { color: "black" }}>
            Student List
          </h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Student List</a>
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
        <div className="dropdown">
          <button
            className="btn btn-discovery dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort by:
          </button>
          <ul className="dropdown-menu" role="menu">
            <li>
              <OverlayTrigger
                trigger="click"
                placement="left"
                overlay={popOver}
              >
                <a className="dropdown-item" href="#" data-bs-toggle="popover">
                  EVENT NAMES
                </a>
              </OverlayTrigger>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="table-data"
        style={{ height: "23.5rem", overflowX: "hidden" }}
      >
        <div className="order">
          <div className="head">
            <h3>Student List</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table
            className={
              isDarkMode
                ? "table-dark table-hover table-borderless"
                : "table table-hover table-borderless"
            }
          >
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Tribu</th>
                <th>Arrival Time</th>
                <th>Year Level</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td>02-1920-03954</td>
                <td>
                  <p>Paul</p>
                </td>
                <td>Magic</td>
                <td>01-10-2021</td>
                <td>
                  <span className="status completed">1st Year</span>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default StudentsListPage;
