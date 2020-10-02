import React, { useState, useEffect } from "react";
import './App.scss';
import 'materialize-css'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './components/login'
import axios from './axios'
import { UserProvider } from './UserContext'
import Dashboard from './components/dashboard'


const App = () => {
	const [auth, setAuth] = useState(false)
	const [loader, setLoader] = useState(true)
	const [user, setUser] = useState({})

	useEffect(()=>{
		axios.get('/api/user').then(r=>{
			setAuth(true)
			setLoader(false)
			setUser(r.data.user)
		}).catch(r=>setLoader(false))

	},[])

	if(loader) return (
		<div className="progress">
			<div className="indeterminate"></div>
		</div>
	)

	return (
		<Router>
			<UserProvider user={user}>
				<Switch>
					<Route path="/login"><Login setAuth={setAuth}/></Route>
					<Route path="/" render={({ location }) => auth ? <Dashboard /> : ( <Redirect to={{ pathname: "/login", state: { from: location } }} />)} />
				</Switch>
			</UserProvider>
		</Router>
	);

}

export default App
