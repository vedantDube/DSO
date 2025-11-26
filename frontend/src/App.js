import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './App.css'; // We will create this next

function App() {
  const [inputs, setInputs] = useState({
    amplitude: 5,
    frequency: 5,
    bitstream: "10110",
    type: "ASK"
  });

  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/modulate', inputs);
      setData(res.data);
    } catch (error) {
      alert("Server error. Is Python running?");
    }
  };

  // Helper to create common graph layout settings
  const getLayout = (title, color) => ({
    title: { text: title, font: { size: 14, color: '#333' } },
    autosize: true,
    height: 250,
    margin: { l: 40, r: 10, t: 30, b: 30 },
    xaxis: { showgrid: false },
    yaxis: { showgrid: true, zeroline: false },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  });

  return (
    <div className="container">
      
      {/* Sidebar Controls */}
      <div className="sidebar">
        <h2>Modulation Lab</h2>
        
        <div className="control-group">
          <label>Modulation Type</label>
          <select name="type" value={inputs.type} onChange={handleChange}>
            <option value="ASK">ASK (Amplitude Shift)</option>
            <option value="FSK">FSK (Frequency Shift)</option>
            <option value="PSK">PSK (Phase Shift)</option>
            <option value="PAM">PAM (Pulse Amplitude)</option>
            <option value="PWM">PWM (Pulse Width)</option>
            <option value="PPM">PPM (Pulse Position)</option>
          </select>
        </div>

        <div className="control-group">
          <label>Bit Stream (1s & 0s)</label>
          <input name="bitstream" type="text" value={inputs.bitstream} onChange={handleChange} />
        </div>

        <div className="control-group">
          <label>Carrier Frequency (Hz)</label>
          <input name="frequency" type="number" value={inputs.frequency} onChange={handleChange} />
        </div>

        <div className="control-group">
          <label>Amplitude (V)</label>
          <input name="amplitude" type="number" value={inputs.amplitude} onChange={handleChange} />
        </div>

        <button className="generate-btn" onClick={handleGenerate}>
          Generate Signals
        </button>
      </div>

      {/* Main Graph Area */}
      <div className="main-content">
        {!data ? (
          <div className="placeholder">
            <h3>Ready to Simulate</h3>
            <p>Enter parameters on the left and click Generate.</p>
          </div>
        ) : (
          <div className="charts-container">
            
            {/* 1. Digital Input Graph */}
            <div className="chart-card">
              <Plot
                data={[{
                  x: data.time,
                  y: data.digital,
                  type: 'scatter',
                  mode: 'lines',
                  line: { shape: 'hv', color: '#e74c3c', width: 2 }, // 'hv' = horizontal-vertical step
                  name: 'Digital'
                }]}
                layout={getLayout('Digital Input (Bitstream)', '#e74c3c')}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* 2. Analog Input Graph */}
            <div className="chart-card">
              <Plot
                data={[{
                  x: data.time,
                  y: data.carrier,
                  type: 'scatter',
                  mode: 'lines',
                  line: { color: '#f1c40f', width: 2 },
                  name: 'Carrier'
                }]}
                layout={getLayout('Analog Carrier Input', '#f1c40f')}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* 3. Result Output Graph */}
            <div className="chart-card">
              <Plot
                data={[{
                  x: data.time,
                  y: data.modulated,
                  type: 'scatter',
                  mode: 'lines',
                  fill: 'tozeroy', // Fills area under curve for better look
                  line: { color: '#2ecc71', width: 2 },
                  name: 'Output'
                }]}
                layout={getLayout(`Modulated Output (${inputs.type})`, '#2ecc71')}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;