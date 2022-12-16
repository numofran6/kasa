import { Route, Routes } from 'react-router-dom';
import Chat from './pages/chat';
import Login from './pages/login';
import Register from './pages/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SetAvatar from './pages/setAvatar';
import Navbar from './pages/navbar';

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Chat />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/setavatar" element={<SetAvatar />} />
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
