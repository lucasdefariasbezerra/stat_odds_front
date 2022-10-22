import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TeamItem from './teamItem';
import ViewItem from '../shared/viewItem';
import ModalManager from '../shared/modalManager';
import TeamForm from './teamForm';
import { Checkbox } from 'antd';
import '../../template/style.css';

class Feed extends Component {
    state = {
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
      if (Object.keys(item).length === 0) return (<div></div>);

      const fieldList = [
          {
              field: 'Team Name',
              value: item.name
          },
          {
            field: 'Sport',
            value: item.sport && item.sport.name
          },
          {
              field: 'Country',
              value: item.country && `${item.country.name} - ${item.country.threeLetterCode}`
          }
      ];
      return item.sport && (
         <div className='details-text'>
            { isEditMode ? (<TeamForm team={item}/>) : (<ViewItem fieldList={fieldList}/>) }
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
                </ul>
                <ModalManager title="Team Details"
                        opened={opened}
                        onModalDisplay={this.handleModalDisplay}
                        loadState={loading}
                        isEditMode={isEditMode}
                        onContentDisplay={this.mapContent(content).detail}
                        onModalAction={this.handleUpdate}/>
            </div>
        );
    }
}

export default Feed;