type StartScreenProps = {
  total: number;
  onStart: () => void;
};

export default function StartScreen({ total, onStart }: StartScreenProps) {
  return (
    <section className="start">
      <p>Prófaðu þig í hugtökum úr React.</p>
      <p className="muted">{total} spjöld</p>
      <button onClick={onStart}>Byrja</button>
    </section>
  );
}