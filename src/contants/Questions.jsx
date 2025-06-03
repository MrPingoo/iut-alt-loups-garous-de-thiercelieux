
// Liste des questions pour les différentes étapes du jeu
export const Questions = [
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