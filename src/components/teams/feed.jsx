import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TeamItem from './teamItem';
import ViewItem from '../shared/viewItem';
import EditTeamForm from './editTeamForm';
import { Modal, Checkbox, Button } from 'antd';
import '../../template/style.css';

class Feed extends Component {
    state = {
    visible: false,
    isEditMode: false
    };

    static propTypes = {
        position: PropTypes.string,
        content: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.any),
        item: PropTypes.objectOf(PropTypes.any),
        onDetailsFetch: PropTypes.func,
        executeUpdate: PropTypes.func,
        onModalChange: PropTypes.func,
        loading: PropTypes.bool,
        opened: PropTypes.bool
    };

    static defaultProps = {
        position: "",
        content: "",
        list: [],
        item: {},
        onDetailsFetch: () => {},
        executeUpdate: () => {},
        onModalChange: () => {},
        loading: false,
        opened: false
    };

    displayItemDetails = (id) => {
        const { onDetailsFetch, onModalChange, opened } = this.props;
        onModalChange(!opened);
        onDetailsFetch(id);
    }

    handleModalDisplay = (visible) => {
        const { onModalChange } = this.props;
        onModalChange(visible);
        this.setState({ visible });
    }

    handleUpdate = () => {
        const { executeUpdate } = this.props;
        executeUpdate();
    }

    mapTeams = () => {
        const { list } = this.props;
        return list.map((item) => (<TeamItem key={item.id} team={item} displayItemDetails={this.displayItemDetails} />));
    }

    onChange = (e) => {
        const { checked } = e.target;
        this.setState({ isEditMode: checked });
    }

    renderTeamDetails = () => {
      const { item } = this.props;
      const { isEditMode } = this.state;
      const fieldList = [
          {
              field: 'Team Name',
              value: item.name
          },
          {
            field: 'Sport',
            value: item.sport && item.sport.name
          }
      ];
      return item.sport && (
         <div className='details-text'>
            { isEditMode ? (<EditTeamForm team={item}/>) : (<ViewItem fieldList={fieldList}/>) }
            <Checkbox onChange={this.onChange}>edit</Checkbox>
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
        const { position, content, loading, opened } = this.props;
        const { isEditMode } = this.state;
        return(
            <div>
                <ul className={position}>
                    {this.mapContent(content).list()}
                    <Modal title="Details"
                      visible={opened}
                      onCancel={() => this.handleModalDisplay(!opened)}
                      onOk={() => this.handleModalDisplay(!opened)}
                      footer={[
                        <Button key="back" onClick={() => this.handleModalDisplay(!opened)}>
                          Return
                        </Button>,
                        <Button key="submit" type="primary" disabled={!isEditMode} loading={loading}
                                onClick={this.handleUpdate}>
                          Submit
                        </Button>
                      ]}>
                          {this.mapContent(content).detail()}
                      </Modal>
                </ul>
            </div>
        );
    }
}

export default Feed;