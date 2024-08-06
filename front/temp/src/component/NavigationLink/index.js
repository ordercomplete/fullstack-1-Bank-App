// import { useNavigate, Link } from "react-router-dom";

// export const NavigationLink = ({ isAuthenticated }) => {
//   const getDestination = (isAuthenticated) => {
//     return isAuthenticated ? "/balance" : "/";
//   };

//   const destination = getDestination(isAuthenticated);
//   const linkText = isAuthenticated;

//   const renderLink = (to, icon) => {
//     return (
//       <Link to={to}>
//         <span>{icon}</span>
//       </Link>
//     );
//   };

//   return renderLink(destination, linkText);
// };

// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export const NavigationLink = ({ isAuthenticated }) => {
//   const navigate = useNavigate();
//   const [hasHistory, setHasHistory] = useState(false);

//   useEffect(() => {
//     // Check if there is previous history
//     setHasHistory(window.history.length > 1);
//   }, []);

//   const getDestination = (isAuthenticated) => {
//     return isAuthenticated ? "/balance" : "/";
//   };

//   const destination = getDestination(isAuthenticated);

//   return (
//     <div>
//       {hasHistory ? (
//         <button onClick={() => navigate(-1)}>
//           <img src="/svg/arrow-back-outline-3.svg" alt="Back" />
//         </button>
//       ) : (
//         <Link to={destination}>
//           <img src="/svg/arrow-back-outline-3.svg" alt="Back" />
//         </Link>
//       )}
//     </div>
//   );
// };

// export default NavigationLink;

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const NavigationLink = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    // Check if there is previous history
    setHasHistory(window.history.length > 2); // Навігація не спрацьовує, якщо нема історії в браузері
  }, []);

  const getDestination = (isAuthenticated) => {
    return isAuthenticated ? "/balance" : "/";
  };

  const destination = getDestination(isAuthenticated);

  const handleNavigateBack = () => {
    if (hasHistory) {
      navigate(-1);
    } else {
      navigate(destination); // If no history, navigate to destination
    }
  };

  return (
    <button onClick={handleNavigateBack} className="nav_back-button">
      <img src="/svg/arrow-back-outline-3.svg" alt="Back" />
    </button>
  );
};

export default NavigationLink;
