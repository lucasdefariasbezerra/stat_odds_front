import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalManager from '../shared/modalManager';
import '../../template/style.css';

class Feed extends Component {

    static propTypes = {
        position: PropTypes.string,
        content: PropTypes.string,
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