import React from 'react'

interface CommonProps {
    children?: React.ReactNode;
    className: string;
    // ...other props that always exist
}

type ButtonProps =
    {
          timeElapsed?: number;
    }

type Props = CommonProps & ButtonProps;

const FormatTime = (props: Props) => {

    const milliseconds = Math.floor((props.timeElapsed % 1000) / 10);
    const seconds = Math.floor((props.timeElapsed % 60000) / 1000);
    const minutes = Math.floor(props.timeElapsed / 60000);

    const humanized = [
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
        milliseconds.toString().padStart(2, "0"),
    ].join(":");

    return(
        <p className={props.className}>{humanized}</p>
    )
};

export default FormatTime;