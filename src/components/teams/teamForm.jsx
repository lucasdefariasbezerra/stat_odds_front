import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSports, fetchCountries, handleUpdate } from './teamAction';

const { Option } = Select;

import '../../template/style.css';
const listMap = {
    sportMap: {},
    countryMap: {}
};

class EditTeamForm extends Component {
    state = {
        name: '',
        sport: {}
    };

    static propTypes = {
        team: PropTypes.objectOf(PropTypes.any),
        sports: PropTypes.arrayOf(PropTypes.any),
        countries: PropTypes.arrayOf(PropTypes.any),
        loading: PropTypes.bool,
        fetchSports: PropTypes.func,
        fetchCountries: PropTypes.func,
        handleUpdate: PropTypes.func
    };

    static defaultProps = {
        team: {},
        fetchSports: () => {},
        fetchCountries: () => {},
        handleUpdate: () => {}
    };

    onChange = (e) => {
        const { handleUpdate, team } = this.props;
        const { name, value } = e.target;
        handleUpdate(team, name, value);
    }

    handleSportChange = (key) => {
        const { handleUpdate, team } = this.props;
        const sport = { id: key, name: listMap['sportMap'][key] };
        handleUpdate(team, 'sport', sport);
    }

    handleCountryChange = (key) => {
        const { handleUpdate, team } = this.props;
        const country = { id: key, name: listMap['countryMap'][key] };
        handleUpdate(team, 'country', country);
    }

    mapList = (mapNode, list) => {
        list.forEach(item => {
            listMap[mapNode][item.id] = item.name;
        });
        return list.map((item) => (<Option key={item.id} value={item.id}>{item.name}</Option>));
    }

    componentDidMount() {
        const { fetchSports, fetchCountries } = this.props;
        fetchSports();
        fetchCountries();
    }

    render() {
        const name = this.props.team.name || '';
        const sport = this.props.team.sport || {};
        const country = this.props.team.country || {};
        const { sports, countries } = this.props;
        return(
            <div className='edit-container'>
                <div className='form-item'>
                    <p>team name:</p>
                    <Input size="default" value={name} name="name" onChange={this.onChange} style={{ width: 225 }} />
                </div>
                <div className='form-item'>
                    <p>sport:</p>
                    <Select name="sportMap" value={sport.name || 'soccer'} onChange={this.handleSportChange} style={{ width: 225 }}>
                        {this.mapList('sportMap', sports)}
                    </Select>
                </div>
                <div className='form-item'>
                    <p>sport:</p>
                    <Select value={country.name || 'Argentina'} onChange={this.handleCountryChange} style={{ width: 225 }}>
                        {this.mapList('countryMap', countries)}
                    </Select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ sports: state.team.sports, countries: state.team.countries, loading: state.appState.isLoading });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchSports, fetchCountries, handleUpdate }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EditTeamForm);