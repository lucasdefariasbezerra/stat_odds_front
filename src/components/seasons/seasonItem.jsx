import React from 'react';
import PropTypes from 'prop-types';
import { TableOutlined } from '@ant-design/icons';

import '../../template/style.css';

const SeasonItem = (props) => {
    const { season, displayItemDetails } = props;
    return(
       <li className="list-style">
           <img src="https://historias.pontosmultiplus.com.br/wp-content/uploads/2018/06/Long-Beach_Foto_-Jon-Bilous-SHutterstock.jpg" />
           <div className="season-text">
               <h1 className="text-header">{season.name}</h1>
               <p>{season.seasonDate}</p>
           </div>
           <TableOutlined style={{fontSize: '20px', cursor: 'pointer'}} onClick={() => {}}/>
       </li>
   );
};

SeasonItem.propTypes = {
    season: PropTypes.objectOf(PropTypes.any),
    displayItemDetails: PropTypes.func
};

SeasonItem.defaultProps = {
    season: {},
    displayItemDetails: () => {}
};

export default SeasonItem;