import React, { useEffect, useState } from "react";
import "./Clock.css";

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());
  const [alarmDateTime, setAlarmDateTime] = useState("");
  const [message, setMessage] = useState("");

   
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);

      // Alarm check
      if (alarmDateTime) {
        const current = now.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
        if (current === alarmDateTime) {
          setMessage("⏰ Alarm! Wake up!");
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [alarmDateTime]);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6-90;
  const minuteDeg = minutes * 6 + seconds * 0.1-90;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5-90;

  const todayDate = time.toLocaleDateString();

  return (
    <div className="clock-container">
      <div className="analog-clock">
        <div className="dial">
          {/* Numbers on the clock */}
         {Array.from({ length: 12 }, (_, i) => (
  <div
    key={i}
    className="number"
    style={{
      transform: `rotate(${i * 30}deg) translate(0, -125px) rotate(-${i * 30}deg)`,
         
    }}
  >
    
    {i === 0 ? 12 : i}
  </div>
))}

          {/* Hands */}
          <div
            className="hand hour"
            style={{ transform: `rotate(${hourDeg}deg)`  }}
          />
          <div
            className="hand minute"
            style={{ transform: `rotate(${minuteDeg}deg)`  }}
          />
          <div
            className="hand second"
            style={{ transform: `rotate(${secondDeg}deg)` }}
          />
          <div className="center-dot"></div>
        </div>
      </div>

      {/* Date */}
      <p className="date">📅 {todayDate}</p>

      {/* Alarm Input with Date+Time */}
      <div className="alarm-controls">
        <input
          type="datetime-local"
          value={alarmDateTime}
          onChange={(e) => {
            setAlarmDateTime(e.target.value);
            setMessage("");
          }}
        />
        <button onClick={() => setMessage("✅ Alarm Saved!")}>Save Alarm</button>
        <button
          onClick={() => {
            setAlarmDateTime("");
            setMessage("❌ Alarm Cleared");
          }}
        >
          Clear Alarm
        </button>
      </div>

      {/* Current Time */}
      <p className="time-text">⌚ Current Time: {time.toLocaleTimeString()}</p>

      {/* Alarm Message */}
      {message && <p className="alarm-msg">{message}</p>}
    </div>
  );
}
