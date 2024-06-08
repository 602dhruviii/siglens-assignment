// src/SummaryTable.js
import React, { useState,useEffect } from "react";
import "./Summary.css";
import tagIcon from "./tag.png";

const SummaryTable = ({ metrics, metricsPerPage, currentPage, paginate }) => {
    const [sortedMetrics, setSortedMetrics] = useState([]);

    useEffect(() => {
      
      const sorted = [...metrics].sort((a, b) => a.localeCompare(b));
      setSortedMetrics(sorted);
    }, [metrics]);
  
    const indexOfLastMetric = currentPage * metricsPerPage;
    const indexOfFirstMetric = indexOfLastMetric - metricsPerPage;
    const currentMetrics = sortedMetrics.slice(
      indexOfFirstMetric,
      indexOfLastMetric
    );
    const totalPages = Math.ceil(sortedMetrics.length / metricsPerPage);
  
    const handlePaginate = (number) => {
      paginate(number);
    };
  return (
    <div className="summary">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ marginRight: "10px" }}>
          All metrics reporting across your infrastructure in the past
        </h2>
        <div className="firstdrop" style={{ marginRight: "10px" }}>
          <select>
            <option value="">1 hour</option>
            <option value="">3 hour</option>
            <option value="">6 hour</option>
            <option value="">12 hour</option>
          </select>
        </div>
      </div>
      <div className="container">
        <div className="input-field">
          <label htmlFor="metric" className="input-label">
            Metric
          </label>
          <input
            type="text"
            id="metric"
            name="metric"
            placeholder="&#128269; Search metrics"
          />
        </div>
        <div className="input-field">
          <label htmlFor="tag" className="input-label">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            placeholder="Filter by Tag Value"
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>&#8593; METRIC NAME</th>
            <th>LAST CONFIGURED</th>
          </tr>
        </thead>
        <tbody>
          {currentMetrics.map((metric, index) => (
            <tr key={index} className="met">
              <td>
                {metric}
                
              </td>
              <td style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                -
                <span className="icon">
                  <img src={tagIcon} alt="Tag Icon" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePaginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr;
        </button>
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number}
            onClick={() => handlePaginate(number + 1)}
            className={currentPage === number + 1 ? "active" : ""}
          >
            {number + 1}
          </button>
        ))}
        <button
          onClick={() => handlePaginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default SummaryTable;
