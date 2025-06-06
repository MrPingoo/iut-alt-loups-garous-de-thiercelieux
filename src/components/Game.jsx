import React, { useState, useEffect } from "react";
import "../styles.css";
import Clock from "./Game/Clock";
import Player from "./Game/Player";
import Info from "./Game/Info";
import Board from "./Game/Board";
import Chat from "./Game/Chat";
import ModalQuestion from "./Game/ModalQuestion";

function Game() {
    const [time, setTime] = useState(new Date(0, 0, 0, 6, 0, 0)); // commence à 6h du matin
    const [isNight, setIsNight] = useState(false);

    // État des joueurs et messages d'information
    const [players, setPlayers] = useState(() => {
        // Configuration initiale des joueurs
        const DEFAULT_NAMES = [
            "Paul", "Charlotte", "Alice", "Guillaume", "Éloïse", "Mathieu",
            "Sophie", "Julien", "Camille", "Lucas", "Marine", "Thomas"
        ];
        const NUM_PLAYERS = 8;
        const ROLE_COUNTS = {
            8: { wolves: 2, villagers: 1 },
            9: { wolves: 2, villagers: 2 },
            10: { wolves: 3, villagers: 2 },
            11: { wolves: 3, villagers: 3 },
            12: { wolves: 4, villagers: 3 }
        };
        const { wolves: numWolves, villagers: numVillagers } = ROLE_COUNTS[NUM_PLAYERS];
        const OTHER_ROLES = ["chasseur", "voleur", "petite-fille", "cupidon", "voyante"];
        const shuffle = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const SHUFFLED_ROLES = shuffle([
            ...Array(numWolves).fill("loup-garou"),
            ...OTHER_ROLES,
            ...Array(numVillagers).fill("villageois")
        ]);
        // Création des joueurs
        const initialConfigs = ["Moi", ...DEFAULT_NAMES.slice(0, NUM_PLAYERS - 1)].map((name, i) => ({
            name,
            role: SHUFFLED_ROLES[i]
        }));
        const createPlayers = (configs) => configs.map(({ name, role }) => ({
            name,
            role,
            isDead: false,
            deadAt: null,
            powers: { lifePotion: false, deathPotion: false, isMayor: false, lovers: [] }
        }));
        return createPlayers(initialConfigs);
    });
    const [infoMessages, setInfoMessages] = useState([]);
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

    // Questions et séquence pour la première nuit
    const firstNightQuestions = [
        { key: "CUPIDON", type: "selectPlayers", question: "Cupidon, choisissez deux joueurs à lier comme amants :", min: 2, max: 2 },
        { key: "VOYANTE", type: "selectPlayer", question: "Voyante, choisissez un joueur dont vous voulez voir le rôle :" },
        { key: "LOUPS_GAROUS", type: "selectPlayer", question: "Loups-garous, choisissez une victime à éliminer ce soir :" },
        { key: "WITCH_SAVE", type: "yesNo", question: "Sorcière, souhaitez-vous utiliser votre potion de vie pour sauver la victime ?" },
        { key: "WITCH_SAVE_PLAYER", type: "selectPlayer", question: "Quelle personne souhaitez-vous sauver ?" },
        { key: "WITCH_KILL", type: "yesNo", question: "Sorcière, souhaitez-vous utiliser votre potion de mort pour tuer quelqu'un ?" },
        { key: "WITCH_KILL_PLAYER", type: "selectPlayer", question: "Quelle personne souhaitez-vous tuer ?" }
    ];

    // Traitement des réponses de la première nuit
    const handleFirstNightComplete = (answers) => {
        /*
        const messages = [];
        // Cupidon lie deux amoureux
        const lovers = answers.CUPIDON || [];
        if (lovers.length === 2) {
            setPlayers((prev) => prev.map((p) => {
                if (lovers.includes(p.name)) {
                    return { ...p, powers: { ...p.powers, lovers: lovers.filter((n) => n !== p.name) } };
                }
                return p;
            }));
            messages.push(`Cupidon a lié ${lovers[0]} et ${lovers[1]}.`);
        }
        */
        /*
        // Voyante révèle le rôle
        const seen = answers.VOYANTE;
        if (seen) {
            const target = players.find((p) => p.name === seen);
            messages.push(`Voyante a découvert que ${seen} est ${target ? target.role : 'inconnu'}.`);
        }
        // Loups-garous choisissent une victime
        const victim = answers.LOUPS_GAROUS;
        if (victim) {
            setPlayers((prev) => prev.map((p) => p.name === victim ? { ...p, isDead: true, deadAt: 'Nuit 1' } : p));
            messages.push(`Les loups-garous ont attaqué ${victim}.`);
        }
        // Sorcière - potion de vie
        if (answers.WITCH_SAVE) {
            const savee = answers.WITCH_SAVE_PLAYER;
            if (savee) {
                setPlayers((prev) => prev.map((p) => p.name === savee ? { ...p, isDead: false, deadAt: null } : p));
                messages.push(`Sorcière a sauvé ${savee} grâce à sa potion de vie.`);
            }
        } else {
            messages.push("Sorcière n'a pas utilisé sa potion de vie.");
        }
        // Sorcière - potion de mort
        if (answers.WITCH_KILL) {
            const kill = answers.WITCH_KILL_PLAYER;
            if (kill) {
                setPlayers((prev) => prev.map((p) => p.name === kill ? { ...p, isDead: true, deadAt: 'Nuit 1 (Sorcière)' } : p));
                messages.push(`Sorcière a tué ${kill} avec sa potion de mort.`);
            }
        } else {
            messages.push("Sorcière n'a pas utilisé sa potion de mort.");
        }
        setInfoMessages(messages);
         */
    };

    return (
        <div className="game">
            <div className={`background ${isNight ? 'background-night' : ''}`} id="background"></div>
            <Clock isNight={true} time={time} />
            {/*<ModalQuestion
                questions={firstNightQuestions}
                players={players}
                onComplete={handleFirstNightComplete}
            />*/}
            <Info messages={infoMessages} />
            <Player players={players}/>
            <Board players={players} />
            <Chat />
        </div>
    );
}

export default Game;