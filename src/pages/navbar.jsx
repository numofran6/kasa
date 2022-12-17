import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { RiLogoutCircleRLine } from 'react-icons/ri';

export default function Navbar({ currentUser }) {
	return (
		<Container>
			<div>
				<h1 className="brand">Kasa</h1>
			</div>

			{!currentUser ? (
				<div className="actions">
					<Link to={'/login'}>Login</Link>
					<Link to={'/register'}>Register</Link>
				</div>
			) : (
				<div className="menu">
					<div className="logout" onClick={() => signOut(auth)}>
						<RiLogoutCircleRLine style={{ marginRight: '5px' }} />
						<span>Logout</span>
					</div>
				</div>
			)}
		</Container>
	);
}

const Container = styled.div`
	@media screen and (min-width: 700px) {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #facc15;
		padding: 0 2rem;
		.brand {
			text-transform: uppercase;
			font-size: 2rem;
			letter-spacing: 0.8rem;
			font-weight: bolder;
		}
		.actions {
			display: flex;
			gap: 1rem;
		}
		.actions a {
			transition: all 0.3s ease-in-out;
			text-decoration: none;
			font-weight: bold;
			color: white;
			text-transform: uppercase;
			font-size: 0.9rem;
			letter-spacing: 0.5px;
			&:hover {
				color: black;
			}
		}
		.menu {
			.logout {
				display: flex;
				align-items: center;
				cursor: pointer;
				transition: 0.3s ease-in-out;
				&:hover {
					color: brown;
					font-weight: bold;
				}
			}
		}
	}

	@media screen and (min-width: 0px) and (max-width: 700px) {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #eab308;
		padding: 0 1rem;
		position: sticky;
		top: 0px;
		.brand {
			text-transform: uppercase;
			font-size: 2rem;
			letter-spacing: 0.5rem;
			font-weight: normal;
		}
		.actions {
			display: flex;
			gap: 1rem;
		}
		.actions a {
			transition: all 0.3s ease-in-out;
			text-decoration: none;
			font-weight: bold;
			color: white;
			text-transform: uppercase;
			font-size: 0.9rem;
			letter-spacing: 0.5px;
			&:hover {
				color: black;
			}
		}
		.menu {
			.logout {
				display: flex;
				align-items: center;
				cursor: pointer;
				transition: 0.3s ease-in-out;
				&:hover {
					color: brown;
					font-weight: bold;
				}
			}
		}
	}
`;
