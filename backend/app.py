from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://dso-one.vercel.app",
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/modulate', methods=['POST'])
def modulate():
    data = request.json
    mod_type = data.get('type', 'ASK')
    amp = float(data.get('amplitude', 1))
    freq = float(data.get('frequency', 5))
    bitstream = data.get('bitstream', '00111001')

    bits = [int(b) for b in bitstream]
    
    # --- Setup Time & Resolution ---
    fs = 1000              # Hz
    bit_rate = 1           # 1 bit per second
    samples_per_bit = int(fs / bit_rate)
    total_duration = len(bits) / bit_rate
    t = np.linspace(0, total_duration, int(total_duration * fs), endpoint=False)
    
    # --- 1. Generate Digital Input Signal (Step Wave) ---
    # We repeat each bit 'samples_per_bit' times to match the time vector
    digital_signal = np.repeat(bits, samples_per_bit)

    # --- 2. Generate Analog Carrier Signal (Pure Sine) ---
    carrier_signal = amp * np.sin(2 * np.pi * freq * t)

    # --- 3. Generate Modulated Output ---
    modulated_signal = np.zeros_like(t)

    for i, bit in enumerate(bits):
        start = i * samples_per_bit
        end = (i + 1) * samples_per_bit
        t_slice = t[start:end]

        if mod_type == 'ASK':
            modulated_signal[start:end] = carrier_signal[start:end] if bit == 1 else 0
        
        elif mod_type == 'FSK':
            f_curr = freq if bit == 1 else freq / 2
            modulated_signal[start:end] = amp * np.sin(2 * np.pi * f_curr * t_slice)

        elif mod_type == 'PSK':
            phase = 0 if bit == 1 else np.pi
            modulated_signal[start:end] = amp * np.sin(2 * np.pi * freq * t_slice + phase)

        elif mod_type == 'PAM':
            modulated_signal[start:end] = amp if bit == 1 else 0

        elif mod_type == 'PWM':
            duty = 0.75 if bit == 1 else 0.25
            active_samples = int(samples_per_bit * duty)
            modulated_signal[start : start + active_samples] = amp
            modulated_signal[start + active_samples : end] = 0

        elif mod_type == 'PPM':
            pulse_width = int(samples_per_bit * 0.2)
            if bit == 1:
                modulated_signal[start : start + pulse_width] = amp
            else:
                modulated_signal[end - pulse_width : end] = amp

    return jsonify({
        "time": t.tolist(),
        "digital": digital_signal.tolist(),
        "carrier": carrier_signal.tolist(),
        "modulated": modulated_signal.tolist()
    })

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)