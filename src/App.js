import React, { useState, useEffect } from "react";
import './App.scss';
import 'materialize-css'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './components/login'
import axios from './axios'


const App = () => {
	const [auth, setAuth] = useState(false)
	const [loader, setLoader] = useState(true)

	useEffect(()=>{
		axios.get('/api/user').then(r=>{
			setAuth(true)
			setLoader(false)
		}).catch(r=>setLoader(false))
		console.log(auth)

	},[auth])

	if(loader) return (
		<div className="progress">
			<div className="indeterminate"></div>
		</div>
	)

	return (
		<Router>
			<div>
				<Switch>
					<Route path="/login"><Login setAuth={setAuth}/></Route>
					<Route path="/" render={({ location }) => auth ? <h3>privado</h3> : ( <Redirect to={{ pathname: "/login", state: { from: location } }} />)} />
				</Switch>
			</div>
		</Router>
	);

}

export default App
