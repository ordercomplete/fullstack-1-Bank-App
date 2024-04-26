export const SignupConfirmPage = () => {
  return (
    <div>
      <h1>Підтвердження реєстрації</h1>
      <form>
        {/* Код форми для введення коду підтвердження */}
        <input type="text" placeholder="Введіть код підтвердження" />
        <button type="submit">Підтвердити</button>
      </form>
    </div>
  );
};
