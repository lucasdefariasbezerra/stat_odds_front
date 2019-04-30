import React from 'react';
import PropTypes from 'prop-types';

const About = (props) => {
   return(
       <div>This a react 16 boilerplate {props.name}</div>
   );
};

About.propTypes = {
    name: PropTypes.string
};

About.defaultProps = {
    name: 'Testing the proTypes'
};

export default About;