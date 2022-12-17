import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className="navbar">
			<span className="logo">Kasa</span>

			<div className="user">
				<img src={currentUser.photoURL} alt="" />
				<span>{currentUser.displayName}</span>
			</div>
		</div>
	);
};
