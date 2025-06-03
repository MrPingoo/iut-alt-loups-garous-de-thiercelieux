import React, { useState } from "react";
import { Questions as QUESTIONS } from "../../contants/Questions";

function ModalQuestion({ questions = QUESTIONS, players = [], onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState([]);

  if (current >= questions.length) {
    if (onComplete) onComplete(answers);
    return null;
  }

  const q = questions[current];

  const gotoNext = (answer) => {
    setAnswers((prev) => ({ ...prev, [q.key]: answer }));
    setSelected([]);
    setCurrent((idx) => idx + 1);
  };

  const renderBody = () => {
    switch (q.type) {
      case "yesNo":
        return (
          <>
            <h3>{q.question}</h3>
            <div className="modal-actions">
              <button onClick={() => gotoNext(true)}>Oui</button>
              <button onClick={() => gotoNext(false)}>Non</button>
            </div>
          </>
        );
      case "selectNumber":
        return (
          <>
            <h3>{q.question}</h3>
            <div className="modal-actions">
              {q.options.map((opt) => (
                <button key={opt} onClick={() => gotoNext(opt)}>
                  {opt}
                </button>
              ))}
            </div>
          </>
        );
      case "selectPlayer":
        return (
          <>
            <h3>{q.question}</h3>
            <div className="players-list">
              {players.map((p) => (
                <div
                  key={p.name}
                  className="player-card"
                  onClick={() => gotoNext(p.name)}
                >
                  {p.name}
                </div>
              ))}
            </div>
          </>
        );
      case "selectPlayers":
        return (
          <>
            <h3>{q.question}</h3>
            <div className="players-list">
              {players.map((p) => {
                const isSel = selected.includes(p.name);
                return (
                  <div
                    key={p.name}
                    className={"player-card" + (isSel ? " selected" : "")}
                    onClick={() => {
                      const next = isSel
                        ? selected.filter((n) => n !== p.name)
                        : selected.length < q.max
                        ? [...selected, p.name]
                        : selected;
                      setSelected(next);
                    }}
                  >
                    {p.name}
                  </div>
                );
              })}
            </div>
            <div className="modal-actions">
              <button
                disabled={selected.length < q.min}
                onClick={() => gotoNext(selected)}
              >
                Confirmer
              </button>
            </div>
          </>
        );
      default:
        return (
          <>
            <h3>{q.question}</h3>
            <div className="modal-actions">
              <button onClick={() => gotoNext(null)}>Confirmer</button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">{renderBody()}</div>
    </div>
  );
}

export default ModalQuestion;