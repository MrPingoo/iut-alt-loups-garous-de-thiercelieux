import React from "react";

function Player({players}) {
    var me = players.find((p) => p.name === "Moi");

    return (
        <>
            {/* Player */}
            <div className={"game-map player-" + me.role}>
                <div className="icons-container">
                    <div className={"icon icon-major"} title="Major"></div>
                    <div className={"icon icon-lovers"} title="Lovers"></div>
                    <div className={"icon icon-death-potion"} title="Death Potion"></div>
                    <div className={"icon icon-life-potion"} title="Life Potion"></div>
                </div>
            </div>
        </>
    );
}

export default Player;