
import React, { Component } from 'react';
import '../../template/style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchList, fetchTeamDetails, executeUpdate, changeLoadingState } from './teamAction';
import Feed from './feed';
import Paginator from '../shared/paginator';
import PropTypes from 'prop-types';

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
        changeLoadingState: PropTypes.func
    };

    static defaultProps = {
        page: {},
        teamDetails: {},
        fetchList: () => {},
        fetchTeamDetails: () => {},
        executeUpdate: () => {},
        changeLoadingState: () => {}
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
        fetchList((current - 1), pageSize);
    }

    handleTeamUpdate = () => {
        const { teamDetails, executeUpdate, changeLoadingState } = this.props;
        console.log('teamDetails ', teamDetails);
        executeUpdate(teamDetails);
        changeLoadingState(true);
    }

    render() {
        const { page, teamDetails } = this.props;
        const { currentPageNum } = this.state;
        return (
            <div>
                <Feed position="center"
                    content="TEAM"
                    list={page.items}
                    item={teamDetails}
                    onDetailsFetch={this.handleDetailsFetch}
                    executeUpdate={this.handleTeamUpdate} />
                <Paginator pageNum={currentPageNum}
                           total={page.total}
                           pageEvent={this.hadlePageChange} />
            </div>
        );
    }
}

const mapStateToProps = state => ({ page: state.team.page, teamDetails: state.team.teamDetails });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchList, fetchTeamDetails,
                                                            executeUpdate, changeLoadingState }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);