import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import FormatTime from "./FormatTime";

export default function StopWatch() {
    const [timeElapsed, setTimeElapsed] = useState(0); // in milli-seconds
    const [prevTimeElapsed, setPrevTimeElapsed] = useState(0); // in milli-seconds
    const [prevStartTime, setPrevStartTime] = useState(0);
    const [on, setOn] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (on) {
                const date = new Date();
                const currentTimeElapsed = date.getTime() - prevStartTime;
                setTimeElapsed(currentTimeElapsed + prevTimeElapsed);
            }
        }, 1);
        return () => clearInterval(intervalId);
    }, [on]);

    return (
        <div className="stopwatch-container">
            <h1 className="stopWatch-header"> Stop Watch</h1>

            <FormatTime className="displayTimer" timeElapsed={timeElapsed} />

            <StopWatchButton
                className="stopWatch-button"
                variant={"start"}
                setOn={setOn}
                setPrevStartTime={setPrevStartTime}
            />
            <StopWatchButton
                className="stopWatch-button"
                variant={"pause"}
                timeElapsed={timeElapsed}
                setOn={setOn}
                setPrevTimeElapsed={setPrevTimeElapsed}
            />
            <StopWatchButton
                className="stopWatch-button"
                variant={"reset"}
                setOn={setOn}
                setLaps={setLaps}
                setPrevTimeElapsed={setPrevTimeElapsed}
                setTimeElapsed={setTimeElapsed}
                setPrevStartTime={setPrevStartTime}
            />
            <StopWatchButton
                className="stopWatch-button"
                variant={"lap"}
                timeElapsed={timeElapsed}
                setLaps={setLaps}
            />
            {/* <p className="displayTimer">timeElapsed: {timeElapsed}</p> */}
            {laps.length > 0 && <p className="lap-Header">Laps:</p>}
            <div className="laps-container">
                {laps.map((lap, i) => (
                    <div className="laps-list" key={i}>
                        <p>Lap {laps.length - i}</p>
                        <FormatTime
                            className=".laps-list"
                            timeElapsed={i < laps.length - 1 ? lap - laps[i + 1] : lap}
                            
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
