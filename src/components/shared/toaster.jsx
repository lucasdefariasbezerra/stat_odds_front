import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';


import '../../template/style.css';

const toasterIconRenderer = {
    success: (<CheckCircleTwoTone style={{ fontSize: '30px' }} twoToneColor='#52c41a'/>),
    error: (<CloseCircleTwoTone style={{ fontSize: '30px' }} twoToneColor='#ff3333'/>)
};

const Toaster = (props) => {
    const { message, type } = props;
    return(
        <div className={type}>
            {toasterIconRenderer[type]}
            <span className="toaster-text">{message}</span>
        </div>
      );
};

Toaster.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string
};

Toaster.defaultProps = {
    type: '',
    message: ''
};

export default Toaster;