import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import { Buffer } from 'buffer';

const initialState = {
	user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : { user: '' },
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'USER_CREATED': {
			Cookies.set(
				'user',
				JSON.stringify({
					...state,
					user: {
						...action.payload,
					},
				})
			);
			return {
				...state,
				user: { user: { ...action.payload } },
			};
		}
		case 'CLEAR_USER': {
			Cookies.remove('user');
			return { ...state, user: { user: {} } };
		}
		default: {
			return state;
		}
	}
};

export const User = createContext();

export default function UserProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<User.Provider value={{ state, dispatch }}>{children}</User.Provider>
		</>
	);
}
