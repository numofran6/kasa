import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Logo from '../assets/hashtags.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Loader } from '../assets/loader';

export default function Login() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleValidation = (email, password) => {
		if (email === '') {
			toast.error('Email is required');
			setLoading(false);
			return false;
		} else if (password === '') {
			toast.error('Password is required');
			setLoading(false);
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;

		if (handleValidation(email, password)) {
			try {
				await signInWithEmailAndPassword(auth, email, password);
				navigate('/');
			} catch (err) {
				setLoading(false);
				toast.error('Invalid email or password');
			}
		}
	};

	return (
		<>
			<FormContainer>
				<form onSubmit={handleSubmit}>
					<div className="brand">
						<img src={Logo} alt="KASA" />
					</div>

					<input type="text" placeholder="Email" name="Email" />
					<input type="password" placeholder="Password" name="password" />

					{loading ? (
						<div style={{ textAlign: 'center' }}>
							<Loader />
						</div>
					) : (
						<button type="submit">Log In</button>
					)}

					<p>
						Don't have an account? <Link to={'/register'}>Register</Link>
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
			padding: 3rem 6rem;
			margin-top: 5rem;
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
			padding: 3rem;
			margin-top: 4rem;
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
