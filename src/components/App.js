import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';

const App = () => (
	<BrowserRouter>
		<Menu />
		<div className="margen">
			<Route exact path="/" component={Usuarios} />
		</div>
	</BrowserRouter>
);

export default App;
