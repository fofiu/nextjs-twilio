import { useReducer, useEffect, createContext } from 'react';

export const ChatContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'setUser':
			let selectedUser = action.payload;

			if (selectedUser === null) {
				console.log('Delete from localstorage');
				localStorage.removeItem('user');
			} else localStorage.setItem('user', JSON.stringify(selectedUser));

			return { ...state, user: selectedUser };

		default:
			throw new Error(`Undefined action type '${action.type}'`);
	}
};

const inBrowser = () => typeof window !== 'undefined';

const initialState = {
	user: inBrowser() ? JSON.parse(localStorage?.getItem('user')) : null
};

// Main component
export const ChatProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<ChatContext.Provider value={[state, dispatch]}>
			{props.children}
		</ChatContext.Provider>
	);
};
