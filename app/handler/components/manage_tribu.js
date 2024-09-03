"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "fastbootstrap/dist/css/fastbootstrap.min.css";
import DataTable from "react-data-table-component";
import {
  getEvents,
  getStudentsWitoutTribu,
  getTribuMembers,
  updateStudentTribuId,
} from "../funcs";
import { ErrorMessage, SuccessMessage } from "@/globals/swal";
import { getSession } from "@/lib";

const TribuListPage = ({ isDarkMode }) => {
  const [loading, setLoading] = useState(true);
  const [tribuData, setTribuData] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState(studentList);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { success, message, data } = await getEvents();

        if (!success) {
          ErrorMessage(message);
          return setEventList([]);
        }

        setEventList(data);
      } catch (error) {
        ErrorMessage(error);
      }
    };

    fetchEvents();
    fetchTribuMembers();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = studentList.filter(
      (student) =>
        student.stud_fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.stud_lname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const fetchTribuMembers = async (event_id) => {
    try {
      const sessionData = await getSession();

      const userId = sessionData.user.user_id;
      const { success, message, data } = await getTribuMembers(
        userId,
        event_id
      );

      if (!success) {
        return setTribuData([]);
      }

      setTribuData(data);
      console.log(data);
    } catch (error) {
      ErrorMessage(error);
      console.error("Error in fetchTribuMembers:", error);
    }
  };

  const fetchStudents = async () => {
    const { success, message, data } = await getStudentsWitoutTribu();

    if (!success) {
      ErrorMessage(message);
      return setStudentList([]);
    }

    setStudentList(data);
  };

  const handleConfirm = async () => {
    try {
      const sessionData = await getSession();
      const pid = sessionData.user.pid;

      for (const row of selectedRows) {
        const { success, message } = await updateStudentTribuId(
          pid,
          row.stud_id
        );

        if (!success) {
          ErrorMessage(message);
          return;
        }
      }

      SuccessMessage("Tribu members updated successfully.");
      // You might want to close the modal here
      document.querySelector("#exampleModal").classList.remove("show");
      document.querySelector("#exampleModal").style.display = "none";
    } catch (error) {
      console.error("Error in handleConfirm:", error);
    }
  };

  const columns = [
    {
      name: "Firstname",
      selector: (row) => row.stud_fname,
      sortable: true,
    },
    {
      name: "Lastname",
      selector: (row) => row.stud_lname,
      sortable: true,
    },
    {
      name: "Tribu Name",
      selector: (row) => row.tribu_name,
      sortable: true,
    },
    {
      name: "Time In",
      selector: (row) => row.time_in,
      sortable: true,
    },
    {
      name: "Time In Status",
      cell: (row) =>
        row.time_in === null ? (
          <span className="badge bg-secondary">Absent</span>
        ) : (
          <span className="badge bg-secondary">Status</span>
        ),
      sortable: true,
    },

    {
      name: "Time Out",
      selector: (row) => row.time_out,
      sortable: true,
    },
    {
      name: "Time Out Status",
      cell: (row) =>
        row.time_out === null ? (
          <span className="badge bg-secondary">Absent</span>
        ) : (
          <span className="badge bg-secondary">Status</span>
        ),
      sortable: true,
    },
  ];

  const studentWithOutTribuColumns = [
    {
      name: "Student ID",
      selector: (row) => row.stud_id,
      sortable: true,
    },
    {
      name: "Firstname",
      selector: (row) => row.stud_fname,
      sortable: true,
    },
    {
      name: "Lastname",
      selector: (row) => row.stud_lname,
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
            Tribu Member List
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
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => fetchStudents()}
        >
          <i className="bi bi-person-plus-fill"></i> Add Tribu Members
        </button>
        <div className="dropdown">
          <button
            className="btn btn-discovery dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Event
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {eventList.map((event) => (
              <li key={event.event_id}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    fetchTribuMembers(event.event_id);
                  }}
                >
                  {event.event_name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="table-data"
        style={{ height: "23.5rem", overflowX: "hidden" }}
      >
        <div className="order ">
          <div className="head">
            <h3>Tribu Member List</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <DataTable
            columns={columns}
            data={tribuData}
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
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                ADD Tribu Member
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
                {studentList.length > 0 ? (
                  <DataTable
                    title="Select Student to add to the tribu"
                    selectableRows
                    columns={studentWithOutTribuColumns}
                    data={
                      filteredStudents.length > 0
                        ? filteredStudents
                        : studentList
                    }
                    onSelectedRowsChange={({ selectedRows }) =>
                      setSelectedRows(selectedRows)
                    }
                    subHeader
                    subHeaderComponent={
                      <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    }
                  />
                ) : (
                  <div>
                    <span>All students are in their respective Tribu</span>
                  </div>
                )}
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
                onClick={handleConfirm}
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
