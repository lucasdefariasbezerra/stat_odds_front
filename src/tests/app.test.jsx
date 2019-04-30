import React from 'react';
import App from '../components/app';
import { shallow } from 'enzyme';

let wrapper;

describe('</App>', () => {
    beforeEach(() => {
        wrapper = shallow(<App/>);
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should set no color', () => {
        wrapper.setState({isYellow: false});
        expect(wrapper.state('isYellow')).toBeFalsy();
    });
});