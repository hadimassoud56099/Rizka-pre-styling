import React from 'react'
import ToolBar from '../ToolBar/ToolBar';
import SideDrawer from '../SideDrawer/SideDrawer';
import '../ToolBar/ToolBar.css'
import {Link} from'react-router-dom';
const Navigate = (props) => {
    let action_btn;
    let toolBar;
    let sideDrawer;
    const handleSignOut=()=>{
        console.log("logged out")
        props.setUser({
            userData:undefined,
            userToken:undefined,
            
        })
        localStorage.setItem("jwt-token","")
    }
    if(props.User.userData){action_btn=<Link to="/"><button className="styled_button" onClick={handleSignOut}>Sign Out</button></Link>}
    else{action_btn=<Link to="/SignIn/:token"><button className="styled_button">Sign In</button></Link>}
    if(props.show===true){
        sideDrawer=<SideDrawer show={props.show}  onClick={props.onClick} User={props.User} setUser={props.setUser}  greet={props.greet}/>
        // toolBar=null;
    }
    else{
        toolBar=<ToolBar 
         drawerClickHandler={props.drawerClickHandler}
          User={props.User} setUser={props.setUser}
         action_btn={action_btn} 
         greet={props.greet}
       />
         sideDrawer=null;
    }
    return (
        <div>
             {toolBar}
             {sideDrawer}
        </div>
    )
}
export default Navigate
