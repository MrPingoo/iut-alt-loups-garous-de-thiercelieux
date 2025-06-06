import React from "react";

function Info({ messages = [] }) {
    return (
        <div className="container">
            {messages.map((msg, idx) => (
                <p key={idx}>{msg}</p>
            ))}
        </div>
    );
}

export default Info;