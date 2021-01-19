import React, { Component } from 'react';
import { MenuItems } from './menuItem';
import NavBarButton from './navBarbutton';
import { Link } from 'react-router-dom';
import '../../../template/style.css';

class NavBar extends Component {
    state = {
        clicked: false
    };

    static propTypes = {
    };

    static defaultProps = {
    };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }


    render() {
        const { clicked } = this.state;
        return(
            <nav className="navbar">
                <h1 className="navbar-logo">React <i className="fab fa-react"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                  <i className={clicked ? 'fas fa-times':'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (<li key={index}><Link className={item.cName} to={item.url}>{item.title}</Link></li>);
                    })}
                </ul>
                <NavBarButton>Logout</NavBarButton>
            </nav>
        );
    }
}

export default NavBar;