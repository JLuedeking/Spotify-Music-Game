import React, { useRef, useState } from "react";
import styled from "styled-components";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const screenSize = (window.innerWidth < 1000 ? 250 : 90);

const StyledTimer = styled.div`
  margin: 0 auto 0;
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  text-align: center;
  line-height: 5rem;
  font-size: 3rem;
  grid-column: 2 / 3;
  display: flex;
  justify-content: center;
  height: 100%;

  .timer-wrapper {
    position: relative;
    width: 80px;
    height: 60px;
    font-size: 120px;
    font-family: "Montserrat";
    
    @media (min-width: 70em) {
      font-size: 30px;
    }
    
    .time {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(0);
      opacity: 1;
      transition: all 0.2s;
    }
    
    .time.up {
      opacity: 0;
      transform: translateY(-100%);
    }
    
    .time.down {
      opacity: 0;
      transform: translateY(100%);
    }
  }
`;

const renderTime = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="timer-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
        key={prevTime.current}
        className={`time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

const Timer = (props) => {
  return (
    <StyledTimer>
      <CountdownCircleTimer
        isPlaying
        duration={20}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[20, 15, 10, 5]}
        size={screenSize}
        onComplete={props.timesUp}
      >
        {renderTime}
      </CountdownCircleTimer>
    </StyledTimer>
  );
};

export default Timer;
