import React, { useState } from "react";

// Liste des questions pour les différentes étapes du jeu
export const QUESTIONS = [
  {
    key: "YES_NO",
    type: "yesNo",
    question: "La sorcière souhaite-t-elle utiliser sa potion de vie pour ressusciter une personne ?"
  },
  {
    key: "PLAYER_COUNT",
    type: "selectNumber",
    question: "Combien de joueurs souhaitez-vous sélectionner ?",
    options: [1, 2]
  },
  {
    key: "CUPIDON",
    type: "selectPlayers",
    question: "Cupidon, choisissez deux joueurs à lier comme amants :",
    min: 2,
    max: 2
  },
  {
    key: "CHASSEUR",
    type: "selectPlayer",
    question: "Chasseur, quelle personne souhaitez-vous tuer ?"
  },
  {
    key: "LOUPS_GAROUS",
    type: "selectPlayer",
    question: "Loups-garous, quelle personne souhaitez-vous tuer ?"
  },
  {
    key: "VOYANTE",
    type: "selectCard",
    question: "Voyante, quelle carte souhaitez-vous voir ?"
  },
  {
    key: "VOLEUR",
    type: "selectPlayer",
    question: "Voleur, avec qui souhaitez-vous échanger votre carte ?"
  },
  {
    key: "WITCH_KILL",
    type: "yesNo",
    question: "La sorcière souhaite-t-elle tuer une personne ?"
  },
  {
    key: "MAIRE",
    type: "selectPlayer",
    question: "Qui doit être élu maire ?"
  }
];

function ModalQuestion({ players = [], onLoversSelected }) {
    const [isOpen, setIsOpen] = useState(true);
    const [step, setStep] = useState("start");
    const [selectedLovers, setSelectedLovers] = useState([]);

    if (!isOpen) return null;

    const handleStart = () => setStep("cupid");
    const handleConfirmLovers = () => {
        if (onLoversSelected) onLoversSelected(selectedLovers);
        setIsOpen(false);
    };

    if (step === "start") {
        return (
            <div className="modal-overlay">
                <div className="modal">
                    <h3>
                        Le jour se lève sur le village de Thiercelieu, voulez-vous commencer la partie ?
                    </h3>
                    <div className="modal-actions">
                        <button onClick={handleStart}>
                            Commencer
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Modal pour Cupidon : choix de deux amants
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Cupidon, choisissez deux joueurs à lier comme amants :</h3>
                <div className="players-list">
                    {players.map((p) => (
                        <div
                            key={p.name}
                            className={
                                "player-card" +
                                (selectedLovers.includes(p.name) ? " selected" : "")
                            }
                            onClick={() => {
                                if (selectedLovers.includes(p.name)) {
                                    setSelectedLovers((lst) => lst.filter((n) => n !== p.name));
                                } else if (selectedLovers.length < 2) {
                                    setSelectedLovers((lst) => [...lst, p.name]);
                                }
                            }}
                        >
                            {p.name}
                        </div>
                    ))}
                </div>
                <div className="modal-actions">
                    <button
                        disabled={selectedLovers.length !== 2}
                        onClick={handleConfirmLovers}
                    >
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalQuestion;