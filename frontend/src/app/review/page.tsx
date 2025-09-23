import { useState } from "react";
import { api } from "../../services/api";

export default function ReviewPage() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const submitReview = async () => {
    await api.post("/reviews", { comment, rating });
    alert("Avaliação enviada!");
    setComment("");
    setRating(5);
  };

  return (
    <div>
      <h1>Avaliação</h1>
      <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Escreva seu comentário" />
      <input type="number" value={rating} min={1} max={5} onChange={e => setRating(Number(e.target.value))} />
      <button onClick={submitReview}>Enviar</button>
    </div>
  );
}
