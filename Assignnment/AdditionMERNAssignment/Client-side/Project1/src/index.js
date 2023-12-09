import react from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import Products from "./Products";
import './styles.css';
var root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<Products></Products>);