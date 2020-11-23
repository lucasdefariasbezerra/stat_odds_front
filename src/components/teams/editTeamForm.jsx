import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSports } from './teamAction';

const { Option } = Select;

import '../../template/style.css';

class EditTeamForm extends Component {
    state = {
        name: '',
        sport: {}
    };

    static propTypes = {
        team: PropTypes.objectOf(PropTypes.any),
        sports: PropTypes.arrayOf(PropTypes.any),
        fetchSports: PropTypes.func
    };

    static defaultProps = {
        team: {},
        sports: [],
        fetchSports: () => {}
    };

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    mapSports = (sports) => {
        return sports.map((currentSport) => (<Option key={currentSport.id} value={currentSport.id}>{currentSport.name}</Option>));
    }

    componentDidMount() {
        this.props;
        const { fetchSports } = this.props;
        const { name, sport } = this.props.team;
        fetchSports();
        this.setState({ name, sport });
    }

    render() {
        const { name, sport } = this.state;
        const { sports } = this.props;
        return(
            <div className='edit-container'>
                <div className='form-item'>
                    <p>team name:</p>
                    <Input size="default" value={name} name="name" onChange={this.onChange} style={{ width: 225 }} />
                </div>
                {sport.name && (<div className='form-item'>
                    <p>sport:</p>
                    <Select defaultValue={sport.name} style={{ width: 225 }}>
                        {this.mapSports(sports)}
                    </Select>
                </div>)}
            </div>
        );
    }
}

const mapStateToProps = state => ({ sports: state.team.sports });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchSports }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EditTeamForm);