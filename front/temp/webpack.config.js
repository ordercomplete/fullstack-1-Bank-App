const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Вхідна точка вашого додатку
  output: {
    filename: "bundle.js", // Вихідний файл
    path: path.resolve(__dirname, "dist"), // Шлях до вихідної директорії
    clean: true, // Очищувати вихідну директорію перед новою збіркою
  },
  mode: "development", // Режим збірки
  devtool: "inline-source-map", // Карти джерел для відлагодження
  devServer: {
    static: "./dist", // Коренева директорія серверу
    open: true, // Відкриття сторінки в браузері після запуску сервера
    setupMiddlewares: (middlewares, devServer) => {
      // Ваші налаштування middlewares
      return middlewares;
    },
    suppressWarnings: true, // Приховати застарілі попередження
    // Інші налаштування сервера, якщо потрібно
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Плагін для генерації HTML файлу
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Лоадери для CSS файлів
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Лоадер для обробки файлів JavaScript/JSX з використанням Babel
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
