import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import App from "./components/App";
import reducers from "./reducers";
import "./index.css";
import Login from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import thunk from "redux-thunk";

ReactDOM.render(<App />, document.querySelector("#root"));
