# Digital Modulation Simulator

A full-stack web application that simulates and visualizes various digital modulation techniques. Designed for educational purposes, it allows users to input binary data and visualize how it is modulated onto an analog carrier wave.

🚀 Features
- Simulates common digital and pulse modulation methods.
- Interactive visualization with multi-channel plots (digital input, carrier, output).
- Educational UI suitable for learning modulation concepts.

## Modulation Techniques

Analog Modulations:
- ASK (Amplitude Shift Keying)  
- FSK (Frequency Shift Keying)  
- PSK (Phase Shift Keying)

Pulse Modulations:
- PAM (Pulse Amplitude Modulation)  
- PWM (Pulse Width Modulation)  
- PPM (Pulse Position Modulation)

## Visualizations

The dashboard provides a clear, multi-channel view of the signal processing:

- **Digital Input Channel:** Visualizes the binary bitstream as a stepped digital wave.  
- **Carrier Channel:** Visualizes the raw analog carrier sine wave.  
- **Output Channel:** Visualizes the resulting modulated signal based on the selected technique.

## 🛠️ Tech Stack

- Frontend: React.js, Plotly.js (via react-plotly.js), Axios  
- Backend: Python 3, Flask, NumPy (for vector math and signal generation)  
- Styling: CSS Grid & Flexbox (Dark/Scientific UI theme)

## ⚙️ Installation Guide

### Prerequisites
- Node.js (for the frontend)  
- Python 3 (for the backend)

### 1. Setup Backend (Python)
Navigate to the backend folder and install dependencies.

```bash
cd backend

# Create a virtual environment (Optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install libraries
pip install flask flask-cors numpy
```

### 2. Setup Frontend (React)
Open a new terminal, navigate to the frontend folder, and install dependencies.

```bash
cd frontend

# Install React and Plotly packages
npm install
# Note: Ensure axios and react-plotly.js are in package.json.
# If not, run: npm install axios plotly.js react-plotly.js
```

## 🏃‍♂️ How to Run

Run Backend and Frontend in two separate terminals.

Terminal 1 — Start Backend:
```bash
cd backend
python app.py
# Server should start on http://127.0.0.1:5000
```

Terminal 2 — Start Frontend:
```bash
cd frontend
npm start
# React should open at http://localhost:3000
```

## 📖 Usage Manual

Input Parameters:
- **Modulation Type:** Select from the dropdown (ASK, FSK, etc.).  
- **Bit Stream:** Enter a binary string (e.g., `10110`).  
- **Frequency:** Set carrier frequency in Hz.  
- **Amplitude:** Set signal voltage level.

Click the **Generate Signals** button. The backend processes the data and the frontend displays the three corresponding graphs.

## 📂 Project Structure

```
modulation-simulator/
│
├── backend/
│   ├── app.py             # Main Flask server & Modulation logic
│   └── venv/              # Python virtual environment
│
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React Component & Graph Logic
│   │   ├── App.css        # Dashboard & Dark UI Styling
│   │   └── index.js       # Entry point
│   ├── package.json       # JS Dependencies
│   └── public/
│
└── README.md
```

## 🐛 Troubleshooting

- "Network Error" / Nothing happens when clicking Generate:
  - Ensure the Python backend is running.
  - Check that the backend is on port 5000 and React is on 3000.

- Module not found:
  - Frontend: Run `npm install` inside the frontend folder.
  - Backend: Run `pip install flask flask-cors numpy`.