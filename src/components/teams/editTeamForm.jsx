import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSports, handleUpdate } from './teamAction';

const { Option } = Select;

import '../../template/style.css';
const sportMap = {};

class EditTeamForm extends Component {
    state = {
        name: '',
        sport: {}
    };

    static propTypes = {
        team: PropTypes.objectOf(PropTypes.any),
        sports: PropTypes.arrayOf(PropTypes.any),
        loading: PropTypes.bool,
        fetchSports: PropTypes.func,
        handleUpdate: PropTypes.func
    };

    static defaultProps = {
        team: {},
        sports: [],
        fetchSports: () => {}
    };

    onChange = (e) => {
        const { handleUpdate, team } = this.props;
        const { name, value } = e.target;
        handleUpdate(team, name, value);
    }

    handleChange = (value) => {
        const { handleUpdate, team } = this.props;
        const sport = { id: value, name: sportMap[value] };
        handleUpdate(team, 'sport', sport);
    }

    mapSports = (sports) => {
        sports.forEach(sp => {
            sportMap[sp.id] = sp.name;
        });
        return sports.map((currentSport) => (<Option key={currentSport.id} value={currentSport.id}>{currentSport.name}</Option>));
    }

    componentDidMount() {
        this.props;
        const { fetchSports } = this.props;
        fetchSports();
    }

    render() {
        const { name, sport } = this.props.team;
        const { sports } = this.props;
        return(
            <div className='edit-container'>
                <div className='form-item'>
                    <p>team name:</p>
                    <Input size="default" value={name} name="name" onChange={this.onChange} style={{ width: 225 }} />
                </div>
                {sport.name && (
                <div className='form-item'>
                    <p>sport:</p>
                    <Select value={sport.name} onChange={this.handleChange} style={{ width: 225 }}>
                        {this.mapSports(sports)}
                    </Select>
                </div>)}
            </div>
        );
    }
}

const mapStateToProps = state => ({ sports: state.team.sports, loading: state.appState.isLoading });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchSports, handleUpdate }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EditTeamForm);