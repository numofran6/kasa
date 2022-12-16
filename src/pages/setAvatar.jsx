import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import { User } from '../utils/User';
import Loader from '../utils/Loader';

export default function SetAvatar() {
	const {
		state: {
			user: { user },
		},
		dispatch,
	} = useContext(User);
	const [avatars, setAvatars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);
	const navigate = useNavigate();

	const setProfilePicture = async () => {
		if (selectedAvatar === undefined) {
			toast.error('Please select an avatar');
		} else {
			const { data } = await axios.post(`${setAvatarRoute}/${user.id}`, {
				image: avatars[selectedAvatar],
			});

			if (data.isSet) {
				user.isAvatarImageSet = true;
				user.avatarImage = data.image;
				await dispatch({ type: 'USER_CREATED', payload: user });
				navigate('/');
			}
		}
	};

	const fetchAvatars = async () => {
		const data = [];
		for (let i = 0; i < 4; i++) {
			const image = `https://avatars.dicebear.com/api/personas/${Math.round(
				Math.random() * 1000
			)}.svg?background=%23f9fafb&radius=50`;

			if (image) {
				data.push(image);
			}
		}
		setAvatars(data);
		setIsLoading(false);
	};

	useEffect(() => {
		if (!user?.id) {
			toast.error('Please create an account first');
			navigate('/register');
		}
		if (user.isAvatarImageSet) {
			toast.info('Avatar is already set');
			navigate('/');
		}
		fetchAvatars();
	}, []);

	// console.log({ user });

	return (
		<>
			{isLoading ? (
				<div style={{ maxInlineSize: '100%' }}>
					<Loader />
				</div>
			) : (
				<Main>
					<Container>
						<div className="titleContainer">
							<h1>Choose an Avatar</h1>
						</div>

						<div className="avatars">
							{avatars.map((avatar, i) => (
								<div
									key={i}
									className={`avatar ${selectedAvatar === i ? 'selected' : ''}`}
								>
									<img
										src={avatar}
										alt="avatar"
										onClick={() => setSelectedAvatar(i)}
									/>
								</div>
							))}
						</div>

						<div className="buttons">
							<button className="submit-btn" onClick={setProfilePicture}>
								Set as Avatar
							</button>

							<button className="submit-btn2" onClick={setProfilePicture}>
								FINISH
							</button>
						</div>
					</Container>
				</Main>
			)}
		</>
	);
}

const Container = styled.div`
	@media screen and (min-width: 700px) {
		height: fit-content;
		width: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: right;
		align-items: center;
		gap: 3rem;
		align-items: center;
		background-color: #00000076;
		padding: 3rem;
		.loader {
			max-inline-size: 100%;
		}
		.titleContainer {
			h1 {
				color: white;
			}
		}
		.avatars {
			display: flex;
			gap: 2rem;
			.avatar {
				border: 0.5rem solid transparent;
				border-radius: 4rem;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: 0.3s ease-in-out;
				cursor: pointer;
				img {
					height: 6rem;
				}
			}
			.selected {
				border: 0.5rem solid #6b21a8;
			}
		}
		.buttons {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			.submit-btn {
				background-color: #6b21a8;
				color: white;
				padding: 1rem;
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
			.submit-btn2 {
				background-color: #16a34a;
				color: white;
				padding: 1rem;
				border: none;
				font-weight: bold;
				cursor: pointer;
				border-radius: 0.4rem;
				font-size: 1rem;
				text-transform: uppercase;
				transition: 0.3s ease-in-out;
				&:hover {
					background-color: #4ade80;
					color: black;
				}
				&:active {
					background-color: #16a34a;
					color: white;
				}
			}
		}
	}

	@media screen and (min-width: 0px) and (max-width: 700px) {
		height: fit-content;
		width: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: right;
		align-items: center;
		gap: 3rem;
		align-items: center;
		background-color: #00000076;
		padding: 3rem;
		.loader {
			max-inline-size: 100%;
		}
		.titleContainer {
			h1 {
				color: white;
			}
		}
		.avatars {
			display: grid;
			gap: 1rem;
			grid-template-columns: 50% 50%;
			.avatar {
				border: 0.5rem solid transparent;
				border-radius: 4rem;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: 0.3s ease-in-out;
				cursor: pointer;
				img {
					height: 6rem;
				}
			}
			.selected {
				border: 0.5rem solid #6b21a8;
			}
		}
		.buttons {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			.submit-btn {
				background-color: #6b21a8;
				color: white;
				padding: 1rem;
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
			.submit-btn2 {
				background-color: #16a34a;
				color: white;
				padding: 1rem;
				border: none;
				font-weight: bold;
				cursor: pointer;
				border-radius: 0.4rem;
				font-size: 1rem;
				text-transform: uppercase;
				transition: 0.3s ease-in-out;
				&:hover {
					background-color: #4ade80;
					color: black;
				}
				&:active {
					background-color: #16a34a;
					color: white;
				}
			}
		}
	}
`;

const Main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5rem;

	@media screen and (min-width: 0px) and (max-width: 700px) {
		margin-top: 2rem;
	}
`;
