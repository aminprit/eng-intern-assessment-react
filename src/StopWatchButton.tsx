import React, { useEffect } from "react";

interface CommonProps {
    children?: React.ReactNode;
    // ...other props that always exist
}

type ButtonProps =
    | {
          variant?: "start";
          timeElapsed?: never;
          setOn?: React.Dispatch<React.SetStateAction<boolean>>;
          setLaps?: never;
          setPrevStartTime?: React.Dispatch<React.SetStateAction<number>>;
          setPrevTimeElapsed?: never;
          setTimeElapsed?: never;
      }
    | {
          variant?: "reset";
          timeElapsed?: never;
          setOn?: React.Dispatch<React.SetStateAction<boolean>>;
          setLaps?: React.Dispatch<React.SetStateAction<number[]>>;
          setPrevStartTime?: React.Dispatch<React.SetStateAction<number>>;
          setPrevTimeElapsed?: React.Dispatch<React.SetStateAction<number>>;
          setTimeElapsed?: React.Dispatch<React.SetStateAction<number>>;
      }
    | {
          variant?: "pause";
          timeElapsed?: number;
          setOn?: React.Dispatch<React.SetStateAction<boolean>>;
          setLaps?: never;
          setPrevStartTime?: never;
          setPrevTimeElapsed?: React.Dispatch<React.SetStateAction<number>>;
          setTimeElapsed?: never;
      }
    | {
          variant?: "lap";
          timeElapsed?: number;
          setOn?: never;
          setLaps?: React.Dispatch<React.SetStateAction<number[]>>;
          setPrevStartTime?: never;
          setPrevTimeElapsed?: never;
          setTimeElapsed?: never;
      };

type Props = CommonProps & ButtonProps;

const StopWatchButton = (props: Props) => {
    useEffect(() => {}, [props.timeElapsed]);

    const handleStart = () => {
        props.setOn(true);
        const date = new Date();
        props.setPrevStartTime(date.getTime());
    };

    const handleReset = () => {
        props.setOn(false);
        props.setTimeElapsed(0);
        props.setPrevTimeElapsed(0);
        props.setPrevStartTime(0);
        props.setLaps([]);
    };

    const handlePause = () => {
        props.setOn(false);
        const date = new Date();
        console.log(props.timeElapsed);
        props.setPrevTimeElapsed(props.timeElapsed);
    };

    const handleLaps = () => {
        props.setLaps((previousLap) => {
            return [...previousLap, props.timeElapsed];
        });
    };

    switch (props.variant) {
        case "start":
            return <button onClick={handleStart}>Start</button>;
        case "pause":
            return <button onClick={handlePause}>Pause</button>;
        case "reset":
            return <button onClick={handleReset}>Reset</button>;
        case "lap":
            return <button onClick={handleLaps}>Lap</button>;
    }
};

export default StopWatchButton;
