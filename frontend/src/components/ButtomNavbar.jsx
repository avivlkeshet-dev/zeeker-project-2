import { useState } from "react";
import { BiCalendarAlt } from "react-icons/bi";
import { IoCarSportSharp } from "react-icons/io5";
import { HiSquares2X2 } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";

function ZeekrBottomNavigation() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="fixed-bottom d-flex justify-content-center">
      <div className="zeekr-navbar-container">
        <div className="zeekr-navbar-bg"></div>
        <div className="zeekr-navbar-content w-100 h-100 d-flex align-items-center justify-content-between px-3">

          <div className="zeekr-fab-wrapper">
            <button className="zeekr-orange-btn d-flex flex-column align-items-center justify-content-center">
              <span className="fab-text-top">מוקד</span>
              <span className="fab-text-bottom">24/7</span>
            </button>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button
              className={`zeekr-pill-btn d-flex align-items-center gap-2 ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              <span className="pill-text">ראשי</span>
              <FaHome size={18} />
            </button>
            <button
              className={`zeekr-nav-btn ${activeTab === "menu" ? "active" : ""}`}
              onClick={() => setActiveTab("menu")}
            >
              <HiSquares2X2 size={22} />
            </button>
          </div>
          <div className="d-flex align-items-center gap-5">
            <button
              className={`zeekr-nav-btn ${activeTab === "car" ? "active" : ""}`}
              onClick={() => setActiveTab("car")}
            >
              <IoCarSportSharp size={22} />
            </button>
            <button
              className={`zeekr-nav-btn ${activeTab === "calendar" ? "active" : ""}`}
              onClick={() => setActiveTab("calendar")}
            >
              <BiCalendarAlt size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZeekrBottomNavigation;
