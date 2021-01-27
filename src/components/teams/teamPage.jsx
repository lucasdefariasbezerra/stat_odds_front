
import React, { Component } from 'react';
import '../../template/style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchList, fetchTeamDetails, executeUpdate, executeInsertion, changeLoadingState, openAddTeam } from './teamAction';
import { changeModalOpenStatus, changePageNum, changeTriggerState } from '../shared/appStateAction';
import Feed from './feed';
import Paginator from '../shared/paginator';
import Toaster from '../shared/toaster';
import ModalManager from '../shared/modalManager';
import NavBar from '../shared/navbar/navBar';
import TeamForm from './teamForm';
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
        title: 'seasons',
        url: '/seasons',
        cName: 'nav-links'
    }
];

class TeamPage extends Component {

    static propTypes = {
        page: PropTypes.objectOf(PropTypes.any),
        teamDetails: PropTypes.objectOf(PropTypes.any),
        fetchList: PropTypes.func,
        fetchTeamDetails: PropTypes.func,
        executeUpdate: PropTypes.func,
        executeInsertion: PropTypes.func,
        changeLoadingState: PropTypes.func,
        appState: PropTypes.objectOf(PropTypes.any),
        triggerNotification: PropTypes.bool,
        changeTriggerState: PropTypes.func,
        changeModalOpenStatus: PropTypes.func,
        changePageNum: PropTypes.func,
        openAddTeam: PropTypes.func,
        isOpened: PropTypes.bool,
        isNewTeamOpened: PropTypes.bool
    };

    static defaultProps = {
        page: {},
        teamDetails: {},
        fetchList: () => {},
        fetchTeamDetails: () => {},
        executeUpdate: () => {},
        executeInsertion: () => {},
        changeLoadingState: () => {},
        loading: false,
        appState: {},
        triggerNotification: false,
        changeTriggerState: () => {},
        changeModalOpenStatus: () => {},
        changePageNum: () => {},
        openAddTeam: () => {},
        isOpened: false,
        isNewTeamOpened: false
    };

    componentDidMount() {
        const { fetchList } = this.props;
        fetchList(0, 7);
    }

    handleDetailsFetch = (id) => {
        const { fetchTeamDetails } = this.props;
        fetchTeamDetails(id);
    }

    hadlePageChange = (current, pageSize) => {
        const { fetchList, changePageNum } = this.props;
        changePageNum(current - 1);
        fetchList((current - 1), pageSize);
    }

    openNotification = (type, message, description) => {
        const config = {
            message: message,
            description: description,
            duration: 3
        };
        notification[type](config);
    }

    handleModalChange = (opened) => {
        const { changeModalOpenStatus } = this.props;
        changeModalOpenStatus(ActionType.CHANGE_MODAL_STATE, opened);
    };

    handleNewTeam = (opened) => {
        const { changeModalOpenStatus, openAddTeam } = this.props;
        openAddTeam();
        changeModalOpenStatus(ActionType.CHANGE_NEW_TEAM_MODAL_STATE, opened);
    };

    handleTeamUpdate = () => {
        const { teamDetails, executeUpdate, changeLoadingState, appState } = this.props;
        const { currentPageNum } = appState;
        executeUpdate(teamDetails, currentPageNum);
        changeLoadingState(true);
    }

    handleTeamInsertion = () => {
        const { teamDetails, executeInsertion, changeLoadingState, appState } = this.props;
        const { currentPageNum } = appState;
        executeInsertion(teamDetails, currentPageNum);
        changeLoadingState(true);
    }

    handleContentDisplay = () => {
        const { teamDetails } = this.props;
        return (<div className='details-text'><TeamForm team={teamDetails}/></div>);
    }

    render() {
        const { page, teamDetails, appState, isOpened, isNewTeamOpened } = this.props;
        const { isLoading, toasterInfo, triggerNotification } = appState;
        const { currentPageNum } = appState;
        console.log('links ', links);
        return (
            <div>
                { triggerNotification && (<Toaster message={toasterInfo.message} type={toasterInfo.type}/>)}
                <NavBar links={links}/>
                <Feed position="center"
                    content="TEAM"
                    list={page.items}
                    item={teamDetails}
                    onDetailsFetch={this.handleDetailsFetch}
                    executeUpdate={this.handleTeamUpdate}
                    loading={isLoading}
                    onModalChange={this.handleModalChange}
                    opened={isOpened} />
                <ModalManager title="Create a new Team"
                        opened={isNewTeamOpened}
                        onModalDisplay={this.handleNewTeam}
                        loadState={isLoading}
                        isEditMode={true}
                        onContentDisplay={this.handleContentDisplay}
                        onModalAction={this.handleTeamInsertion}/>
                <Paginator pageNum={currentPageNum}
                           total={page.total}
                           pageEvent={this.hadlePageChange} />
                <button className="add-button" onClick={() => this.handleNewTeam(!isNewTeamOpened)}>+</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({ page: state.team.page,
    teamDetails: state.team.teamDetails, appState: state.appState, isOpened: state.team.isOpened,
    isNewTeamOpened: state.team.isNewTeamOpened });

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchList, fetchTeamDetails, executeUpdate, executeInsertion, changeLoadingState,
    changeTriggerState, changeModalOpenStatus, openAddTeam, changePageNum }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);