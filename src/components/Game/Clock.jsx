import React from "react";

function Clock({isNight}) {

    return (
        <div className="clock-outer">
            <div className="clock">
                {isNight ? "🌙" : "☀️"} - 12:00
            </div>
        </div>
    );
}

export default Clock;