import React from 'react';
import PropTypes from 'prop-types';

import '../../template/style.css';

const TeamItem = (props) => {
    const { team } = props;
    console.log('team ', team);
    return(
       <li className="list-style">
           <img src="https://http2.mlstatic.com/adesivo-de-parede-decorativo-escudo-de-time-real-madrid-D_NQ_NP_618729-MLB26114571181_102017-F.jpg" />
           <span className="text">{team.name}</span>
       </li>
   );
};

TeamItem.propTypes = {
    team: PropTypes.objectOf(PropTypes.any)
};

TeamItem.defaultProps = {
    team: {}
};

export default TeamItem;