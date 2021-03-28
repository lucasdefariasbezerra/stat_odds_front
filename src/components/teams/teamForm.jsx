import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSports, fetchCountries, handleUpdate } from './teamAction';
import SelectManager from '../shared/selectManager';

import '../../template/style.css';

const listMap = {
    sportMap: {},
    countryMap: {}
};

class TeamForm extends Component {
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

    handleSelectChange = (name, changedObject) => {
        const { handleUpdate, team } = this.props;
        handleUpdate(team, name, changedObject);
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
                    <SelectManager name="sport"
                    value={sport.name || 'soccer'}
                    list={sports}
                    onChange={this.handleSelectChange}/>
                </div>

                <div className='form-item'>
                    <p>country:</p>
                    <SelectManager name="country"
                    value={country.name || 'Argentina'}
                    list={countries}
                    onChange={this.handleSelectChange}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ sports: state.team.sports, countries: state.team.countries, loading: state.appState.isLoading });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchSports, fetchCountries, handleUpdate }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TeamForm);