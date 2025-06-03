import React, { useState, useEffect } from "react";
import "../styles.css";
import Clock from "./Game/Clock";
import Player from "./Game/Player";
import Info from "./Game/Info";
import Board from "./Game/Board";
import Chat from "./Game/Chat";
import ModalQuestion from "./Game/ModalQuestion";
 import { Questions as QUESTIONS } from "../contants/Questions";

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

    const OTHER_ROLES = [
        "chasseur",
        "voleur",
        "petite-fille",
        "cupidon",
        "voyante"
    ];

    const DEFAULT_NAMES = [
        "Paul",
        "Charlotte",
        "Alice",
        "Guillaume",
        "Éloïse",
        "Mathieu",
        "Sophie",
        "Julien",
        "Camille",
        "Lucas",
        "Marine",
        "Thomas"
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const ROLE_COUNTS = {
        8: { wolves: 2, villagers: 1 },
        9: { wolves: 2, villagers: 2 },
        10: { wolves: 3, villagers: 2 },
        11: { wolves: 3, villagers: 3 },
        12: { wolves: 4, villagers: 3 }
    };

    const { wolves: numWolves, villagers: numVillagers } = ROLE_COUNTS[NUM_PLAYERS];

    const SHUFFLED_ROLES = shuffle([
        ...Array(numWolves).fill("loup-garou"),
        ...OTHER_ROLES,
        ...Array(numVillagers).fill("villagois")
    ]);
    const players = createPlayers(
        ["Moi", ...DEFAULT_NAMES.slice(0, NUM_PLAYERS - 1)].map((name, i) => ({
            name,
            role: SHUFFLED_ROLES[i]
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
                <ModalQuestion
                    questions={QUESTIONS}
                    players={players}
                    onComplete={(answers) => console.log("Réponses modal :", answers)}
                />
                <Info/>
                <Player/>
                <Board players={players}/>
                <Chat/>
            </div>
        </>
    );
}

export default Game;