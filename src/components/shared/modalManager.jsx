import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import '../../template/style.css';

class ModalManager extends Component {
    state = {};

    static propTypes = {
        title: PropTypes.string,
        opened: PropTypes.bool,
        onModalDisplay: PropTypes.func,
        loadState: PropTypes.bool,
        isEditMode: PropTypes.bool,
        onContentDisplay: PropTypes.func,
        onModalAction: PropTypes.func
    };

    static defaultProps = {
        title: "",
        opened: false,
        onModalDisplay: () => {},
        loadState: false,
        isEditMode: false,
        onContentDisplay: () => {},
        onModalAction: () => {}
    };


    render() {
        const { title, opened, onModalDisplay, onContentDisplay, isEditMode, loadState, onModalAction } = this.props;
        console.log('isEditMode', isEditMode);
        return(
            <Modal title={title}
                visible={opened}
                onCancel={() => onModalDisplay(!opened)}
                onOk={() => onModalDisplay(!opened)}
                footer={[
                <Button key="back" onClick={() => onModalDisplay(!opened)}>Return</Button>,
                <Button key="submit" type="primary" disabled={!isEditMode} loading={loadState} onClick={() => onModalAction()}>Submit</Button>]}>
                    {onContentDisplay()}
            </Modal>
        );
    }
}

export default ModalManager;