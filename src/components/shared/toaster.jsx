import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircleTwoTone } from '@ant-design/icons';


import '../../template/style.css';

const Toaster = (props) => {
    const { message, type } = props;
    return(
        <div className="custom-toaster">
            <CheckCircleTwoTone style={{ fontSize: '30px' }} twoToneColor='#52c41a'/>
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