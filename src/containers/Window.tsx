import Box from "../components/box/Box";
import {useContext, useRef, useState} from "react";
import {WorkSpaceContext} from "./WorkSpace";

const Window = () => {
	const { rootRef } = useContext(WorkSpaceContext);
	const [position, setPosition] = useState<{x : number, y : number}>({x: 0, y: 0});

	return (

		<Box
			position={position}
			updatePosition={ (x, y) => { setPosition({x : x, y : y})}}
			rootRef={rootRef}
		>

		</Box>
	)
}

export default Window;