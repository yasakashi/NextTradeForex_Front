
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.css'

ReactDOM.createRoot(
  document.getElementById("root") as unknown as HTMLElement
).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
