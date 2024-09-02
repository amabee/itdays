"use client";
import React, { useEffect, useState, useRef } from "react";
import { getSession } from "../lib";
import { useRouter } from "next/navigation";
import "./assets/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MainDashboard from "./components/main";
import StudentsListPage from "./components/studlist";
import HandlersListPage from "./components/handlers";
import TribuListPage from "./components/tribu";

const MasterDashboard = () => {
  const [isSessionAvailable, setIsSessionAvailable] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [content, setContent] = useState(
    <MainDashboard isDarkMode={isDarkMode} />
  );
  const router = useRouter();
  const sidebarRef = useRef(null);
  const searchFormRef = useRef(null);
  const searchButtonIconRef = useRef(null);

  // SESSION CHECKER
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/master");
      } else {
        setIsSessionAvailable(true);
      }
    };
    checkSession();
  }, [router]);

  // Update content when activeMenuItem or isDarkMode changes
  useEffect(() => {
    page2Display(activeMenuItem);
  }, [activeMenuItem, isDarkMode]);

  // Sidebar and other DOM manipulation
  useEffect(() => {
    const allSideMenuItems = document.querySelectorAll(
      "#sidebar .side-menu.top li a"
    );

    allSideMenuItems.forEach((item) => {
      const li = item.parentElement;

      item.addEventListener("click", function () {
        allSideMenuItems.forEach((i) => {
          i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
      });
    });

    const menuBar = document.querySelector("#content nav .bx.bx-menu");
    if (menuBar && sidebarRef.current) {
      menuBar.addEventListener("click", function () {
        sidebarRef.current.classList.toggle("hide");
      });
    }

    const searchButton = document.querySelector(
      "#content nav form .form-input button"
    );
    if (searchButton && searchFormRef.current && searchButtonIconRef.current) {
      searchButton.addEventListener("click", function (e) {
        if (window.innerWidth < 576) {
          e.preventDefault();
          searchFormRef.current.classList.toggle("show");
          if (searchFormRef.current.classList.contains("show")) {
            searchButtonIconRef.current.classList.replace("bx-search", "bx-x");
          } else {
            searchButtonIconRef.current.classList.replace("bx-x", "bx-search");
          }
        }
      });
    }

    if (window.innerWidth < 768 && sidebarRef.current) {
      sidebarRef.current.classList.add("hide");
    }

    const handleResize = () => {
      if (
        window.innerWidth > 576 &&
        searchButtonIconRef.current &&
        searchFormRef.current
      ) {
        searchButtonIconRef.current.classList.replace("bx-x", "bx-search");
        searchFormRef.current.classList.remove("show");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // TOGGLE DARK MODE
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  // TOGGLE ACTIVE SIDEBAR MENU
  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
  };

  // DYNAMIC CONTENT
  const page2Display = (page) => {
    switch (page) {
      case "dashboard":
        setContent(<MainDashboard isDarkMode={isDarkMode} />);
        break;
      case "studlist":
        setContent(<StudentsListPage isDarkMode={isDarkMode} />);
        break;
      case "handlers":
        setContent(<HandlersListPage isDarkMode={isDarkMode} />);
        break;
      case "tribulist":
        setContent(<TribuListPage isDarkMode={isDarkMode} />);
        break;
      default:
        setContent(<MainDashboard isDarkMode={isDarkMode} />);
        break;
    }
  };

  return (
    <div>
      {isSessionAvailable ? (
        <div>
          <section id="sidebar" ref={sidebarRef}>
            <a href="#" className="brand">
              <i className="bx bxs-smile"></i>
              <span className="text">AdminHub</span>
            </a>
            <ul className="side-menu top">
              <li
                className={activeMenuItem === "dashboard" ? "active" : ""}
                onClick={() => handleMenuItemClick("dashboard")}
              >
                <a>
                  <i className="bx bxs-dashboard"></i>
                  <span className="text">Dashboard</span>
                </a>
              </li>
              <li
                className={activeMenuItem === "studlist" ? "active" : ""}
                onClick={() => handleMenuItemClick("studlist")}
              >
                <a>
                  <i className="bx bxs-shopping-bag-alt"></i>
                  <span className="text">Student List</span>
                </a>
              </li>
              <li
                className={activeMenuItem === "handlers" ? "active" : ""}
                onClick={() => handleMenuItemClick("handlers")}
              >
                <a>
                  <i className="bx bxs-doughnut-chart"></i>
                  <span className="text">Handler List</span>
                </a>
              </li>
              <li
                className={activeMenuItem === "tribulist" ? "active" : ""}
                onClick={() => handleMenuItemClick("tribulist")}
              >
                <a>
                  <i className="bx bxs-message-dots"></i>
                  <span className="text">Tribu</span>
                </a>
              </li>
            </ul>
            <ul className="side-menu">
              <li
                className={activeMenuItem === "logout" ? "active" : ""}
                onClick={() => handleMenuItemClick("logout")}
              >
                <a href="#" className="logout">
                  <i className="bx bxs-log-out-circle"></i>
                  <span className="text">Logout</span>
                </a>
              </li>
            </ul>
          </section>

          <section id="content">
            <nav>
              <form action="#">
                <div className="form-input" ref={searchFormRef}>
                  <input type="search" placeholder="Search..." />
                  <button type="submit" className="search-btn">
                    <i className="bi bi-search" ref={searchButtonIconRef}></i>
                  </button>
                </div>
              </form>
              <input
                type="checkbox"
                id="switch-mode"
                hidden
                onChange={toggleDarkMode}
                checked={isDarkMode}
              />
              <label htmlFor="switch-mode" className="switch-mode"></label>
              <a href="#" className="notification">
                <i className="bi bi-bell-fill"></i>
                <span className="num">8</span>
              </a>
              <a href="#" className="profile">
                <img src="img/people.png" alt="Profile" />
              </a>
            </nav>

            {content}
          </section>
        </div>
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  );
};

export default MasterDashboard;
