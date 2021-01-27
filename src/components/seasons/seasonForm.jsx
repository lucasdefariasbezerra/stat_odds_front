import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, DatePicker } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { handleUpdate, fetchTournments } from './seasonAction';
import moment from 'moment';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const listMap = {
    tournmentMap: {}
};

class SeasonForm extends Component {

    static propTypes = {
        season: PropTypes.objectOf(PropTypes.any),
        tournments: PropTypes.arrayOf(PropTypes.any),
        handleUpdate: PropTypes.func,
        fetchTournments: PropTypes.func
    };

    static defaultProps = {
        season: {},
        tournments: [],
        handleUpdate: () => {},
        fetchTournments: () => {}
    };

    onChange = (e) => {
        const { handleUpdate, season } = this.props;
        const { name, value } = e.target;
        handleUpdate(season, name, value);
    }

    changeSeasonStart = (date) => {
        const { handleUpdate, season } = this.props;
        handleUpdate(season, 'seasonStart', date.toDate().getTime());
    }

    changeSeasonEnd = (date) => {
        const { handleUpdate, season } = this.props;
        handleUpdate(season, 'seasonEnd', date.toDate().getTime());
    }

    mapdate = (date) => {
        if(date) {
              const dateObject = moment(date);
              return moment(dateObject.format(dateFormat), dateFormat);
         }
         return moment(moment().format(dateFormat), dateFormat);
     }

    handleTournmentChange = (key) => {
        const { handleUpdate, season } = this.props;
        const tournment = { id: key, name: listMap['tournmentMap'][key]};
        handleUpdate(season, 'tournment', tournment);
    }

    mapList = (mapNode, list) => {
        list.forEach(item => {
            listMap[mapNode][item.id] = item.name;
        });
        return list.map((item) => (<Option key={item.id} value={item.id}>{item.name}</Option>));
    }

    componentDidMount() {
        const { fetchTournments } = this.props;
        fetchTournments();
    }

    render() {
        const nameRight = this.props.season.nameRight || '';
        const type = this.props.season.type || '';
        const seasonStart = this.props.season.seasonStart;
        const seasonEnd = this.props.season.seasonEnd;
        const tournment = this.props.season.tournment;
        const { tournments } = this.props;

        return(
            <div className='edit-container'>
                <div className='form-item'>
                    <p>name right:</p>
                    <Input size="default" value={nameRight} name="nameRight" onChange={this.onChange} style={{ width: 225 }} />
                </div>

                <div className='form-item'>
                    <p>type:</p>
                    <Input size="default" value={type} name="type" onChange={this.onChange} style={{ width: 225 }} />
                </div>

                <div className='form-item'>
                    <p>start:</p>
                    <DatePicker
                        onChange={this.changeSeasonStart}
                        style={{ width: 225 }}
                        defaultValue={this.mapdate(seasonStart)}
                        format={dateFormat}
                    />
                </div>

                <div className='form-item'>
                    <p>end:</p>
                    <DatePicker
                        onChange={this.changeSeasonEnd}
                        style={{ width: 225 }}
                        defaultValue={this.mapdate(seasonEnd)}
                        format={dateFormat}
                    />
                </div>

                <div className='form-item'>
                    <p>tournments:</p>
                    <Select value={(tournment && tournment.name) || 'English Premier League'} onChange={this.handleTournmentChange} style={{ width: 225 }}>
                        {this.mapList('tournmentMap', tournments)}
                    </Select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ loading: state.appState.isLoading, tournments: state.season.tournments });
const mapDispatchToProps = dispatch => bindActionCreators({ handleUpdate, fetchTournments }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SeasonForm);