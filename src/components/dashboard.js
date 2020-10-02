import React, { useEffect, useContext } from 'react'
import M from 'materialize-css'
import { UserContext } from '../UserContext'
import { Route, Link, useHistory } from "react-router-dom";
import axios from '../axios'

const Dashboard = () => {
	const { user } = useContext(UserContext)
	const history = useHistory()

	useEffect(()=>{
		console.log(user)
		M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
		M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {});
	},[user])

	const hola=()=>{
		return (
			<div className="card-panel">
				<h4>Hola {user.name}</h4>
			</div>
		)
	}

	const _logout = () => {
		axios.delete('/auth/logout')
		.then(r=>{
			history.push("/login")
		})
		.catch(r=>alert(r))
	}


	return(
		<div className="row">
			<ul id="dropdown1" className="dropdown-content">
				<li><a href="#!">Mis clientes</a></li>
				<li className="divider"></li>
				<li><a href="#!" onClick={_logout}>Salir</a></li>
			</ul>
			<nav className="nav-extended">
				<div className="nav-wrapper">
					<a href="#!" className="brand-logo">Alpha Logistica</a>
					<a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><a href="#!">hola1</a></li>
						<li><a href="#!">hola2</a></li>
						<li><a href="#!">hola3</a></li>
						<li>
						<a className="dropdown-trigger" href="#!" data-target="dropdown1" style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
							<img style={{width:40, height:40, borderRadius: 40}} src={user.img} alt="yo"/>
							{user.name}<i className="material-icons right">arrow_drop_down</i>
						</a>
						</li>
					</ul>
				</div>
				<ul className="sidenav" id="mobile-demo">
					<li><a href="sass.html">Sass</a></li>
					<li><a href="badges.html">Components</a></li>
					<li><a href="collapsible.html">Javascript</a></li>
					<li><a href="mobile.html">Mobile</a></li>
				</ul>
				<div className="nav-content">
					<ul className="tabs tabs-transparent">
						<li className="tab">
						<Link to="/ruta1" className="waves-effect sidenav-close">Pro</Link>
						</li>
						<li className="tab"><a className="active" href="#test2">hola2</a></li>
						<li className="tab"><a href="#test4">hola3</a></li>
					</ul>
				</div>
			</nav>
			<div className="row">
				<div className="col s12">
					<Route path="/" exact component={hola} />
				</div>
			</div>
		</div>
	)
}

export default Dashboard
