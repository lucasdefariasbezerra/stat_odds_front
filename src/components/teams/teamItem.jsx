import React from 'react';
import PropTypes from 'prop-types';
import { SolutionOutlined } from '@ant-design/icons';

import '../../template/style.css';

const TeamItem = (props) => {
    const { team } = props;
    console.log('team ', team);
    return(
       <li className="list-style">
           <img src="https://historias.pontosmultiplus.com.br/wp-content/uploads/2018/06/Long-Beach_Foto_-Jon-Bilous-SHutterstock.jpg" />
           <span className="text">{team.name}</span>
           <SolutionOutlined style={{fontSize: '18px'}}/>
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