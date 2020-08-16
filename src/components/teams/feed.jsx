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
        list: PropTypes.arrayOf(PropTypes.any),
        item: PropTypes.objectOf(PropTypes.any),
        onDetailsFetch: PropTypes.func
    };

    static defaultProps = {
        position: "",
        content: "",
        list: [],
        item: {},
        onDetailsFetch: () => {}
    };

    displayItemDetails = (id) => {
        const { onDetailsFetch } = this.props;
        const { visible } = this.state;
        this.handleModalDisplay(!visible);
        onDetailsFetch(id);
    }

    handleModalDisplay = (visible) => {
        this.setState({ visible });
    }

    mapTeams = () => {
        const { list } = this.props;
        return list.map((item) => (<TeamItem key={item.id} team={item} displayItemDetails={this.displayItemDetails} />));
    }

    renderTeamDetails = () => {
      const { item } = this.props;
      return item.sport && (
         <div className='details-text'>
            <p>{`Team Name: ${item.name}`}</p>
            <p>{`Sport: ${item.sport.name}`}</p>
        </div>
      );
    }

    mapContent = (content) => {
        const entities = {
            TEAM: {
                list: () => this.mapTeams(),
                detail: () => this.renderTeamDetails()
            }
        };
        return entities[content];
    }

    render() {
        const { position, content } = this.props;
        const { visible } = this.state;
        return(
            <div>
                <ul className={position}>
                    {this.mapContent(content).list()}
                    <Modal title="Details"
                      visible={visible}
                      onCancel={() => this.handleModalDisplay(!visible)}
                      onOk={() => this.handleModalDisplay(!visible)}>
                          {this.mapContent(content).detail()}
                      </Modal>
                </ul>
            </div>
        );
    }
}

export default Feed;