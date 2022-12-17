import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './pages/navbar';
import './style.scss';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
	const { currentUser } = useContext(AuthContext);

	const ProtectedRoute = ({ children }) => {
		if (!currentUser) {
			return <Navigate to="/login" />;
		}

		return children;
	};

	return (
		<div>
			<Navbar currentUser={currentUser} />
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>

			<ToastContainer
				limit={5}
				position={'bottom-left'}
				autoClose={5000}
				draggable={true}
				pauseOnFocusLoss={false}
			/>
		</div>
	);
}

export default App;
