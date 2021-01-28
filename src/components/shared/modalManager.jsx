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
        isActionEnabled: PropTypes.bool,
        isEditMode: PropTypes.bool,
        onContentDisplay: PropTypes.func,
        onModalAction: PropTypes.func
    };

    static defaultProps = {
        title: "",
        opened: false,
        onModalDisplay: () => {},
        loadState: false,
        isActionEnabled: true,
        onContentDisplay: () => {},
        onModalAction: () => {}
    };


    render() {
        const { title, opened, onModalDisplay, onContentDisplay, isActionEnabled, loadState, onModalAction } = this.props;
        return(
            <Modal title={title}
                visible={opened}
                onCancel={() => onModalDisplay(!opened)}
                onOk={() => onModalDisplay(!opened)}
                footer={[
                <Button key="back" onClick={() => onModalDisplay(!opened)}>Return</Button>,
                <Button key="submit" type="primary" disabled={!isActionEnabled} loading={loadState} onClick={() => onModalAction()}>Submit</Button>]}>
                    {onContentDisplay()}
            </Modal>
        );
    }
}

export default ModalManager;