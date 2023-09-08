
import React, { Component } from 'react';
import '../../template/style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchList, executeInsertion } from './seasonAction';
import { changeModalOpenStatus, changePageNum, changeLoadingState } from '../shared/appStateAction';
import Feed from '../teams/feed';
import Paginator from '../shared/paginator';
import SeasonItem from './seasonItem';
import SeasonFrom from '../seasons/seasonForm';
import Toaster from '../shared/toaster';
import ModalManager from '../shared/modalManager';
import NavBar from '../shared/navbar/navBar';
import PropTypes from 'prop-types';
import * as ActionType from '../shared/type';
import LoginManagement from '../login/loginManagement';

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

    mapSeasons = () => {
        const { page } = this.props;
        const { items } = page;
        if (items)
            return items.map((item) => (<SeasonItem key={item.id} season={item} />));
    }

    componentDidMount() {
        const { fetchList } = this.props;
        fetchList(0, 5);
    }

    handlePageRendering = (page) => {
        const { status } = page;
        if (status === 200) {
            return this.renderSeasonPageContent();
        } else {
            return (<LoginManagement />);
        }
    }

    renderSeasonPageContent = () => {
        const { page, appState, isNewSeasonOpened } = this.props;
        const { currentPageNum, isLoading } = appState;

        return (
           <div>
                <NavBar links={links}/>
                <Feed position="center"
                    content="SEASON"
                    onItemsRender={this.mapSeasons}
                    />
                <ModalManager title="Create a new Tournment Season"
                    opened={isNewSeasonOpened}
                    onModalDisplay={this.handleNewSeason}
                    loadState={isLoading}
                    isActionButttonsEnabled={true}
                    onContentDisplay={this.handleContentDisplay}
                    onModalAction={this.handleSeasonInsertion}
                />
                <Paginator pageNum={currentPageNum}
                       total={page.total}
                       pageEvent={this.hadlePageChange}
                       pageSize={5} />
                <button className="add-button" onClick={() => this.handleNewSeason(!isNewSeasonOpened)}>+</button>
            </div>);
    }

    render() {
        const { appState, page } = this.props;
        const { triggerNotification, toasterInfo } = appState;
        return (
            <div>
                { triggerNotification && (<Toaster message={toasterInfo.message} type={toasterInfo.type}/>) }
                { Object.keys(page).length > 0 && this.handlePageRendering(page)}
            </div>
        );
    }
}

const mapStateToProps = state => ({ page: state.season.page, appState: state.appState, isNewSeasonOpened: state.season.isNewSeasonOpened,
    seasonDetails: state.season.seasonDetails });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchList, changePageNum,
    changeModalOpenStatus, executeInsertion, changeLoadingState }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SeasonPage);