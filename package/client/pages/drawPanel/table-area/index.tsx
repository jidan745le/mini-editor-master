import React, { useState } from 'react';
import { Card, Button, Table } from 'antd'

interface TableAreaType {
    onHeaderCellChange?: (
        action: "delete" | "add" | "set",
        items: any[]   
    ) => void
}
export default (props: TableAreaType) => {
    const [columns, setColumns] = React.useState([])
    const {onHeaderCellChange} = props;

    const onAddColumns = () => {
        const newColumns = [...columns];
        newColumns.push({
            dataIndex: `id_${Date.now()}`,
            title: "title" + newColumns.length,
            width: 100,
            onHeaderCell:column => {
                return {...column}
            }
        })
        onHeaderCellChange && onHeaderCellChange("add",newColumns)
        setColumns(newColumns)
    }

    const onBlur = (e,item) => {
        const index = columns.findIndex(({dataIndex}) => dataIndex === item.dataIndex)
        const editedTitle = e.target.innerText;
        const newColumns = [...columns];
        newColumns[index]["title"] = editedTitle;
        onHeaderCellChange && onHeaderCellChange("set",newColumns)
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
                            return <th >
                                <div className='antd-th-editable'>
                                    <span
                                        onBlur={e => onBlur(e,props)}
                                        suppressContentEditableWarning
                                        contentEditable>
                                        {props.children}
                                    </span>
                                </div>
                            </th>
                        }
                    }
                }}
                
             scroll={{ x: "100%" }} columns={columns} />
        </Card>
    </div>
}