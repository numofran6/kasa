import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';
import Logo from '../assets/hashtags.png';

export default function ChatContainer({ currentChat, currentUser, socket }) {
	const [messages, setMessages] = useState([]);
	const scrollRef = useRef();
	const [arrivalMessage, setArrivalMessage] = useState(null);

	const handleSendMsg = async (msg) => {
		await axios.post(sendMessageRoute, {
			from: currentUser.id,
			to: currentChat._id,
			message: msg,
		});

		socket.current.emit('send-msg', {
			to: currentChat._id,
			from: currentUser.id,
			message: msg,
		});

		const msgs = [...messages];
		msgs.push({ fromSelf: true, message: msg });
		setMessages(msgs);
	};

	const getAllMessages = async () => {
		if (currentChat) {
			const response = await axios.post(getAllMessagesRoute, {
				from: currentUser.id,
				to: currentChat._id,
			});
			setMessages(response.data);
		}
	};

	useEffect(() => {
		getAllMessages();
	}, [currentChat]);

	useEffect(() => {
		if (socket.current) {
			socket.current.on('msg-recieve', (msg) => {
				setArrivalMessage({ fromSelf: false, message: msg });
			});
		}
	}, []);

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
	}, [messages]);

	return (
		<Container>
			<div className="chat-header">
				<div className="brand">
					<img src={Logo} alt="" />
				</div>

				<div className="user-details">
					<div className="username">
						<h3>{currentChat.username}</h3>
					</div>
					<div className="avatar">
						<img src={currentChat.avatarImage} alt="" />
					</div>
				</div>
			</div>

			<div className="chat-messages">
				{messages.map((message) => {
					return (
						<div ref={scrollRef} key={uuidv4()}>
							<div
								className={`message ${message.fromSelf ? 'sent' : 'recieved'}`}
							>
								<div className="content ">
									<p>{message.message}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<ChatInput handleSendMsg={handleSendMsg} />
		</Container>
	);
}

const Container = styled.div`
	@media screen and (min-width: 700px) {
		display: grid;
		grid-template-rows: 10% 80% 10%;
		gap: 0.1rem;
		overflow: hidden;
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			grid-template-rows: 15% 70% 15%;
		}
		.chat-header {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 2rem;
			background-color: #1f1f1f;
			.user-details {
				display: flex;
				align-items: center;
				gap: 1rem;
				.avatar {
					img {
						height: 3rem;
					}
				}
				.username {
					h3 {
						color: white;
					}
				}
			}
			.brand {
				display: none;
			}
		}
		.chat-messages {
			padding: 1rem 2rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			overflow: auto;
			&::-webkit-scrollbar {
				width: 0.2rem;
				&-thumb {
					background-color: #ffffff39;
					width: 0.1rem;
					border-radius: 1rem;
				}
			}
			.message {
				display: flex;
				align-items: center;
				.content {
					max-width: 40%;
					overflow-wrap: break-word;
					padding: 1rem;
					font-size: 1.1rem;
					border-radius: 1rem;
					color: #d1d1d1;
					@media screen and (min-width: 720px) and (max-width: 1080px) {
						max-width: 70%;
					}
				}
			}
			.sent {
				justify-content: flex-end;
				.content {
					background-color: #4f04ff21;
				}
			}
			.recieved {
				justify-content: flex-start;
				.content {
					background-color: #9900ff20;
				}
			}
		}
	}

	@media screen and (min-width: 0px) and (max-width: 700px) {
		display: grid;
		grid-template-rows: 12% 78% 10%;
		gap: 0.1rem;
		overflow: hidden;
		.chat-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 2rem;
			background-color: #00000076;
			.user-details {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.5rem;
				.avatar {
					img {
						height: 2.7rem;
					}
				}
				.username {
					h3 {
						color: white;
						text-transform: uppercase;
					}
				}
			}
			.brand {
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					height: 3rem;
				}
			}
		}
		.chat-messages {
			padding: 1rem 2rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			overflow: auto;
			&::-webkit-scrollbar {
				width: 0.2rem;
				&-thumb {
					background-color: #ffffff39;
					width: 0.1rem;
					border-radius: 1rem;
				}
			}
			.message {
				display: flex;
				align-items: center;
				.content {
					max-width: 40%;
					overflow-wrap: break-word;
					padding: 1rem;
					font-size: 1.1rem;
					border-radius: 1rem;
					color: #d1d1d1;
				}
			}
			.sent {
				justify-content: flex-end;
				.content {
					background-color: #4f04ff21;
				}
			}
			.recieved {
				justify-content: flex-start;
				.content {
					background-color: #9900ff20;
				}
			}
		}
	}
`;
