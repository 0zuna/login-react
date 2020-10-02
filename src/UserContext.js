import React, { useState, createContext, useEffect } from 'react'

export const UserContext = createContext()
export const UserProvider = props => {
	const [user, setUser] = useState({})

	useEffect(()=>{
		setUser(props.user)
	},[props.user])

	return (
		<UserContext.Provider value={{user,setUser}}>
			{props.children}
		</UserContext.Provider>
	)
}
