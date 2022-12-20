import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Nopage() {
	return (
		<Container>
			<h3>404 | This page could not be found</h3>
			<Link to={'/chat'} style={{ fontSize: '1.5rem' }}>
				Continue Chatting
			</Link>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	height: 80vh;
	flex-direction: column;
	align-items: center;
	color: white;
	justify-content: center;
	text-align: center;
	gap: 2rem;
`;
