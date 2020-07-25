
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TeamItem from './teamItem';
import { Modal } from 'antd';

import '../../template/style.css';

class Feed extends Component {
    state = { visible: false };

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

    displayItemDetails = (id, entity) => {
        console.log('item id: ', id, ' entity: ', entity);
        this.setState({ visible: true });
    }

    mapTeams = () => {
        const { list } = this.props;
        return list.map((item) => (<TeamItem key={item.id} team={item} displayItemDetails={this.displayItemDetails} />));
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
        const { visible } = this.state;
        return(
        <div>
            <ul className={position}>
                {this.mapContent()}
                <Modal title="test modal"
                       visible={visible}>
                </Modal>
            </ul>
        </div>
        );
    }
}

export default Feed;