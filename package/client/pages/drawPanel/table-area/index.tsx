import React, { useState } from 'react';
import { Card, Button, Table } from 'antd'

interface TableAreaType {
}
export default (props: TableAreaType) => {
    const [columns, setColumns] = React.useState([])

    const onAddColumns = () => {
        const newColumns = [...columns];
        newColumns.push({
            dataIndex: Date.now(),
            title: "title" + newColumns.length,
            width: 100
        })
        setColumns(newColumns)
    }
    return <div>
        <Card
            style={{ marginTop: 16 }}
            title={<div style={{ fontWeight: 600, fontSize: "20px" }}>表格区域</div>}
            extra={<Button type="primary" onClick={onAddColumns}>增加列</Button>}
        >
            <Table
                components={{
                    header: {
                        cell: props => {
                            return <th tabIndex={1} >
                                <div className='antd-th-editable'>
                                    <span suppressContentEditableWarning contentEditable>{props.children}</span>
                                </div>
                            </th>
                        }
                    }
                }}
                onHeaderRow={row => {
                    return {
                        onClick: () => {}
                    }
                }} scroll={{ x: "100%" }} columns={columns} />
        </Card>
    </div>
}