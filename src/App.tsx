import React from 'react';
import logo from './logo.svg';
import './App.css';
import WorkSpace from "./containers/WorkSpace";
import DockBar from "./containers/DockBar";

function App() {
	return (
		<>
			<WorkSpace/>
			<DockBar/>
		</>
	);
}

export default App;
