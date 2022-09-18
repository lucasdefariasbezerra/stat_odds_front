import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import '../../template/style.css';

const Paginator = (props) => {
    const { pageNum, total, pageEvent, pageSize } = props;
    const pageSizeOptions = [7, 10, 20, 50, 100];

    return(
        <div className='paginator'>
            <Pagination current={pageNum} pageSize={pageSize} total={total} onChange={pageEvent} pageSizeOptions={pageSizeOptions} />
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