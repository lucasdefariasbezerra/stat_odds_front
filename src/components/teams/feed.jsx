
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../template/style.css';

class Feed extends Component {

    static propTypes = {
        position: PropTypes.str
    };

    static defaultProps = {
        position: ""
    };

    render() {
        const { position } = props;

        return(
        <ul className={position}>
            <li>Test</li>
        </ul>
        );
    }
}

export default Feed;