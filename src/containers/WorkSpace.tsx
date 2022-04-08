import { useSelector } from "react-redux";
import {RootState} from "../modules";
import Window from "./Window";
import React, {createContext, useContext, useRef} from "react";


export const WorkSpaceContext = React.createContext<{
	rootRef? : React.RefObject<HTMLElement>
}>({});

const WorkSpace = function(){
	const windows = useSelector( ( state : RootState ) => ( state.windows ));
	const rootRef = useRef<HTMLDivElement>(null);

	return (
		<WorkSpaceContext.Provider value={{
			rootRef : rootRef
		}}>
			<div ref={ rootRef } style={{width:'50vw', height:'100vh', marginLeft:'200px'}}>
				{ windows.map(()=>
					<>
						<Window></Window>
						<div style={{height: "10px", width: "10px"}}></div>
					</>

				)}
			</div>
		</WorkSpaceContext.Provider>
	)
}

export default  WorkSpace