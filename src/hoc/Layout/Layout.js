import React,{ Component } from 'react';

import Aux from '../Auxx/Auux';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    SideDrawerclosedHandler= () => {
       this.setState({showSideDrawer: false})
    }
    
    sideDrawerToggleHandler = () => {
        this.setState((prevState) =>{
            return{showSideDrawer: !prevState.showSideDrawe};
        });
    }

    render(){
       return(
        <Aux>
          <Toolbar drawerToggleclicked={this.sideDrawerToggleHandler} />
          <SideDrawer 
           open={this.state.showSideDrawer}
           closed={this.SideDrawerclosedHandler}/>
          <main className="container">
            {this.props.children}
          </main>
      </Aux>
       );
    }
}
export default Layout;