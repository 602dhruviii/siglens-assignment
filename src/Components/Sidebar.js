import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ setCurrentView, fetchMetrics }) => {
  const [showMetricsDropdown, setShowMetricsDropdown] = useState(false);

  const toggleMetricsDropdown = () => {
    setShowMetricsDropdown(!showMetricsDropdown);
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    document.head.appendChild(link);
  }, []);
  return (
    <div className="sidebar">
      <ul>
        <li className="sidebar-item" onClick={toggleMetricsDropdown}>
          Metrics
          {showMetricsDropdown && (
            <ul className="dropdown">
              <div className="di">
                <div style={{display:"flex",flexDirection:"row"}}>
                  <h4 >Metrics &#8594;</h4>
                  
                </div>
                <div className="viewdoc">
                  <hr />
                  <h4>Docs</h4>
                  <i className="fa fa-external-link"></i>
                </div>
              </div>
              <li
                className="dropdown-item"
                onClick={() => setCurrentView("explorer")}
              >
                Explorer
              </li>
              <li className="dropdown-item" onClick={fetchMetrics}>
                Summary
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-item">Logs</li>
        <li className="sidebar-item">Tracing</li>
        <li className="sidebar-item">SLOs</li>
        <li className="sidebar-item">Alerting</li>
        <li className="sidebar-item">Dashboards</li>
        <li className="sidebar-item">SLOs</li>
      </ul>
    </div>
  );
};

export default Sidebar;
