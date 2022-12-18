import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { IoMdSend } from 'react-icons/io';
import { IoDocumentAttach } from 'react-icons/io5';

export const Input = () => {
	const [text, setText] = useState('');
	const [img, setImg] = useState('');
	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const handleSend = async (e) => {
		e.preventDefault();
		if (img) {
			const storageRef = ref(storage, uuid());

			const uploadTask = uploadBytesResumable(storageRef, img);

			uploadTask.on(
				(error) => {
					//TODO:Handle Error
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateDoc(doc(db, 'chats', data.chatId), {
							messages: arrayUnion({
								id: uuid(),
								text,
								senderId: currentUser.uid,
								date: Timestamp.now(),
								img: downloadURL,
							}),
						});
					});
				}
			);
		}
		if (text) {
			await updateDoc(doc(db, 'chats', data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			});
		}

		await updateDoc(doc(db, 'userChats', currentUser.uid), {
			[data.chatId + '.lastMessage']: {
				text,
			},
			[data.chatId + '.date']: serverTimestamp(),
		});

		await updateDoc(doc(db, 'userChats', data.user.uid), {
			[data.chatId + '.lastMessage']: {
				text,
			},
			[data.chatId + '.date']: serverTimestamp(),
		});

		setText('');
		setImg('');
	};

	return (
		<form className="input">
			<input
				type="text"
				placeholder="Type something..."
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			<div className="send">
				<input
					type="file"
					id="file"
					style={{ display: 'none' }}
					onChange={(e) => setImg(e.target.files[0])}
				/>
				<label htmlFor="file" className="attach">
					<IoDocumentAttach />
				</label>

				<button onClick={handleSend}>
					<IoMdSend />
				</button>
			</div>
		</form>
	);
};
