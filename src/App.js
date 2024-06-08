// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import SummaryTable from './Components/SummaryTable';

function App() {
  const [metrics, setMetrics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [metricsPerPage] = useState(30);
  const [currentView, setCurrentView] = useState('');

  const fetchMetrics = async () => {
    const response = await fetch('http://playground.siglens.com:5122/metrics-explorer/api/v1/metric_names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        start: "now-lh",
        end: "now"
      })
    });
    const data = await response.json();
    setMetrics(data.metricNames);
    setCurrentView('summary');
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Sidebar setCurrentView={setCurrentView} fetchMetrics={fetchMetrics} />
      <div className="content">
        {currentView === 'explorer' && (
          <div>
            <h1>Explorer</h1>
            <p>This is the Explorer page.</p>
          </div>
        )}
        {currentView === 'summary' && (
          <SummaryTable 
            metrics={metrics} 
            metricsPerPage={metricsPerPage} 
            currentPage={currentPage} 
            paginate={paginate} 
          />
        )}
        {currentView === '' && (
          <div>
            <h1>DashBoard</h1>
            <p>Main dashboard</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
