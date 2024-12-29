import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer/>
      </BrowserRouter>
    </Provider>
);