import React from 'react';
import Logo from '../../Logo/Logo';
import './Toolbar.css'
import NavigationItems from '../NavigationItems/NavigationitItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const toolbar = (props) =>(
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleclicked} />
        <div className="LogoToolbar">
             <Logo />
        </div>
        <nav className="DesktopOnly">
           <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
