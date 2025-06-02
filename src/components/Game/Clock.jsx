import React from "react";

function Clock({isNight, time}) {

    return (
        <div className="clock-outer">
            <div className="clock">
                {isNight ? "🌙" : "☀️"} -  {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
        </div>
    );
}

export default Clock;