import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Logo from '../assets/hashtags.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { BsCardImage } from 'react-icons/bs';

import { doc, setDoc } from 'firebase/firestore';
import { Loader } from '../assets/loader';

export default function Register() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleValidation = (
		password,
		confirmPassword,
		displayName,
		email,
		file
	) => {
		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			setLoading(false);
			return false;
		} else if (displayName === '') {
			toast.error('Username is required');
			setLoading(false);
			return false;
		} else if (password.length < 6) {
			toast.error('Password should be greater than 5 characters');
			setLoading(false);
			return false;
		} else if (email === '') {
			toast.error('Email is required');
			setLoading(false);
			return false;
		} else if (!file) {
			toast.error('Please set profile picture');
			setLoading(false);
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const displayName = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		const confirmPassword = e.target[3].value;
		const file = e.target[4].files[0];

		if (handleValidation(password, confirmPassword, displayName, email, file)) {
			try {
				//Create user
				const res = await createUserWithEmailAndPassword(auth, email, password);

				//Create a unique image name
				const date = new Date().getTime();
				const storageRef = ref(storage, `${displayName + date}`);

				await uploadBytesResumable(storageRef, file).then(() => {
					getDownloadURL(storageRef).then(async (downloadURL) => {
						try {
							//Update profile
							await updateProfile(res.user, {
								displayName,
								photoURL: downloadURL,
							});
							//create user on firestore
							await setDoc(doc(db, 'users', res.user.uid), {
								uid: res.user.uid,
								displayName,
								email,
								photoURL: downloadURL,
							});

							//create empty user chats on firestore
							await setDoc(doc(db, 'userChats', res.user.uid), {});
							toast.success('User Created');
							navigate('/chat');
						} catch (err) {
							toast.error('Check inputs and try again');
							setLoading(false);
						}
					});
				});
			} catch (err) {
				setLoading(false);
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

					<input type="text" placeholder="Name" name="name" />
					<input type="email" placeholder="Email" name="email" />
					<input type="password" placeholder="Password" name="password" />
					<input
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
					/>

					<label htmlFor="file" className="file">
						<BsCardImage className="avatarImage" style={{ color: 'a855f7' }} />
						Add Profile Picture
						<input type="file" id="file" style={{ display: 'none' }} />
					</label>

					{loading ? (
						<div style={{ textAlign: 'center' }}>
							<Loader />
						</div>
					) : (
						<button type="submit">Create User</button>
					)}

					<p>
						Already have an account? <Link to={'/'}>Login</Link>
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
		color: white;
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
			.file {
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				.avatarImage {
					height: 2rem;
					width: 2rem;
					margin-right: 0.5rem;
				}
				&:hover {
					color: lightgray;
				}
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
				width: 15rem;
				font-size: 1rem;
				&:focus {
					border: 1.3px solid #a855f7;
					outline: none;
				}
			}
			.file {
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				color: white;
				.avatarImage {
					height: 2rem;
					width: 2rem;
					margin-right: 0.5rem;
				}
				&:hover {
					color: lightgray;
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
