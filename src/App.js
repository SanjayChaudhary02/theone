import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayContact from './Components/DisplayContact';
import ContactForm from './Components/ContactForm';
import NoMatch from './Components/NoMatch';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/add" component={ContactForm} />
				<Route path="/edit/:id" component={ContactForm} />
				<Route path="/" exact component={DisplayContact}></Route>
				<Route path="*" component={NoMatch} /> 
			</Switch>
		</Router>      
	);
};

export default App;