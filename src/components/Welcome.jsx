import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/hashtags.png';

export default function Welcome() {
	const { currentUser } = useContext(AuthContext);

	return (
		<Container>
			<div className="content">
				<img src={Logo} alt="" />
				<h1>
					Welcome, <span>{currentUser.displayName}!</span>
				</h1>
				<h3>Please select a chat to Start messaging.</h3>

				<div className="help">
					<p style={{ marginTop: '30px' }}>&bull; Create a new account</p>
					<p>&bull; Search for the user, and start messaging</p>
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
			img {
				display: inline-flex;
				width: 80px;
				height: 80px;
			}
		}
	}
	text-align: center;
	span {
		color: #eab308;
	}
	.help {
		font-size: 0.9rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	img {
		display: none;
	}
`;
