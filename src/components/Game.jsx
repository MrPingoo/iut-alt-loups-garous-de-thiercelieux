import React, { useState, useEffect } from "react";
import "../styles.css";
import Clock from "./Game/Clock";
import Player from "./Game/Player";
import Info from "./Game/Info";
import Board from "./Game/Board";
import Chat from "./Game/Chat";
import ModalQuestion from "./Game/ModalQuestion";

function Game() {
    const [time, setTime] = useState(new Date(0, 0, 0, 6, 0, 0)); // Commence à 6h du matin
    const [isNight, setIsNight] = useState(false);

    /**
     * Crée et initialise les joueurs selon une configuration de base.
     * @param {Array<{name: string, role: string, powers?: {lifePotion?: boolean, deathPotion?: boolean, isMayor?: boolean, lovers?: Array<string>}}>} playerConfigs
     * @returns {Array} Liste des joueurs initialisés
     */
    function createPlayers(playerConfigs) {
        return playerConfigs.map(({ name, role, powers = {} }) => ({
            name,
            role,
            isDead: false,
            deadAt: null,
            powers: {
                lifePotion: powers.lifePotion || false,
                deathPotion: powers.deathPotion || false,
                isMayor: powers.isMayor || false,
                lovers: powers.lovers || []
            }
        }));
    }

    const MIN_PLAYERS = 8;
    const MAX_PLAYERS = 12;
    const NUM_PLAYERS = 8;

    if (NUM_PLAYERS < MIN_PLAYERS || NUM_PLAYERS > MAX_PLAYERS) {
        throw new Error(`NUM_PLAYERS doit être compris entre ${MIN_PLAYERS} et ${MAX_PLAYERS}`);
    }

    const DEFAULT_ROLES = [
        "loup-garou",
        "chasseur",
        "voleur",
        "petite-fille",
        "cupidon",
        "villagois"
    ];

    const players = createPlayers(
        Array.from({ length: NUM_PLAYERS }, (_, i) => ({
            name: `Joueur ${i + 1}`,
            role: DEFAULT_ROLES[i] || "villagois"
        }))
    );

    useEffect(() => {
        // Simule l'écoulement du temps
        const interval = setInterval(() => {
            setTime((prevTime) => {
                const newTime = new Date(prevTime.getTime() + 12000); // Ajoute 12 minutes (12 * 60 * 1000 ms)
                const hours = newTime.getHours();
                setIsNight(hours < 6 || hours >= 18); // Détermine si c'est la nuit
                return newTime;
            });
        }, 1000); // Intervalle de 1 seconde

        return () => clearInterval(interval); // Nettoyage de l'intervalle
    }, []);

    return (
        <>
            <div className="game">
                <div className={"background " + (isNight ? 'background-night' : "")} id="background"></div>
                <Clock isNight={true} time={time}/>
                {/*
                <ModalQuestion/>
                */}
                <Info/>
                <Player/>
                <Board players={players}/>
                <Chat/>
            </div>
        </>
    );
}

export default Game;