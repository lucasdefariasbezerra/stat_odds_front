import React from 'react';
import PropTypes from 'prop-types';

import '../../template/style.css';

const component = (fieldList) => {
    return fieldList.map((item) => <p key={item.field}>{`${item.field}: ${item.value}`}</p>);
};

const ViewItem = (props) => {
    const { fieldList } = props;
    return(
       <div>
           {component(fieldList)}
       </div>
   );
};

ViewItem.propTypes = {
    fieldList: PropTypes.arrayOf(PropTypes.any)
};

ViewItem.defaultProps = {
    fieldList: []
};

export default ViewItem;