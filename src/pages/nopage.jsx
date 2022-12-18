import React from 'react';
import styled from 'styled-components';

export default function Nopage() {
	return <Container>Page Not Found</Container>;
}

const Container = styled.div`
	display: flex;
	height: 80vh;
	flex-direction: column;
	align-items: center;
	color: white;
	justify-content: center;
`;
