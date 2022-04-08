import {useDispatch, useSelector} from "react-redux";
import {createWindow} from "../modules/windows";

const DockBar = function(){
	const dispatch = useDispatch();
	return (
		<div style={{position : 'absolute', top:0}}>
			<span onClick={() => dispatch(createWindow('asd'))}>asd</span>
		</div>
	)
}

export default DockBar;