import { useState } from "react";
import { cards } from "./cards";
import Flashcard from "./components/Flashcard";
import StartScreen from "./components/StartScreen";
import "./App.css";
import Summary from "./components/Summary";

// Skjáirnir sem forritið getur sýnt
type Screen = "start" | "cards" | "done";

export default function App() {
  // State: virkur skjár, staða spjalds og svör notandans
  const [screen, setScreen] = useState<Screen>("start");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  // Finna núverandi spjald og athuga hvort því hafi verið svarað
  const card = cards[index];
  const isLast = index === cards.length - 1;
  const isAnswered = answers.length > index;
  const currentAnswer = isAnswered ? answers[index] : null;

  // Vista eitt svar fyrir hvert spjald
  function handleAnswer(knew: boolean) {
    if (isAnswered) return;

    setAnswers([...answers, knew]);
  }

  // Fara á næsta spjald eða sýna niðurstöður
  function handleNext() {
    if (isLast) {
      setScreen("done");
      return;
    }

    setIndex(index + 1);
    setFlipped(false);
  }

  // Núllstilla spjöldin og fara aftur á byrjunarskjáinn
function handleRestart() {
  setIndex(0);
  setFlipped(false);
  setAnswers([]);
  setScreen("start");
}

  return (
    <main>
      <h1>QuizMe</h1>

      {/* Byrjunarskjár */}
      {screen === "start" && (
        <StartScreen total={cards.length} onStart={() => setScreen("cards")} />
      )}

      {/* Spjaldaskjár */}
      {screen === "cards" && (
        <section>
          <p>
            Spjald {index + 1} af {cards.length}
          </p>

          <Flashcard
            card={card}
            flipped={flipped}
            answer={currentAnswer}
            onFlip={() => setFlipped((wasFlipped) => !wasFlipped)}
          />

          {/* Svartakkarnir birtast þegar svarið sést */}
          {flipped && (
            <div className="answer-buttons">
              <button
                className="known-btn"
                onClick={() => handleAnswer(true)}
                disabled={isAnswered}
              >
                ✓ Ég kunni þetta
              </button>
              <button
                className="unknown-btn"
                onClick={() => handleAnswer(false)}
                disabled={isAnswered}
              >
                ✗ Kunni ekki
              </button>
            </div>
          )}

          {/* Notandinn þarf að svara áður en hann heldur áfram */}
          <button onClick={handleNext} disabled={!isAnswered}>
            {isLast ? "Sjá niðurstöður" : "Næsta spjald"}
          </button>
        </section>
      )}

      {/* Niðurstöðuskjár */}
      {screen === "done" && (
        <Summary
          cards={cards}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}
