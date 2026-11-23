import type { Card } from "../cards";

// Gögn og fall sem niðurstöðuskjárinn fær frá App
type SummaryProps = {
  cards: Card[];
  answers: boolean[];
  onRestart: () => void;
};

export default function Summary({ cards, answers, onRestart }: SummaryProps) {
  // Telja spjöldin sem notandinn kunni
  const knownCount = answers.filter((knew) => knew).length;

  // Finna spjöldin sem notandinn þarf að æfa aftur
  const toPractice = cards.filter((_, index) => answers[index] === false);

  return (
    <section className="summary">
      <h2>Þú kunnir {knownCount} af {cards.length}</h2>

      {/* Sýna æfingalistann eða hrós ef öll svör voru rétt */}
      {toPractice.length === 0 ? (
        <p>Fullkomið! 🎉</p>
      ) : (
        <>
          <h3>Spjöld til að æfa betur</h3>
          <ul>
            {toPractice.map((card) => (
              <li key={card.id}>{card.front}</li>
            ))}
          </ul>
        </>
      )}

      <button onClick={onRestart}>Byrja aftur</button>
    </section>
  );
}