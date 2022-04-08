import { createAction } from 'typesafe-actions';
import {ResizeMode, WindowStyle} from './types';

export const CREATE_WINDOW = 'windows/CREATE_WINDOW';
export const CLOSE_WINDOW = 'windows/CLOSE_WINDOW';
export const FOCUS_WINDOW = 'windows/FOCUS_WINDOW';

let nextId = 1;
let nextZIndex = 0;

const defaultWindowStyle = {
	zIndex : 0,
	rect : {
		x : 0,
		y : 0,
		w : 500,
		h : 500
	},
	prevRect : undefined,
	resizeMode : ResizeMode.NONE
}

export const createWindow = createAction(CREATE_WINDOW
	, ( title? : string, windowStyle? : WindowStyle) => nextId++
	, ( title? : string, windowStyle? : WindowStyle ) => {
		return {
			title : title
			, windowStyle : {
				...defaultWindowStyle,
				...windowStyle,
				zIndex : nextZIndex++
			}
		}
})();

export const removeWindow = createAction(CLOSE_WINDOW)<number>();
export const focusWindow = createAction(FOCUS_WINDOW, (id : number) => id, () => nextZIndex++)();