import React from 'react';
import Logo from '../../Logo/Logo';
import './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationitItems';
import Aux from '../../../hoc/Auxx/Auux';
const sideDrawer = (props) =>{
     let attachedclasses = ["SideDrawer", "Close"];
     if(props.open) {
        attachedclasses=["SideDrawer", "Open"];
     }
     return(
         <Aux>
             <Backdrop show={props.open} clicked={props.closed}/>
        
         <div className={attachedclasses.join(' ')}>
            <div className="LogoSide">
               <Logo /> 
            </div>
            <nav>
                <NavigationItems />
            </nav>
         </div>
         </Aux>
     );
     
};

export default sideDrawer;
