import type { Card } from "../cards";

// Gögn og fall sem Flashcard fær frá App
type FlashcardProps = {
  card: Card;
  flipped: boolean;
  answer: boolean | null;
  onFlip: () => void;
};

export default function Flashcard({
  card,
  flipped,
  answer,
  onFlip,
}: FlashcardProps) {
  // Velja CSS-klasa eftir svari notandans
  let className = "card";
  if (answer === true) className += " known";
  if (answer === false) className += " unknown";

  return (
    <div className={className}>
      {/* Sýna spurninguna eða svarið eftir því hvor hliðin snýr upp */}
      <p className="side">{flipped ? "Svar" : "Spurning"}</p>
      <p className="text">{flipped ? card.back : card.front}</p>

      <button className="flip" onClick={onFlip}>
        {flipped ? "Fela svar" : "Sýna svar"}
      </button>
    </div>
  );
}