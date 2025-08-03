import React from "react";

import { useState, useEffect } from "react";

export default function Footer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // Очищення при зупинці або розмонтуванні
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <footer className="footer">
      <div className="footer__wrapper container">
        <div>
          <h2>Секунди: {seconds}</h2>
          <button onClick={() => setIsRunning(true)}>Старт</button>
        </div>
        &copy; abz.agency specially for the test task
      </div>
    </footer>
  );
}
