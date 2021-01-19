import React from 'react';
import PropTypes from 'prop-types';
import '../../../template/style.css';

const STYLES = [
    'btn--primary',
    'btn--outline'
];

const SIZES = [
 'btn--medium',
 'btn--large'
];

const NavBarButton = (props) => {
    const { buttonStyle, buttonSize, children, onClick, type } = props;
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle: STYLES[0];
    const checkButtonSizes = STYLES.includes(buttonSize) ? buttonStyle: SIZES[0];

    return(
      <button className={`btn ${checkButtonStyle} ${checkButtonSizes}`} onClick={onClick} type={type}>
        {children}
      </button>
      );
};

NavBarButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
    buttonStyle: PropTypes.string,
    buttonSize: PropTypes.string
};

NavBarButton.defaultProps = {
    children: undefined,
    type: '',
    onClick: '',
    buttonStyle: '',
    buttonSize: ''
};

export default NavBarButton;
