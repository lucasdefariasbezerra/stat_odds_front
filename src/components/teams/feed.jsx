import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalManager from '../shared/modalManager';
import '../../template/style.css';
import TeamItem from './teamItem';
import TeamForm from './teamForm';
import { Checkbox } from 'antd';
import ViewItem from '../shared/viewItem';

class Feed extends Component {

    static propTypes = {
        position: PropTypes.string,
        content: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.any),
        item: PropTypes.objectOf(PropTypes.any),
        isEditMode: PropTypes.bool,
        onDetailsFetch: PropTypes.func,
        onDetailsRender: PropTypes.func,
        onItemsRender: PropTypes.func,
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
        isEditMode: false,
        onItemsRender: () => {},
        onDetailsRender: () => {},
        onDetailsFetch: () => {},
        executeUpdate: () => {},
        onModalChange: () => {},
        loading: false,
        opened: false
    };

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
        const { position, isEditMode, loading, opened, onItemsRender, onDetailsRender } = this.props;
        return(
            <div>
                <ul className={position}>
                    {onItemsRender()}
                </ul>
                <ModalManager title="Team Details"
                        opened={opened}
                        onModalDisplay={this.handleModalDisplay}
                        loadState={loading}
                        isActionButttonsEnabled={isEditMode}
                        onContentDisplay={onDetailsRender}
                        onModalAction={this.handleUpdate}/>
            </div>
        );
    }
}

export default Feed;