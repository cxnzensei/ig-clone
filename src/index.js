import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, FieldValue } from "./lib/firebase";
import { RecoilRoot } from "recoil";

ReactDOM.render(
	<FirebaseContext.Provider value={{ firebase, FieldValue }}>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</FirebaseContext.Provider>,
	document.getElementById("root")
);
