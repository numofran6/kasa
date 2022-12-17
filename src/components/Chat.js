import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Input } from './Input';
import { Messages } from './Messages';

export const Chat = () => {
	const { data } = useContext(ChatContext);

	return (
		<div className="chat">
			<div className="chatInfo">
				<span>{data.user?.displayName} </span>

				<div className="chatIcons"></div>
			</div>
			<Messages />
			<Input />
		</div>
	);
};
