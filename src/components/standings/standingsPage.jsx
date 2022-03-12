import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { fetchSeasonDetails } from '../seasons/seasonAction';
import { fetchMatchList, handleMatchSave } from '../standings/matchAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../shared/navbar/navBar';
import MatchesTable from './matchesTable';

const links = [
    {
        title: 'file upload',
        url: '/file_upload/match',
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
       page: PropTypes.objectOf(PropTypes.any),
       match: PropTypes.objectOf(PropTypes.any),
       fetchSeasonDetails: PropTypes.func,
       fetchMatchList: PropTypes.func,
       handleMatchSave: PropTypes.func,
       seasonDetails: PropTypes.objectOf(PropTypes.any)
    };

    static defaultProps = {
        page: {},
        match: {},
        fetchSeasonDetails: () => {},
        fetchMatchList: () => {},
        handleMatchSave: () => {},
        seasonDetails: {}
    };

    componentDidMount() {
        const { match, fetchSeasonDetails, fetchMatchList } = this.props;
        const { params } = match;
        fetchSeasonDetails(params.seasonId);
        fetchMatchList(0, 10);
    }

    getMappedItems = (items) => {
        const mappedItems = items.map(current => ({
             key: current.id,
             home: current.teamHome,
             score: `${current.scoreHome} vs ${current.scoreAway}`,
             away: current.teamAway,
             round: current.round,
             date: current.date}));
        return mappedItems;
    }

    onMatchSave = (row, key) => {
        const { page } = this.props;
        const newData = [...page.items];
        const index = newData.findIndex((item) => item.id === key);
        const { handleMatchSave } = this.props;
        if (index > -1) {
            const item = newData[index];
            const scores = row.score.split('vs');
            const newItem = {...item, scoreHome: parseInt(scores[0].trim()), scoreAway: parseInt(scores[1].trim()) };
            newData.splice(index, 1, { ...item, ...newItem });
            handleMatchSave(page, newData);
        }
    }

    render() {
        const { seasonDetails, page } = this.props;
        const { name, seasonDate } = seasonDetails;
        const mappedItems = Object.entries(page).length > 0 ? this.getMappedItems(page.items) : [];
        return (
            <div>
                <NavBar links={links}/>
                <div>
                    <h1 className="standings-text">{`${name} ${seasonDate}`}</h1>
                    <MatchesTable dataTable={mappedItems} onMatchSave={this.onMatchSave}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ seasonDetails: state.season.seasonDetails, page: state.match.page });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSeasonDetails, fetchMatchList, handleMatchSave }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(StandingsPage);