import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';
import styled from 'styled-components';
import { useContext } from 'react';
import { User } from '../utils/User';

export default function Logout() {
	const {
		state: {
			user: { user },
		},
		dispatch,
	} = useContext(User);
	const navigate = useNavigate();

	const handleClick = async () => {
		await dispatch({ type: 'CLEAR_USER' });
		navigate('/login');
	};

	return (
		<Button onClick={handleClick}>
			<BiPowerOff /> Logout
		</Button>
	);
}

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.1rem;
	background-color: #facc15;
	@media screen and (min-width: 0px) and (max-width: 700px) {
		background-color: #eab308;
	}
	border: none;
	cursor: pointer;
	font-size: 1rem;
	svg {
		font-size: 1.3rem;
		color: black;
	}
	&:hover {
		color: #4f46e5;
		svg {
			color: #4f46e5;
		}
	}
`;
