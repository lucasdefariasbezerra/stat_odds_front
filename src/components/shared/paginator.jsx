import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import '../../template/style.css';

const Paginator = (props) => {
    const { pageNum, total, pageEvent } = props;
    return(
        <div className='paginator'>
            <Pagination pageNum={pageNum} pageSize={7} total={total} onChange={pageEvent} />
        </div>
      );
};

Paginator.propTypes = {
    pageNum: PropTypes.number,
    total: PropTypes.number,
    pageEvent: PropTypes.func
};

Paginator.defaultProps = {
    pageNum: 1,
    total: 0,
    pageEvent: () => {}
};

export default Paginator;