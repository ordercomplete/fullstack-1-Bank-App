import { useNavigate } from "react-router-dom";

export const RecoveryPage = () => {
  const navigate = useNavigate();

  const handleRecovery = (event) => {
    event.preventDefault();
    // Відправлення даних для відновлення
    navigate("/recovery-confirm");
  };

  return (
    <form onSubmit={handleRecovery}>
      <h1>Відновлення акаунту</h1>
      <input type="email" placeholder="Введіть ваш email" required />
      <button type="submit">Відновити</button>
    </form>
  );
};
