import React from 'react';
import PropTypes from 'prop-types';
import '../../../template/style.css';

const NavBarButton = (props) => {
    const { onClick } = props;

    return(
      <div className="operation_menu" onClick={onClick()}>
        <i className="fas fa-bars"></i>
      </div>
      );
};

NavBarButton.propTypes = {
    onClick: PropTypes.func
};

NavBarButton.defaultProps = {
    onClick: () => {}
};

export default NavBarButton;
