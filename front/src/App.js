// На цей момент є проблема зберігання користувачів, треба знати та виправити проблему.
// Також з'явилося багато помилок після останньої твоєї модернізації. Знайди неузгодження

// Наступна рекомендація від чату GPT, але вона суперечлива, тому що у завданні у нас стоїть мета
// підтвердити акаунт що може зробити користувач, який вже увійшов в акаунт:
// "Переконайтеся, що PrivateRoute використовується тільки для захищених ресурсів,
// куди доступ мають тільки підтверджені користувачі.
// Ця логіка не повинна застосовуватися до самої сторінки signup-confirm,
// оскільки це може призвести до постійного циклу перенаправлення,
// якщо сторінка signup-confirm також захищена через PrivateRoute."

// Створи файли AuthRoute, AuthContext, SignupPage, SignupConfirmPage, BalancePage враховуючи умови, вказані в коментарях файлу App.js для створення процесів на цих сторінках.
// import { ErrorBoundary } from "./component/ErrorBoundary";
// Якщо узагальнити завдання:
// 1. Потрібно, щоб після введення логіна та пароля на сторінці реєстрації SignupPage
// (у разі, якщо такого користувача ще не було створено раніше, якщо він існує треба сповістити про наявність такого користувача) створювався код перевірки,
// який з'являвся у вікні alert, після чого відбувався перехід на сторінку SignupConfirmPage,
// де буде потрібно ввести цей код і після успішного введення та натискання кнопки "продовжити"
// відбувався перехід на сторінку BalancePage path="/balance"
// 2. const authContextData = {}; -  Визначте відповідну структуру або надайте відповідні дані. Де повинна бути ця змінна, в якому файлі?

//Файл App.js
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { SigninPage } from "./container/SigninPage";
import { SignupPage } from "./container/SignupPage";
import { AuthProvider } from "./AuthContext";
import { SignupConfirmPage } from "./container/SignupConfirmPage";
import { RecoveryConfirmPage } from "./container/RecoveryConfirmPage";
import { RecoveryPage } from "./container/RecoveryPage";
import { DeleteAccountPage } from "./container/DeleteAccountPage";
import { UsersPage } from "./container/UsersPage";
// import { AuthContext } from "./AuthContext";

import AuthRoute from "./AuthRoute";
import WellcomePage from "./container/WellcomePage";
import SendPage from "./container/SendPage";
import TransactionPage from "./container/TransactionPage";
import BalancePage from "./container/BalancePage";
import NotificationsPage from "./container/NotificationsPage";
import SettingsPage from "./container/SettingsPage";
import ReceivePage from "./container/ReceivePage";

import Error from "./container/ErrorPage";

function App() {
  // const authContextData = {}; // Визначити відповідну структуру або надайти відповідні дані

  return (
    <AuthProvider>
      {/* AuthContext.Provider value={authContextData} Створюємо контекст, в якому будемо тримати дані аутентифікації
      В контексті буде знаходитись: створений state через useReducer, 
      який буде знаходитись властивість token та об'єкт user dispatch функція, 
      яка буде мати наступні типи дій: увійти в акаунт, вийти з акаунту */}
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                {/* AuthRoute це компонент, який перевіряє, чи є в контексті аутентифікації токен, 
                якщо так, то переводить на сторінку /balance */}
                <WellcomePage />
                {/* <WellcomePage /> На цій сторінці ми створюємо верстку та розміщуємо дві кнопки-посилання 
                на сторінку /signup та сторінку /signin */}
              </AuthRoute>
            }
          />

          {/* <Route path="/balance" element={<BalancePage />} />
          <Route path="/settings" element={<SettingsPage />} /> */}
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
                {/* <SignupPage /> На цій сторінці створюємо форму, яка відправляє запит на реєстрацію користувача 
                та переводить на сторінку /signup-comfirm.
                Після реєстрації потрібно зберегти дані аутентифікації в контекст */}
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute allowUnconfirmed={true}>
                {/* На сторінці /signup-confirm використовуємо PrivateRoute, адже підтвердити акаунт може користувач, який вже увійшов в акаунт 
                Після підтвердження акаунту потрібно оновити дані аутентифікації в контексті */}
                {<SignupConfirmPage />}
                {/* <SignupConfirmPage /> На цій сторінці вводимо код підтвердження реєстрації акаунта та після успішного запиту переводимо на сторінку /balance 
                Перевіряємо в контексті аутентифікації чи user.confirm. Якщо так, то переводимо на сторінку /balance */}
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
                {/* Вхід в акаунт. Зберігаємо дані аутентифікації в контекст. 
                Якщо user.confirm є false, то перенаправляємо на /signup-confirm */}
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
                {/* <RecoveryPage /> Сторінка відновлення акаунту. 
                Після вводу пошти, створюється код з підтвердженням відновлення акаунту, 
                переводимо на сторінку /recovery-confirm */}
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
                {/* <RecoveryConfirmPage /> Сторінка підтвердження відновлення та оновлення пароля.  Після відправки форми потрібно перевести на сторінку /balance */}
              </AuthRoute>
            }
          />
          <Route
            path="/delete-account"
            element={
              <AuthRoute>
                <DeleteAccountPage />
              </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute>
                {/* <PrivateRoute> Приватний роут, який перевіряє наявність токена в контексті аутентифікації. 
                Будь-який запит, який відправляється в сторінках під приватним роутом 
                повинні передавати токен (будь-яким варіантом) на сервер для перевірки токена 
                та отримання інформації що за користувач відправляє дані та передати конкретно його дані */}
                <BalancePage />
                {/* <BalancePage /> Сторінка балансу */}
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
                {/* <NotificationsPage /> Сторінка списку нотифікацій, який створюються при діях:
                Вхід в акаунт
                Відновлення акаунту
                Зміна пароля
                Зміна пошти
                Поповнення
                Переказ */}
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
                {/* <SettingsPage /> Сторінка налаштувань, на якій можна:
                Змінити пароль
                Змінити пошту
                Вийти з акаунту
                Кожна дія повинна в кінці оновлювати контекст аутентифікації */}
              </PrivateRoute>
            }
          />
          <Route
            path="/receive"
            element={
              <PrivateRoute>
                <ReceivePage />
                {/* <ReceivePage /> Сторінка поповнення балансу. 
                Користувач вводить суму, натискає на платіжний метод і відправляється запит. 
                Після чого створюється нова транзакція та нова нотифікація */}
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
                {/* <SendPage /> Користувач вводить пошту та суму. 
                Після чого у користувача, який відправив суму, 
                створюється транзакція на списання грошей на нотифікацію, а у користувача, який отримав гроші, 
                створюється транзакція на отримання грошей та нотифікацію */}
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction/:transactionId"
            element={
              <PrivateRoute>
                <TransactionPage />
                {/* <TransactionPage /> Сторінка з детальною інформацією про конкретну транзакцію. 
                В сторінці є trainsactionId, який вказує на ідентифікатор транзакції, 
                який використовується для отримання та виводи інформації про конкретну транзакцію. 
                Перехід на цю сторінку здійснюється через натискання на карточку транзакції на сторінці /balance */}
              </PrivateRoute>
            }
          />
          <Route
            path="/users" // Новостворений маршрут для сторінки користувачів
            element={
              <PrivateRoute>
                <UsersPage />
              </PrivateRoute>
            }
          />
          <Route path="*" Component={Error} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
