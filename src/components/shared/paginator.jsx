import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import '../../template/style.css';

const Paginator = (props) => {
    const { pageNum, total, pageEvent, pageSize } = props;
    return(
        <div className='paginator'>
            <Pagination pageNum={pageNum} pageSize={pageSize} total={total} onChange={pageEvent} />
        </div>
      );
};

Paginator.propTypes = {
    pageNum: PropTypes.number,
    total: PropTypes.number,
    pageEvent: PropTypes.func,
    pageSize: PropTypes.number
};

Paginator.defaultProps = {
    pageNum: 1,
    pageSize: 7,
    total: 0,
    pageEvent: () => {}
};

export default Paginator;