import React, { useState } from "react";

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