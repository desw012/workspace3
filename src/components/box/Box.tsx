import Draggable, {DraggableBounds, DraggableData, DraggableEvent, DraggableEventHandler} from "react-draggable"
import React, {useRef, useState} from "react";
import {ResizableBox} from "react-resizable";

import './Box.css';

export type BoxProps = {
	children? : React.ReactNode,
	position : { x: number, y: number }
	updatePosition : ( x: number, y: number ) => void

	rootRef? : React.RefObject<HTMLElement>

	onDrag? : DraggableEventHandler
	onStart? : DraggableEventHandler
	onStop? : DraggableEventHandler

}

const Box = (props : BoxProps) => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const [bounds, setBounds] = useState<DraggableBounds | string | false>(false );
	const [marginLeft, setMarginLeft] = useState<number>(0);

	const _onDrag = (e: DraggableEvent, data : DraggableData) => {
		if(e.target && (e.target as HTMLElement).classList.contains('react-resizable-handle')){
			let resizeClassName = '';
			(e.target as HTMLElement).classList.forEach((className)=> {
				if (className.startsWith('react-resizable-handle-')) {
					resizeClassName = className;
				}
			});

			const h = nodeRef.current?.clientHeight || 0;
			const w = nodeRef.current?.clientWidth || 0;

			let bounds : DraggableBounds = {
				left : undefined,
				right : undefined,
				top : undefined,
				bottom : undefined
			}

			switch (resizeClassName){
				case 'react-resizable-handle-n':
					bounds.top = 0;
					bounds.left = data.lastX;
					bounds.right = data.lastX;
					bounds.bottom = data.lastY + h;
					break
				case 'react-resizable-handle-w':
					bounds.top = data.lastY;
					bounds.left = 0;
					bounds.right = data.lastX+w;
					bounds.bottom = data.lastY;
					break;
				case 'react-resizable-handle-e':
				case 'react-resizable-handle-s':
				case 'react-resizable-handle-se':
					return false;
				case 'react-resizable-handle-nw':
					bounds.top = 0;
					bounds.left = 0;
					bounds.right = data.lastX + w;
					bounds.bottom = data.lastY + h;
					break;
				case 'react-resizable-handle-ne':
					bounds.top = 0;
					bounds.left = data.lastX;
					bounds.right = data.lastX;
					bounds.bottom = data.lastY + h;
					break;
				case 'react-resizable-handle-sw':
					bounds.top = data.lastY;
					bounds.left = 0;
					bounds.right = data.lastX + w;
					bounds.bottom = data.lastY;
					break;
			}

			//setBounds(bounds);
		} else {
			if(props.rootRef?.current){
				const h = nodeRef.current?.clientHeight || 0;
				const w = nodeRef.current?.clientWidth || 0;

				const clientRect = props.rootRef.current.getBoundingClientRect()
				let bounds = {
					left : 0,
					right : clientRect.width - w,
					top : 0,
					bottom : clientRect.height - h
				}
				setBounds(bounds);
			}
		}
		props.onDrag && props.onDrag(e, data);
	}

	const _onStart = (e: DraggableEvent, data : DraggableData) => {
		props.onStart && props.onStart(e, data);

	}

	const _onStop = (e: DraggableEvent, data : DraggableData) => {
		props.updatePosition(data.x, data.y)
		setBounds(false);

		props.onStop && props.onStop(e, data);
	}

	const a = props.rootRef?.current;
	return (
		<Draggable
			nodeRef={nodeRef}
			onDrag={ _onDrag }
			onStart={ _onStart }
			onStop={ _onStop }
			bounds={ bounds }
			position={ props.position }
			offsetParent={ props.rootRef?.current ? props.rootRef?.current : undefined }
		>
			<div ref={nodeRef} style={{ zIndex : 0, marginLeft: `${marginLeft}px` }}>
				<ResizableBox
					width={ 500 }
					height={ 500 }
					resizeHandles={ ['s' , 'w' , 'e' , 'n' , 'sw' , 'nw' , 'se' , 'ne'] }
					onResizeStart={ (e, data) => { } }
					onResizeStop={ (e, data) => { } }
				>
					{props.children}
				</ResizableBox>
			</div>
		</Draggable>
	)
}
export default Box;