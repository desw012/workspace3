import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type WindowsAction = ActionType<typeof actions>;

export const ResizeMode = {
	'MINIMUM' : 'minimum',
	'MAXIMUM' : 'maximum',
	'DOCK' : 'dock',
	'NONE' : 'none'
} as const;
export type ResizeMode = typeof ResizeMode[keyof typeof ResizeMode];

export const WindowState ={
	'ACTIVE' : 'active'
	, 'CLOSE' : 'close'
} as const;
export type WindowState = typeof WindowState[keyof typeof WindowState];

export type Rectangle = {
	x : number,
	y : number,
	w : number,
	h : number
}

export type WindowStyle = {
	zIndex : number
	rect : Rectangle,
	prevRect? : Rectangle,
	resizeMode : ResizeMode
}

export type Window = {
	id : number
	title? : string
	windowStyle : WindowStyle
	state : WindowState
}

export type WindowsState = Window[];