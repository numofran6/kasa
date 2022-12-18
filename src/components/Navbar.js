import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/hashtags.png';

export const Navbar = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className="navbar">
			<span className="logo">
				<img src={Logo} alt="" />
			</span>

			<div className="user">
				<span>{currentUser.displayName}</span>
				<img src={currentUser.photoURL} alt="" />
			</div>
		</div>
	);
};
