import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { themeMui } from "theme.styles";
import App from "./App";
import { initializeCommon, KeyValStorageProvider } from "./util/init";

const API_URL =
    process.env.NODE_ENV === "development"
        ? `http://${window.location.hostname}:8000/api/`
        : "/api/";

const keyValStorageProvider: KeyValStorageProvider = {
    getItem(key: string): Promise<string | null> {
        return new Promise((resolve) => {
            resolve(window.localStorage.getItem(key) ?? "");
        });
    },
    setItem(key: string, value: string): Promise<void> {
        return new Promise((resolve) => {
            window.localStorage.setItem(key, value);
            resolve();
        });
    },
};

initializeCommon(API_URL, keyValStorageProvider);

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={themeMui}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
