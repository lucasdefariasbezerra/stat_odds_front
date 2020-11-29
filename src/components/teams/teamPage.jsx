
import React, { Component } from 'react';
import '../../template/style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchList, fetchTeamDetails, executeUpdate, changeLoadingState, changeTriggerState } from './teamAction';
import { changeModalOpenStatus } from '../shared/appStateAction';
import Feed from './feed';
import Paginator from '../shared/paginator';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import * as ActionType from '../shared/type';

class TeamPage extends Component {
    state = {
        currentPageNum: 0
    }

    static propTypes = {
        page: PropTypes.objectOf(PropTypes.any),
        teamDetails: PropTypes.objectOf(PropTypes.any),
        fetchList: PropTypes.func,
        fetchTeamDetails: PropTypes.func,
        executeUpdate: PropTypes.func,
        changeLoadingState: PropTypes.func,
        appState: PropTypes.objectOf(PropTypes.any),
        triggerNotification: PropTypes.bool,
        changeTriggerState: PropTypes.func,
        changeModalOpenStatus: PropTypes.func,
        isOpened: PropTypes.bool
    };

    static defaultProps = {
        page: {},
        teamDetails: {},
        fetchList: () => {},
        fetchTeamDetails: () => {},
        executeUpdate: () => {},
        changeLoadingState: () => {},
        loading: false,
        appState: {},
        triggerNotification: false,
        changeTriggerState: () => {},
        changeModalOpenStatus: () => {},
        isOpened: false
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
        const { fetchList } = this.props;
        this.setState({currentPageNum: (current - 1)});
        fetchList((current - 1), pageSize);
    }

    openNotification = type => {
        const config = {
            message: 'Update Message',
            description: 'Team updated with success',
            duration: 3
        };
        notification[type](config);
    }

    handleModalChange = (opened) => {
        const { changeModalOpenStatus } = this.props;
        changeModalOpenStatus(ActionType.CHANGE_MODAL_STATE, opened);
    };

    handleTeamUpdate = () => {
        const { teamDetails, executeUpdate, changeLoadingState, appState } = this.props;
        const { triggerNotification } = appState;
        executeUpdate(teamDetails);
        changeLoadingState(true);
        if (triggerNotification) {
           this.openNotification('success');
           setTimeout(() => {
            const { changeTriggerState, fetchList, isOpened, changeModalOpenStatus } = this.props;
            const { currentPageNum } = this.state;
            changeModalOpenStatus(ActionType.CHANGE_MODAL_STATE, !isOpened);
            changeTriggerState(false);
            fetchList(currentPageNum, 7);
           }, 2000);
        }
    }

    render() {
        const { page, teamDetails, appState, isOpened } = this.props;
        const { currentPageNum } = this.state;
        const { isLoading } = appState;
        return (
            <div>
                <Feed position="center"
                    content="TEAM"
                    list={page.items}
                    item={teamDetails}
                    onDetailsFetch={this.handleDetailsFetch}
                    executeUpdate={this.handleTeamUpdate}
                    loading={isLoading}
                    onModalChange={this.handleModalChange}
                    opened={isOpened} />
                <Paginator pageNum={currentPageNum}
                           total={page.total}
                           pageEvent={this.hadlePageChange} />
            </div>
        );
    }
}

const mapStateToProps = state => ({ page: state.team.page,
    teamDetails: state.team.teamDetails, appState: state.appState, isOpened: state.team.isOpened });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchList, fetchTeamDetails, executeUpdate, changeLoadingState,
    changeTriggerState, changeModalOpenStatus }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);