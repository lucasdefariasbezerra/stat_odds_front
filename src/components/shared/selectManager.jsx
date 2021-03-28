import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import '../../template/style.css';

const { Option } = Select;

class SelectManager extends Component {
    state = {
        map: {}
    }

    static propTypes = {
        name: PropTypes.string,
        list: PropTypes.array,
        value: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        name: "",
        value: "",
        list: [],
        onChange: () => {}
    };

    mapList = () => {
        const { list } = this.props;
        const map = {};
        list.forEach(item => {
            map[item.id] = item.name;
        });
        return list.map((item) => (<Option key={item.id} value={item.id}>{item.name}</Option>));
    }

    handleChange = (key) => {
        const { name, list, onChange } = this.props;
        const { map } = this.state;
        if (Object.keys(map).length === 0) {
            const map = this.convertListToMap(list);
            this.setState({ map }, () => {
                const { map } = this.state;
                const changedObject = {id: key, name: map[key]};
                onChange(name, changedObject);
            });
        } else {
            const changedObject = {id: key, name: map[key]};
            onChange(name, changedObject);
        }
    }

    convertListToMap = (list) => {
        const map = {};
        list.forEach(item => {
            map[item.id] = item.name;
        });
        return map;
    }


    render() {
        const { value } = this.props;
        return(
            <div>
                <Select value={value} onChange={this.handleChange} style={{ width: 225 }}>
                    {this.mapList()}
                </Select>
            </div>
        );
    }
}

export default SelectManager;