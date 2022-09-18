import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { fetchSeasonDetails } from '../seasons/seasonAction';
import { fetchMatchList, handleMatchSave, changeLoadingState, handleScoreSave } from '../standings/matchAction';
import { changeTriggerState } from '../shared/appStateAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paginator from '../shared/paginator';
import NavBar from '../shared/navbar/navBar';
import Toaster from '../shared/toaster';
import MatchesTable from './matchesTable';
import { LoadingOutlined } from '@ant-design/icons';

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
    state = {
        pageNum: 1,
        pageSize: 10,
        changedMatches: []
    };

    static propTypes = {
       page: PropTypes.objectOf(PropTypes.any),
       match: PropTypes.objectOf(PropTypes.any),
       appState: PropTypes.objectOf(PropTypes.any),
       fetchSeasonDetails: PropTypes.func,
       handleScoreSave: PropTypes.func,
       changeLoadingState: PropTypes.func,
       fetchMatchList: PropTypes.func,
       handleMatchSave: PropTypes.func,
       seasonDetails: PropTypes.objectOf(PropTypes.any)
    };

    static defaultProps = {
        page: {},
        match: {},
        fetchSeasonDetails: () => {},
        handleScoreSave: () => {},
        changeLoadingState: () => {},
        fetchMatchList: () => {},
        handleMatchSave: () => {},
        seasonDetails: {}
    };

    handlePageChange = (pageNum, pageSize) => {
        const { fetchMatchList, match } = this.props;
        const { params } = match;
        this.setState({ pageNum: pageNum, pageSize: pageSize });
        const newPageNum = pageNum == 0 ? pageNum : (pageNum - 1);
        fetchMatchList(newPageNum, pageSize, parseInt(params.seasonId));
    }

    componentDidMount() {
        const { match, fetchSeasonDetails, fetchMatchList } = this.props;
        const { params } = match;
        fetchSeasonDetails(params.seasonId);
        fetchMatchList(0, 10, parseInt(params.seasonId));
    }

    getMappedItems = (items) => {
        const mappedItems = items.map(current => ({
             key: current.id,
             home: current.teamHome,
             score: `${current.scoreHome} vs ${current.scoreAway}`,
             away: current.teamAway,
             round: current.round,
             processed: current.processed,
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
            this.handleChangedMatches(newItem);
            newData.splice(index, 1, { ...item, ...newItem });
            handleMatchSave(page, newData);
        }
    }

    handleChangedMatches = (match) => {
        const { changedMatches } = this.state;
        const found = changedMatches.find(current => current.id === match.id);
        if (found) {
            const changedMatch = {...found, scoreHome: match.scoreHome, scoreAway: match.scoreAway };
            const changedArray = changedMatches.map(currentMatch => currentMatch.id !== changedMatch.id ? currentMatch : changedMatch);
            this.setState({ changedMatches: changedArray });
        } else {
            this.setState({
                changedMatches: [...this.state.changedMatches, match]
            });
        }

    }

    handleMatchesUpdate = () => {
        const { changedMatches } = this.state;
        const { handleScoreSave, changeLoadingState } = this.props;
        changeLoadingState(true);
        handleScoreSave(changedMatches);
        this.setState({
            changedMatches: []
        });
    }

    render() {
        const { seasonDetails, page, appState } = this.props;
        const { isLoading, triggerNotification, toasterInfo } = appState;
        const { pageNum, pageSize } = this.state;
        const { name, seasonDate } = seasonDetails;
        const mappedItems = Object.entries(page).length > 0 ? this.getMappedItems(page.items) : [];
        return (
            <div>
                { triggerNotification && (<Toaster message={toasterInfo.message} type={toasterInfo.type}/>)}
                <NavBar links={links}/>
                <div>
                    <h1 className="standings-text">{`${name} ${seasonDate}`}</h1>
                    <MatchesTable dataTable={mappedItems} onMatchSave={this.onMatchSave}/>
                </div>
                <div className="bottom-position">
                    <Paginator pageNum={pageNum} pageSize={pageSize} total={page.total} pageEvent={this.handlePageChange}/>
                    <button className="save-button" onClick={() => this.handleMatchesUpdate()}>
                        { isLoading && (<LoadingOutlined />)} SAVE MATCHES
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ seasonDetails: state.season.seasonDetails, page: state.match.page, appState: state.appState });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSeasonDetails, fetchMatchList, handleMatchSave, handleScoreSave, changeLoadingState, changeTriggerState }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(StandingsPage);