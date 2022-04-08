import { createReducer } from 'typesafe-actions'
import {WindowsAction, WindowsState, WindowState} from "./types";
import {CLOSE_WINDOW, CREATE_WINDOW, FOCUS_WINDOW} from "./actions";

const initialState: WindowsState = [];

const reducer = createReducer<WindowsState, WindowsAction>(initialState, {
	[CREATE_WINDOW] : (state, action) => {
		return [...state, {
			id : action.payload,
			state : WindowState.ACTIVE,

			title : action.meta.title,
			windowStyle : action.meta.windowStyle
		}];
	},
	[CLOSE_WINDOW] : (state, action) => {
		const s = state.map((window)=>{
			if(window.id === action.payload){
				return {
					...window,
					state : WindowState.CLOSE
				};
			}
			return window;
		});

		let find = s.length - 1;
		for( ; find < -1 ; find--){
			if(s[find].state !== WindowState.CLOSE)
				break;
		}

		if( find + 1 < s.length )
			s.splice(find + 1, s.length - find + 1);

		return s;
	},
	[FOCUS_WINDOW] : (state, action) => {
		return state.map((window)=>{
			if(window.id === action.payload){
				return {
					...window,
					windowStyle : {
						...window.windowStyle,
						zIndex : action.meta
					}
				}
			}
			return window;
		});
	}
});

export default reducer;