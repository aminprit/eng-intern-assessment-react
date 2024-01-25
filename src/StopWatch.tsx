import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

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
        <div className='stopwatch-container'>
            <h1> Stop Watch</h1>
            <StopWatchButton
                variant={"start"}
                setOn={setOn}
                setPrevStartTime={setPrevStartTime}
            />
            <StopWatchButton
                variant={"pause"}
                timeElapsed={timeElapsed}
                setOn={setOn}
                setPrevTimeElapsed={setPrevTimeElapsed}
                />
            <StopWatchButton
                variant={"reset"}
                setOn={setOn}
                setLaps={setLaps}
                setPrevTimeElapsed={setPrevTimeElapsed}
                setTimeElapsed={setTimeElapsed}
                setPrevStartTime={setPrevStartTime}
            />
            <StopWatchButton
                variant={"lap"}
                timeElapsed={timeElapsed}
                setLaps={setLaps}
            />
            <p>timeElapsed: {timeElapsed}</p>
            <p>laps:</p>
            <div className='laps-container'style= {{height: '500px', overflowY: 'scroll'}}>
            {laps.map((lap, i) => (
                <p key={i}>
                    {i + 1}: {lap}
                </p>
            ))}
            </div>
            
            
        </div>
    );
}
