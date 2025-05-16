import React from "react";
import "../styles.css";
import Clock from "./Game/Clock";
import Player from "./Game/Player";
import Info from "./Game/Info";
import Board from "./Game/Board";
import Chat from "./Game/Chat";
import ModalQuestion from "./Game/ModalQuestion";

function Game() {
    return (
        <>
            <div className="game">
                <div className={"background background-night"} id="background"></div>
                <Clock isNight={true}/>
                {/*
                <ModalQuestion/>
                */}
                <Info/>
                <Player/>
                <Board/>
                <Chat/>
            </div>
        </>
    );
}

export default Game;