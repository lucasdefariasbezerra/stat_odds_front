
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TeamItem from './teamItem';

import '../../template/style.css';

class Feed extends Component {

    static propTypes = {
        position: PropTypes.string,
        content: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.any)
    };

    static defaultProps = {
        position: "",
        content: "",
        list: []
    };

    mapTeams = () => {
        const { list } = this.props;
        return list.map((item) => (<TeamItem key={item.id} team={item} />));
    }

    mapContent = () => {
        const { content } = this.props;
        switch (content) {
            case 'TEAM': {
                return this.mapTeams();
            }
            default: {
                break;
            }
        }
    }

    render() {
        const { position } = this.props;

        return(
        <ul className={position}>
            {this.mapContent()}
        </ul>
        );
    }
}

export default Feed;