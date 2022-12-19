import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

export default function Welcome() {
	const { currentUser } = useContext(AuthContext);

	return (
		<Container>
			<div className="content">
				<h1>
					Welcome, <span>{currentUser.displayName}!</span>
				</h1>
				<h3>Please select a chat to Start messaging.</h3>

				<div style={{ fontSize: '0.9rem' }}>
					<p style={{ marginTop: '50px', fontWeight: 'bolder' }}>Login with </p>

					<p>
						Email:{' '}
						<span>
							<em>francis@kasa.com</em>
						</span>{' '}
						&nbsp; Password:{' '}
						<span>
							<em>{'\\][poiu'}</em>
						</span>
					</p>
					<p>to start realtime chatting. OR create a new account</p>
				</div>
			</div>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #dff7dd;
	flex-direction: column;
	height: 100%;
	background-color: #012d21;
	@media screen and (min-width: 0px) and (max-width: 550px) {
		background-color: #01281e;
		.content {
			padding: 40px 15px;
		}
	}
	text-align: center;
	span {
		color: #eab308;
	}
`;
