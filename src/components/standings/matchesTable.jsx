/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';

const load_values = () => {
    const loadedVal = [];
    for (let i = 0; i < 10; i++) {
        loadedVal.push({
            key: i.toString(),
            home: `Edward ${i}`,
            score: `score`,
            away: `away`
        });
    }
    return loadedVal;
};

const originData = load_values();


const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                 name={dataIndex}
                 style={{ margin: 0}}
                 rules={[
                     {
                         required: true,
                         message: `PLease Input ${title}`
                     }
                 ]}>
                    {inputNode}
                </Form.Item>
            ) :
            (children)}
        </td>
    );
};

const MatchesTable = (props) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const { onMatchSave, dataTable } = props;
    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            home: '',
            away: '',
            score: '',
            ...record
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            onMatchSave(row, key);
            setEditingKey('');
        } catch(errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [

        {
            title: 'HOME',
            dataIndex: 'home',
            width: '7%',
            editable: false
        },

        {
            title: 'SCORE',
            dataIndex: 'score',
            width: '2%',
            editable: true
        },

        {
            title: 'AWAY',
            dataIndex: 'away',
            width: '7%',
            editable: false
        },

        {
            title: 'ROUND',
            dataIndex: 'round',
            width: '2%',
            editable: false
        },

        {
            title: 'DATE',
            dataIndex: 'date',
            width: '5%',
            editable: false
        },

        {
            title: 'ACTION',
            dataIndex: 'operation',
            width: '10%',
            // eslint-disable-next-line react/display-name
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ?
                (
                    <span>
                        <Typography.Link
                         onClick={() => save(record.key)}
                         style={{ marginRight: 8 }}
                        >
                            Save
                        </Typography.Link>

                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) :

                (
                   <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                       Edit
                   </Typography.Link>
                );
            }
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            })
        };
    });

    return (
        <div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell
                        }
                    }}
                    bordered
                    className="table-style"
                    rowClassName="editable-row"
                    dataSource={dataTable}
                    columns={mergedColumns}
                    pagination={false}
                    />
            </Form>
        </div>
    );

};

export default MatchesTable;