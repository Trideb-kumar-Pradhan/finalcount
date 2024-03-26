import "../src/App.css";

import { useState, useEffect } from "react";

function App() {
  const [toggle, setToggle] = useState(false);
  const [targetDate, setTargetDate] = useState(null);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const selectedDate = new Date(event.target.value).getTime();
    const currentDate = new Date().getTime();
    const timeDifference = selectedDate - currentDate;
    if (timeDifference / (1000 * 60 * 60 * 24) > 100) {
      setMessage("Selected time is more than 100 days");
      setTargetDate(null);
      setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      setMessage("");
      setTargetDate(currentDate + timeDifference);
    }
  };

  const calculateTimeLeft = () => {
    if (targetDate) {
      const difference = targetDate - new Date().getTime();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setRemainingTime({ days, hours, minutes, seconds });
      } else {
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setToggle(false);
        setMessage("The Coundown is over what's your next adventure?");
      }
    }
  };

  useEffect(() => {
    if (toggle) {
      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer);
    }
  }, [toggle, targetDate]);

  const handleClick = () => {
    setToggle(!toggle);
    if (!toggle) {
      calculateTimeLeft();
    } else {
      setTargetDate(null);
      setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h1>
        CountDown <span> Timer</span>
      </h1>
      <div className="innercontainer">
        <input type="datetime-local" onChange={handleChange} /> <br />
        <button className="startbutton" onClick={handleClick}>
          {toggle ? "Cancel Timer" : "Start Timer"}
        </button>
        {message && <div className="message">{message}</div>}
        {!message && (
          <div className="timer">
            <div className="day">
              <h2>
                <span>{remainingTime.days} </span>
                <br></br> Days
              </h2>
            </div>
            <div className="hour">
              <h2>
                <span>{remainingTime.hours} </span>
                <br></br> Hours
              </h2>
            </div>
            <div className="min">
              <h2>
                <span>{remainingTime.minutes} </span>
                <br></br> Minutes
              </h2>
            </div>
            <div className="sec">
              <h2>
                <span>{remainingTime.seconds} </span>
                <br></br> Seconds
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;