import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Input } from './Input';
import { Messages } from './Messages';
import Welcome from './Welcome';

export const Chat = () => {
	const { data } = useContext(ChatContext);

	return (
		<div className="chat">
			{!data.user.displayName ? (
				<Welcome />
			) : (
				<>
					<div className="chatInfo">
						<span>{data.user?.displayName} </span>

						<div className="chatIcons"></div>
					</div>
					<Messages />
					<Input />
				</>
			)}
		</div>
	);
};
