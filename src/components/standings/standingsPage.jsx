import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { fetchSeasonDetails } from '../seasons/seasonAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../shared/navbar/navBar';

const links = [
    {
        title: 'file upload',
        url: '/team_upload',
        cName: 'nav-links'
    },
    {
        title: 'seasons',
        url: '/seasons',
        cName: 'nav-links'
    },
    {
        title: 'team management',
        url: '/',
        cName: 'nav-links'
    }
];

class StandingsPage extends Component {

    static propTypes = {
       match: PropTypes.objectOf(PropTypes.any),
       fetchSeasonDetails: PropTypes.func,
       seasonDetails: PropTypes.objectOf(PropTypes.any)
    };

    static defaultProps = {
        match: {},
        fetchSeasonDetails: () => {},
        seasonDetails: {}
    };

    componentDidMount() {
        const { match, fetchSeasonDetails } = this.props;
        const { params } = match;
        console.log('params season ', params.seasonId);
        fetchSeasonDetails(params.seasonId);

    }

    render() {
        const { seasonDetails } = this.props;
        const { name, seasonDate } = seasonDetails;
        return (
            <div>
                <NavBar links={links}/>
                <h1>{`${name} ${seasonDate}`}</h1>
            </div>
        );
    }
}

const mapStateToProps = state => ({ seasonDetails: state.season.seasonDetails });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSeasonDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(StandingsPage);