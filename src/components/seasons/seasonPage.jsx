
import React, { Component } from 'react';
import '../../template/style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchList, executeInsertion } from './seasonAction';
import { changeModalOpenStatus, changePageNum, changeLoadingState } from '../shared/appStateAction';
import Feed from '../teams/feed';
import Paginator from '../shared/paginator';
import SeasonFrom from '../seasons/seasonForm';
import Toaster from '../shared/toaster';
import ModalManager from '../shared/modalManager';
import NavBar from '../shared/navbar/navBar';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import * as ActionType from '../shared/type';

const links = [
    {
        title: 'file upload',
        url: '/team_upload',
        cName: 'nav-links'
    },
    {
        title: 'team management',
        url: '/',
        cName: 'nav-links'
    }
];

class SeasonPage extends Component {

    static propTypes = {
        page: PropTypes.objectOf(PropTypes.any),
        appState: PropTypes.objectOf(PropTypes.any),
        seasonDetails: PropTypes.objectOf(PropTypes.any),
        fetchList: PropTypes.func,
        changePageNum: PropTypes.func,
        changeLoadingState: PropTypes.func,
        executeInsertion: PropTypes.func,
        changeModalOpenStatus: PropTypes.func,
        isNewSeasonOpened: PropTypes.bool
    };

    static defaultProps = {
        page: {},
        appState: {},
        seasonDetails: {},
        fetchList: () => {},
        changePageNum: () => {},
        changeLoadingState: () => {},
        executeInsertion: () => {},
        changeModalOpenStatus: () => {},
        isNewSeasonOpened: false
    };

    componentDidMount() {
        const { fetchList } = this.props;
        fetchList(0, 5);
    }

    handleDetailsFetch = (id) => {
    }

    hadlePageChange = (current, pageSize) => {
        const { fetchList, changePageNum } = this.props;
        changePageNum(current - 1);
        fetchList((current -1), pageSize);
    }

    handleModalChange = (opened) => {
    };

    handleNewSeason = (opened) => {
        const { changeModalOpenStatus } = this.props;
        changeModalOpenStatus(ActionType.CHANGE_NEW_SEASON_MODAL_STATE, opened);
    };

    handleSeasonInsertion = () => {
        const { seasonDetails, executeInsertion, changeLoadingState, appState } = this.props;
        const { currentPageNum } = appState;
        executeInsertion(seasonDetails, currentPageNum);
        changeLoadingState(true);
    }

    handleContentDisplay = () => {
        const { seasonDetails } = this.props;
        return (<div className='details-text'><SeasonFrom season={seasonDetails}/></div>);
    }

    render() {
        const { page, appState, isNewSeasonOpened } = this.props;
        const { currentPageNum, isLoading, triggerNotification, toasterInfo } = appState;
        return (
            <div>
                { triggerNotification && (<Toaster message={toasterInfo.message} type={toasterInfo.type}/>) }
                <NavBar links={links}/>
                <Feed position="center"
                    content="SEASON"
                    list={page.items} />
                <ModalManager title="Create a new Tournment Season"
                    opened={isNewSeasonOpened}
                    onModalDisplay={this.handleNewSeason}
                    loadState={isLoading}
                    isEditMode={true}
                    onContentDisplay={this.handleContentDisplay}
                    onModalAction={this.handleSeasonInsertion}
                    />
                <Paginator pageNum={currentPageNum}
                           total={page.total}
                           pageEvent={this.hadlePageChange} />
                <button className="add-button" onClick={() => this.handleNewSeason(!isNewSeasonOpened)}>+</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({ page: state.season.page, appState: state.appState, isNewSeasonOpened: state.season.isNewSeasonOpened,
    seasonDetails: state.season.seasonDetails });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchList, changePageNum,
    changeModalOpenStatus, executeInsertion, changeLoadingState }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SeasonPage);