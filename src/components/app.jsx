import React, { Component } from 'react';
import '../template/style.css';
import { Link } from 'react-router-dom';


class App extends Component {
    state = {
        isYellow: true
    }

    render() {
        const { isYellow } = this.state;
        return (
            <div className={isYellow ? 'color' : '' }>
                Boilerplate
                <Link to="/about">About</Link>
                <Link to="/pictures">Pictures</Link>
            </div>
        );
    }
}

export default App;