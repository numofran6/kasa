import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
import { User } from '../utils/User';
import Logo from '../assets/hashtags.png';

export default function Register() {
	const {
		state: {
			user: { user },
		},
		dispatch,
	} = useContext(User);
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	useEffect(() => {
		if (user?.id) {
			toast.info('Account already created');
			navigate('/');
		}
	}, []);

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const handleValidation = () => {
		const { username, email, password, confirmPassword } = values;

		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return false;
		} else if (username.length < 3) {
			toast.error('Username should be greater than 3 characters');
			return false;
		} else if (password.length < 6) {
			toast.error('Password should be greater than 5 characters');
			return false;
		} else if (email === '') {
			toast.error('Email is required');
		}
		return true;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (handleValidation()) {
			const { username, email, password } = values;
			const { data } = await axios.post(registerRoute, {
				username,
				email,
				password,
			});
			if (data.status === false) {
				toast.error(data.msg);
			}
			if (data.status === true) {
				dispatch({ type: 'USER_CREATED', payload: data.userInfo });
				toast.success('User Created');
				navigate('/setAvatar');
			}
		}
	};

	// console.log({ user });

	return (
		<>
			<FormContainer>
				<form onSubmit={(event) => handleSubmit(event)}>
					<div className="brand">
						<img src={Logo} alt="KASA" />
					</div>

					<input
						type="text"
						placeholder="Username"
						name="username"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						onChange={(e) => handleChange(e)}
					/>

					<button type="submit">Create User</button>

					<p>
						Already have an account? <Link to={'/login'}>Login</Link>
					</p>
				</form>
			</FormContainer>
		</>
	);
}

const FormContainer = styled.div`
	@media screen and (min-width: 700px) {
		/* height: 100vh;
		width: 100vw; */
		display: flex;
		flex-direction: column;
		justify-content: left;
		gap: 1rem;
		align-items: center;
		background-color: #171717;
		.brand {
			display: flex;
			align-items: center;
			gap: 1rem;
			justify-content: center;
			img {
				height: 5rem;
			}
			h1 {
				color: #e9d5ff;
				text-transform: uppercase;
				font-size: 3rem;
				letter-spacing: 0.8rem;
			}
		}
		form {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			background-color: #00000076;
			padding: 2rem 6rem;
			margin-top: 1rem;
			input {
				background-color: transparent;
				padding: 1rem 1.5rem;
				border-radius: 0.4rem;
				color: white;
				border: 1px solid #423f45;
				outline: none;
				width: 17rem;
				font-size: 1rem;
				&:focus {
					border: 1.3px solid #a855f7;
					outline: none;
				}
			}
			button {
				background-color: #6b21a8;
				color: white;
				padding: 1rem 2rem;
				border: none;
				font-weight: bold;
				cursor: pointer;
				border-radius: 0.4rem;
				font-size: 1rem;
				text-transform: uppercase;
				transition: 0.3s ease-in-out;
				&:hover {
					background-color: #d8b4fe;
					color: #581c87;
				}
				&:active {
					background-color: #6b21a8;
					color: white;
				}
			}
			p {
				color: white;
				font-size: 0.9rem;
				text-align: center;
				a {
					color: #581c87;
					text-decoration: none;
					font-weight: bold;
					font-size: 1rem;
					text-transform: uppercase;
					&:hover {
						color: #a855f7;
					}
					&:active {
						color: #581c87;
					}
				}
			}
		}
	}

	@media screen and (min-width: 0px) and (max-width: 700px) {
		/* height: 100vh;
		width: 100vw; */
		display: flex;
		flex-direction: column;
		justify-content: left;
		gap: 1rem;
		align-items: center;
		background-color: #171717;
		.brand {
			display: flex;
			align-items: center;
			gap: 1rem;
			justify-content: center;
			img {
				height: 5rem;
			}
			h1 {
				color: #e9d5ff;
				text-transform: uppercase;
				font-size: 3rem;
				letter-spacing: 0.8rem;
			}
		}
		form {
			height: fit-content;
			width: fit-content;
			display: flex;
			flex-direction: column;
			gap: 2rem;
			background-color: #00000076;
			padding: 3rem 3rem 1.5rem 3rem;
			margin-top: 2rem;
			input {
				background-color: transparent;
				padding: 1rem 1.5rem;
				border-radius: 0.4rem;
				color: white;
				border: 1px solid #67646a;
				outline: none;
				width: 18rem;
				font-size: 1rem;
				&:focus {
					border: 1.3px solid #a855f7;
					outline: none;
				}
			}
			button {
				background-color: #6b21a8;
				color: white;
				padding: 1rem 2rem;
				border: none;
				font-weight: bold;
				cursor: pointer;
				border-radius: 0.4rem;
				font-size: 1rem;
				text-transform: uppercase;
				transition: 0.3s ease-in-out;
				&:hover {
					background-color: #d8b4fe;
					color: #581c87;
				}
				&:active {
					background-color: #6b21a8;
					color: white;
				}
			}
			p {
				color: white;
				font-size: 0.9rem;
				text-align: center;
				a {
					color: #a855f7;
					text-decoration: none;
					font-weight: bold;
					font-size: 1rem;
					text-transform: uppercase;
					&:hover {
						color: #581c87;
					}
					&:active {
						color: #a855f7;
					}
				}
			}
		}
	}
`;
