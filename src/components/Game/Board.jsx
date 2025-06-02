import React from "react";

function Board({ players = [] }) {
    return (
        <>
            {/* Tableau des joueurs */}
            <div className="player-table">
                <table>
                    <thead>
                        <tr>
                            <th>Nom du Joueur</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr key={player.name || index}>
                                <td>{player.name}</td>
                                <td>
                                    <div className="status-icon"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Board;