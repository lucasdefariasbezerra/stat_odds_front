
import React, { Component } from 'react';
import '../../template/style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchList } from './teamAction';
import Feed from './feed';
import Paginator from '../shared/paginator';
import PropTypes from 'prop-types';

class TeamPage extends Component {

    state = {
        currentPageNum: 0
    }

    static propTypes = {
        page: PropTypes.objectOf(PropTypes.any),
        fetchList: PropTypes.func
    };

    static defaultProps = {
        page: {},
        fetchList: () => {}
    };

    componentDidMount() {
        const { fetchList } = this.props;
        fetchList(0, 7);
    }

    hadlePageChange = (current, pageSize) => {
        const { fetchList } = this.props;
        fetchList((current - 1), pageSize);
    }

    render() {
        const { page } = this.props;
        const { currentPageNum } = this.state;
        return (
            <div>
                <Feed position="center"
                    content="TEAM"
                    list={page.items} />
                <Paginator pageNum={currentPageNum}
                           total={page.total}
                           pageEvent={this.hadlePageChange} />
            </div>
        );
    }
}

const mapStateToProps = state => ({ page: state.team.page });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchList }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);