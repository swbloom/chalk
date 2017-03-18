import { LOG_IN, LOG_OUT } from '../actions/actions';

const initialState = {
	loggedIn: false
}

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case LOG_IN:
			return Object.assign({}, state, {
				loggedIn: true
			});
		case LOG_OUT:
			console.log('log out reducer');
			return Object.assign({}, state, {
				loggedIn: false
			});
		default:
			return state;
	}
}

export default rootReducer;
