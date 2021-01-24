import React, { Component } from 'react';
import NavBarButton from './navBarbutton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../../template/style.css';

class NavBar extends Component {
    state = {
        clicked: false
    };

    static propTypes = {
        links: PropTypes.arrayOf(PropTypes.any)
    };

    static defaultProps = {
        links: []
    };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }

    render() {
        const { clicked } = this.state;
        const { links } = this.props;
        console.log('test ', clicked);
        return(
            <nav className="navbar">
                <h1 className="navbar-logo">Team Center <i className="fas fa-futbol"></i></h1>
                <div className="menu-icon">
                  <i className={clicked ? 'fas fa-times':'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {links && links.map((item, index) => {
                        return (<li key={index}><Link className={item.cName} to={item.url}>{item.title}</Link></li>);
                    })}
                </ul>
                <NavBarButton onClick={() => this.handleClick}>Logout</NavBarButton>
            </nav>
        );
    }
}

export default NavBar;