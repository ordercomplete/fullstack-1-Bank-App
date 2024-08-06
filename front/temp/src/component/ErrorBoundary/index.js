// import React from "react";

// export class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Оновлення стану щоб наступна перересовування показала запасний UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // Можна записати помилку в журнал віддаленого серверу
//     console.error("ErrorBoundary caught an error", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // Можна рендерити будь-який резервний UI
//       return <h1>Something went wrong.</h1>;
//     }

//     return this.props.children;
//   }
// }
