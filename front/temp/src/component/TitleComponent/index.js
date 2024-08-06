import React from "react";
import NavigationLink from "../NavigationLink";
import "./style.css";
// Replace with actual authentication state треба створити перевірку авторизації для кожної сторінки
const TitleComponent = ({ pageTitle, isAuthenticated }) => {
  return (
    <div className="title-flex-container">
      <div className="title-left-column">
        <NavigationLink />
      </div>

      <div className="title-center-column">
        <h2 className="title-name-page icons">{pageTitle}</h2>
      </div>
      <div className="title-right-column"></div>
    </div>
  );
};

export default TitleComponent;
