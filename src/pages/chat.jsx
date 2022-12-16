import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Contacts from '../components/Contacts';
import { allUsersRoute, sockethost } from '../utils/APIRoutes';
import { User } from '../utils/User';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

export default function Chat() {
	const {
		state: {
			user: { user },
		},
	} = useContext(User);
	const socket = useRef();
	const [contacts, setContacts] = useState([]);
	const [currentChat, setCurrentChat] = useState(undefined);
	const navigate = useNavigate();

	const userCheck = async () => {
		if (user && user.isAvatarImageSet) {
			const data = await axios.get(`${allUsersRoute}/${user.id}`);
			setContacts(data.data);
		} else {
			navigate('/setAvatar');
		}
	};

	useEffect(() => {
		if (user) {
			socket.current = io(sockethost); //establishes socket connection
			socket.current.emit('add-user', user.id);
		}
	}, [user]);

	useEffect(() => {
		if (!user.id) {
			navigate('/login');
		} else {
			userCheck();
		}
	}, [user, userCheck]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<>
			<Container>
				<div className="container">
					<Contacts
						contacts={contacts}
						currentUser={user}
						changeChat={handleChatChange}
					/>

					{currentChat === undefined ? (
						<Welcome currentUser={user} />
					) : (
						<ChatContainer
							currentChat={currentChat}
							currentUser={user}
							socket={socket}
						/>
					)}
				</div>
			</Container>
		</>
	);
}

const Container = styled.div`
	@media screen and (min-width: 700px) {
		/* height: 100vh;
	width: 100vw; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
		align-items: center;
		background-color: #171717;
		overflow: auto;
		margin-top: 2rem;
		.container {
			height: 85vh;
			width: 85vw;
			background-color: #00000076;
			display: grid;
			grid-template-columns: 25% 75%;
			@media screen and (min-width: 720px) and (max-width: 1080px) {
				grid-template-columns: 35% 65%;
			}
			@media screen and (min-width: 360px) and (max-width: 480px) {
				grid-template-columns: 25% 75%;
			}
		}
	}

	@media screen and (min-width: 0px) and (max-width: 700px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
		align-items: center;
		background-color: #171717;
		overflow: auto;
		margin-top: 2rem;
		.container {
			height: 87vh;
			width: 95vw;
			background-color: #00000076;
			display: grid;
			grid-template-rows: 15% 85%;
		}
	}
`;
