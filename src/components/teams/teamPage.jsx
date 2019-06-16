
import React, { Component } from 'react';
import '../../template/style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchList } from './teamAction';
import Feed from './feed';
import PropTypes from 'prop-types';

class TeamPage extends Component {

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
        fetchList(1, 10);
    }

    render() {
        const { page } = this.props;
        console.log('page ', page);
        return (
            <Feed
             position="center"
             content="TEAM"
             list={page.items} />
        );
    }
}

const mapStateToProps = state => ({ page: state.team.page });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchList }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);