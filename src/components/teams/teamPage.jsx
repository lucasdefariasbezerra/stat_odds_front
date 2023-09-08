
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
import TeamItem from './teamItem';
import ViewItem from '../shared/viewItem';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import * as ActionType from '../shared/type';
import LoginManagement from '../login/loginManagement';

const links = [
    {
        title: 'file upload',
        url: '/file_upload/team',
        cName: 'nav-links'
    },
    {
        title: 'seasons',
        url: '/seasons',
        cName: 'nav-links'
    }
];

class TeamPage extends Component {
    state = {
        isEditMode: false,
        pageNum: 1,
        pageSize: 7
    };

    static propTypes = {
        page: PropTypes.objectOf(PropTypes.any),
        history: PropTypes.objectOf(PropTypes.any),
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
        history: {},
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

    handleDetailsFetch = (id) => {
        const { fetchTeamDetails } = this.props;
        fetchTeamDetails(id);
    }

    handlePageChange = (pageNum, pageSize) => {
        const { fetchList } = this.props;
        this.setState({ pageNum: pageNum, pageSize: pageSize });
        const newPageNum = pageNum == 0 ? pageNum : (pageNum - 1);
        fetchList((newPageNum), pageSize);
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

    displayItemDetails = (id) => {
        const { isOpened } = this.props;
        this.handleModalChange(!isOpened);
        this.handleDetailsFetch(id);
    }

    mapTeams = () => {
        const { page } = this.props;
        const { items } = page;
        if (items)
            return items.map((item) => (<TeamItem key={item.id} team={item} displayItemDetails={this.displayItemDetails} />));
    }

    onChange = (e) => {
        const { checked } = e.target;
        this.setState({ isEditMode: checked });
    }

    renderTeamDetails = () => {
        const { teamDetails } = this.props;
        const { isEditMode } = this.state;
        const fieldList = [
            {
                field: 'Team Name',
                value: teamDetails.name
            },
            {
              field: 'Sport',
              value: teamDetails.sport && teamDetails.sport.name
            },
            {
                field: 'Country',
                value: teamDetails.country && `${teamDetails.country.name} - ${teamDetails.country.threeLetterCode}`
            }
        ];
        return teamDetails.sport && (
           <div className='details-text'>
              { isEditMode ? (<TeamForm team={teamDetails}/>) : (<ViewItem fieldList={fieldList}/>) }
              <Checkbox onChange={this.onChange}>edit</Checkbox>
          </div>
        );
    }

    componentDidMount() {
        const { fetchList } = this.props;
        fetchList(0, 7);
    }

    manageRelogin() {
        const { page, fetchList } = this.props;
        const { status } = page;
        const token = localStorage.getItem('odds-user-info');

        if (token && status === 401) {
            fetchList(0, 7);
        }
    }

    handlePageRendering = (page) => {
        const { status } = page;
        this.manageRelogin();
        if (status === 200) {
            return this.renderTeamPageContent();
        } else {
            return (<LoginManagement />);
        }
    }

    renderTeamPageContent = () => {
        const { page, teamDetails, appState, isOpened, isNewTeamOpened } = this.props;
        const { isLoading } = appState;
        const { isEditMode, pageNum, pageSize } = this.state;

        return (<div>
            <NavBar links={links} />
                <Feed position="center"
                    content="TEAM"
                    list={page.items}
                    item={teamDetails}
                    isEditMode={isEditMode}
                    onDetailsFetch={this.handleDetailsFetch}
                    onItemsRender={this.mapTeams}
                    executeUpdate={this.handleTeamUpdate}
                    loading={isLoading}
                    onDetailsRender={this.renderTeamDetails}
                    onModalChange={this.handleModalChange}
                    opened={isOpened} />

                <ModalManager title="Create a new Team"
                        opened={isNewTeamOpened}
                        onModalDisplay={this.handleNewTeam}
                        loadState={isLoading}
                        isActionButttonsEnabled={true}
                        onContentDisplay={this.handleContentDisplay}
                        onModalAction={this.handleTeamInsertion}/>
                <Paginator pageNum={pageNum}
                           pageSize={pageSize}
                           total={page.total}
                           pageEvent={this.handlePageChange} />
                <button className="add-button" onClick={() => this.handleNewTeam(!isNewTeamOpened)}>+</button>
        </div>);
    }

    render() {
        const { page, appState } = this.props;
        const { toasterInfo, triggerNotification } = appState;
        return (
            <div>
                { triggerNotification && (<Toaster message={toasterInfo.message} type={toasterInfo.type}/>)}
                { Object.keys(page).length > 0 && this.handlePageRendering(page)}
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