import React, { useState } from 'react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';

export default function ChatInput({ handleSendMsg }) {
	const [msg, setMsg] = useState('');
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const handleEmojiPickerhideShow = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	const handleEmojiClick = (emojiData, event) => {
		let message = msg;
		message += emojiData.emoji;
		setMsg(message);
	};

	const sendChat = (event) => {
		event.preventDefault();
		if (msg.length > 0) {
			handleSendMsg(msg);
			setShowEmojiPicker(false);
			setMsg('');
		}
	};

	return (
		<Container>
			<div className="button-container">
				<div className="emoji">
					<BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
					{showEmojiPicker && (
						<EmojiPicker
							height={350}
							width={300}
							onEmojiClick={handleEmojiClick}
						/>
					)}
				</div>
			</div>

			<form
				className="input-container"
				onClick={() => setShowEmojiPicker(false)}
				onSubmit={(e) => sendChat(e)}
			>
				<input
					type="text"
					placeholder="type your message here"
					onChange={(e) => setMsg(e.target.value)}
					value={msg}
				/>
				<button type="submit">
					<IoMdSend />
				</button>
			</form>
		</Container>
	);
}

const Container = styled.div`
	@media screen and (min-width: 700px) {
		display: grid;
		align-items: center;
		grid-template-columns: 5% 95%;
		background-color: #080420;
		padding: 0 2rem;
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			padding: 0 1rem;
			gap: 1rem;
		}
		.button-container {
			display: flex;
			align-items: center;
			color: white;
			gap: 1rem;
			.emoji {
				position: relative;
				svg {
					font-size: 1.5rem;
					color: #ffff00c8;
					cursor: pointer;
				}
				.EmojiPickerReact {
					position: absolute;
					top: -370px;
					background-color: #080420;
					border-color: #180f4e;
					.epr-body::-webkit-scrollbar {
						background-color: #080420;
						width: 5px;
						&-thumb {
							background-color: #9a86f3;
						}
					}
					.emoji-categories {
						button {
							filter: contrast(0);
						}
					}
					.epr-search {
						background-color: transparent;
						border-color: #9a86f3;
					}
					.epr-emoji-category-label {
						background-color: #d2cbf8;
					}
				}
			}
		}
		.input-container {
			width: 100%;
			border-radius: 2rem;
			display: flex;
			align-items: center;
			gap: 2rem;
			background-color: #ffffff34;
			input {
				width: 90%;
				height: 60%;
				background-color: transparent;
				color: white;
				border: none;
				padding-left: 1rem;
				font-size: 1.2rem;
				&::selection {
					background-color: #9a86f3;
				}
				&:focus {
					outline: none;
				}
			}
			button {
				padding: 0.3rem 2rem;
				border-radius: 2rem;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #7e22ce;
				border: none;
				transition: 0.2s ease-in-out;
				cursor: pointer;
				&:hover {
					background-color: #9a86f3;
				}
				&:active {
					background-color: #7e22ce;
				}
				@media screen and (min-width: 720px) and (max-width: 1080px) {
					padding: 0.3rem 1rem;
					svg {
						font-size: 1rem;
					}
				}
				svg {
					font-size: 2rem;
					color: white;
				}
			}
		}
	}

	@media screen and (min-width: 0px) and (max-width: 700px) {
		display: grid;
		align-items: center;
		grid-template-columns: 5% 95%;
		background-color: #080420;
		padding: 0 2rem;
		gap: 1rem;
		.button-container {
			display: flex;
			align-items: center;
			color: white;
			gap: 1rem;
			.emoji {
				position: relative;
				svg {
					font-size: 1.5rem;
					color: #ffff00c8;
					cursor: pointer;
				}
				.EmojiPickerReact {
					position: absolute;
					top: -370px;
					background-color: #080420;
					border-color: #180f4e;
					.epr-body::-webkit-scrollbar {
						background-color: #080420;
						width: 5px;
						&-thumb {
							background-color: #9a86f3;
						}
					}
					.emoji-categories {
						button {
							filter: contrast(0);
						}
					}
					.epr-search {
						background-color: transparent;
						border-color: #9a86f3;
					}
					.epr-emoji-category-label {
						background-color: #d2cbf8;
					}
				}
			}
		}
		.input-container {
			width: 100%;
			border-radius: 2rem;
			display: flex;
			align-items: center;
			gap: 2rem;
			background-color: #ffffff34;
			input {
				width: 90%;
				height: 60%;
				background-color: transparent;
				color: white;
				border: none;
				padding-left: 1rem;
				font-size: 1.2rem;
				&::selection {
					background-color: #9a86f3;
				}
				&:focus {
					outline: none;
				}
			}
			button {
				padding: 0.3rem 2rem;
				border-radius: 2rem;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #7e22ce;
				border: none;
				transition: 0.2s ease-in-out;
				cursor: pointer;
				&:hover {
					background-color: #9a86f3;
				}
				&:active {
					background-color: #7e22ce;
				}
				@media screen and (min-width: 720px) and (max-width: 1080px) {
					padding: 0.3rem 1rem;
					svg {
						font-size: 1rem;
					}
				}
				svg {
					font-size: 2rem;
					color: white;
				}
			}
		}
	}
`;
