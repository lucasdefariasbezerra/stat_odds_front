
import React, { Component } from 'react';
import '../../template/style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchList } from './teamAction';
import PropTypes from 'prop-types';

class TeamPage extends Component {

    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.any),
        fetchList: PropTypes.func
    };

    static defaultProps = {
        list: [],
        fetchList: () => {}
    };

    componentDidMount() {
        const { fetchList } = this.props;
        fetchList();
    }

    render() {
        const { list } = this.props;
        console.log('list ', list);
        return (
            <div>Test</div>
        );
    }
}

const mapStateToProps = state => ({ list: state.team.list });

const mapDispatchToProps = dispatch => bindActionCreators({ fetchList }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);