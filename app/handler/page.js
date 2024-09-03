"use client";
import { React, useEffect, useState, useRef } from "react";
import Dasboard from "./components/dashboard";
import { useRouter } from "next/navigation";
import { getSession, logout } from "@/lib";
import Dashboard from "./components/dashboard";
import "./assets/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  const [isSessionAvailable, setIsSessionAvailable] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [content, setContent] = useState(<Dashboard isDarkMode={isDarkMode} />);
  const router = useRouter();
  const sidebarRef = useRef(null);
  const searchFormRef = useRef(null);
  const searchButtonIconRef = useRef(null);

  // SESSION CHECKER
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/");
      } else {
        setIsSessionAvailable(true);
      }
    };
    checkSession();
  }, [router]);

  useEffect(() => {
    page2Display(activeMenuItem);
  }, [activeMenuItem, isDarkMode]);

  // TOGGLE ACTIVE SIDEBAR MENU
  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
  };

  // TOGGLE DARK MODE
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  // DYNAMIC CONTENT
  const page2Display = (page) => {
    switch (page) {
      case "dashboard":
        setContent(<Dashboard isDarkMode={isDarkMode} />);
        break;

      default:
        setContent(<Dashboard isDarkMode={isDarkMode} />);
        break;
    }
  };

  //HANDLE LOGOUT
  const handleLogOut = async () => {
    try {
      const { redirect } = await logout();

      if (redirect) {
        window.location.href = redirect.destination;
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <div>
      {isSessionAvailable ? (
        <div>
          <section id="sidebar" ref={sidebarRef}>
            <a href="#" className="brand">
              <i className="bx bxs-smile"></i>
              <span className="text">HandlerHub</span>
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
                className={activeMenuItem === "mtribu" ? "active" : ""}
                onClick={() => handleMenuItemClick("mtribu")}
              >
                <a>
                  <i className="bx bxs-shopping-bag-alt"></i>
                  <span className="text">Manage Tribu</span>
                </a>
              </li>
            </ul>
            <ul className="side-menu">
              <li onClick={() => handleLogOut()}>
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

export default Home;
