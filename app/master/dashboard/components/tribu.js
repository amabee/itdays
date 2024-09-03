"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "fastbootstrap/dist/css/fastbootstrap.min.css";
import { addTribu, getHandler, getTribuDetails, getTribus } from "../funcs";
import { ErrorMessage, SuccessMessage } from "@/globals/swal";
import DataTable from "react-data-table-component";

const TribuListPage = ({ isDarkMode }) => {
  const [handlers, setHandlers] = useState([]);
  const [tribuName, setTribuName] = useState("");
  const [assignedHandler, setAssignedHandler] = useState("");
  const [assignedHandlerName, setAssignedHandlerName] = useState("");
  const [tribus, setTribus] = useState();

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

    const fetchTribuList = async () => {
      try {
        const { success, message, data } = await getTribuDetails();
        if (!success) {
          return ErrorMessage(message);
        }

        setTribus(data);
        console.log(data);
      } catch (error) {
        return ErrorMessage(error);
      }
    };

    fetchTribuList();
    fetchHandlers();
  }, []);

  const handleTribuAdder = async (e) => {
    e.preventDefault();
    if (!tribuName.length > 0 || !assignedHandler.length > 0) {
      ErrorMessage("Tribu name is required");
      return;
    }

    const { success, message } = await addTribu(tribuName, assignedHandler);

    if (!success) {
      ErrorMessage(message);
      return;
    }

    SuccessMessage(message);
  };
  const columns = [
    {
      name: "Tribu Name",
      selector: (row) => row.tribu_name,
      sortable: true,
    },
    {
      name: "Member Count",
      selector: (row) => row.member_count,
      sortable: true,
    },
    {
      name: "Attendance Count",
      selector: (row) => row.attendance_count || 0,
      sortable: true,
    },
    {
      name: "# of Absent Member",
      selector: (row) => row.absent_count || 0,
      sortable: true,
    },
  ];

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
          <DataTable
            columns={columns}
            data={tribus}
            pagination
            highlightOnHover
            striped
            theme={isDarkMode ? "dark" : "light"}
            responsive
            dense
          />
        </div>
      </div>
      {/* MODAL FOR ADDING TRIBU */}
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
                ADD Tribu
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
                <span className="input-group-text">Tribu Name</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Tribu Name"
                  aria-label="Tribu Name"
                  value={tribuName}
                  onChange={(e) => setTribuName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Assigned Handler</span>
                <div class="dropdown">
                  <button
                    class="btn btn-default dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {assignedHandlerName
                      ? assignedHandlerName
                      : " Page actions"}
                  </button>
                  <ul class="dropdown-menu" role="menu">
                    {handlers.map((handler) => (
                      <li
                        key={handler.pid}
                        onClick={() => {
                          setAssignedHandler(handler.handler_id);
                          setAssignedHandlerName(
                            handler.h_fname + " " + handler.h_lname
                          );
                        }}
                      >
                        <a class="dropdown-item" href="#">
                          {handler.h_fname} {handler.h_lname}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
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
                onClick={(e) => handleTribuAdder(e)}
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

export default TribuListPage;
