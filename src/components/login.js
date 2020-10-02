import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import axios from '../axios'
import { UserContext } from '../UserContext'

const Login = ({setAuth}) => {

	const {setUser} = useContext(UserContext)
	const [data, setData] = useState({email:'',password:''})
	const history = useHistory();
	const location = useLocation();
	const { from } = location.state || { from: { pathname: "/" } };

	const login = () => {
		axios.post('/auth/login',data).then(r=>{
			console.log(r.data)
			setUser(r.data.user)
			localStorage.setItem('access_token', 'Bearer '+r.data.token);
			axios.defaults.headers.common['Authorization'] = 'Bearer '+r.data.token
			setAuth(true)
			history.replace(from)
			console.log('login')
		}).catch(r=>alert(r))
	};

	return (
		<div style={{position:'absolute' ,top:'50%',left:'50%',transform: 'translate(-50%, -50%)'}}>
			<div className="row">
				<div className="card-panel center" style={{backgroundColor: 'rgba(255,255,255,.7)'}}>
					<h3>Login</h3>
					<div className="row">
						<div className="row">
							<div className="input-field col s12">
								<i className="material-icons prefix">account_circle</i>
								<input onChange={(e)=>setData({...data, email: e.target.value})} id="email" type="email" className="validate" />
								<label htmlFor="email">Email</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<i className="material-icons prefix">vpn_key</i>
								<input onChange={(e)=>setData({...data, password: e.target.value})} id="password" type="password" className="validate" />
								<label htmlFor="password">Password</label>
							</div>
						</div>
						<button onClick={login} className="btn waves-effect waves-light" >Entrar<i className="material-icons right">send</i></button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login
