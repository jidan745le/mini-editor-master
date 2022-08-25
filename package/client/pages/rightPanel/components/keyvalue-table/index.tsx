import React from 'react';
import { Input,Button } from 'antd-mobile'
import { Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
const KeyValueTable = ({onChange,values}) => {
    const [dataSource,setDataSource] = React.useState(values || [])
    const columns = [
      {
        dataIndex:"label",
        title:"label",
        width:"40%",
        render:(text,row,index) => <Input placeholder={`label_${index}`} defaultValue={text} onChange={e => onValueChange("label",e,index)} key={row.key}></Input>
      },
      {dataIndex:"value",
       title:"value",
       width:"40%",
       render:(text,row,index) => <Input placeholder={`value_${index}`} defaultValue={text} onChange={e => onValueChange("value",e,index)} key={row.key}></Input>
      },
      {dataIndex:"handle",
       title:"handle",
       width:"20%",
       ellipsis:true,
       render:(_,row) => <DeleteOutlined onClick={()=>{onDelete(row.key)}} style={{cursor:"pointer"}} />
      }
    ]
  
    const onValueChange = (key,value,index) => {
      const newDataSource = [...dataSource];
      newDataSource[index] ? (newDataSource[index][key] = value):(newDataSource[index]={key:Date.now()},newDataSource[index][key] = value)
      onChange && onChange(newDataSource)
      setDataSource(newDataSource)
    }
  
    const onAdd = () => {
      const newDataSource = [...dataSource];
      newDataSource.push({key:Date.now(),label:`label_${newDataSource.length}`,value:`value_${newDataSource.length}`});
      setDataSource(newDataSource)
      onChange && onChange(newDataSource)
    }

    const onDelete = key => {
      const newDataSource = [...dataSource];
      const index = newDataSource.findIndex(({key:k})=>{return k === key})
      newDataSource.splice(index, 1)
      setDataSource(newDataSource)
      onChange && onChange(newDataSource)
   }
  
    return <div>
      <Table scroll={{x:"100%"}} style={{marginBottom:"12px"}} dataSource={dataSource} columns={columns} pagination={false} />
      <Button  style={{width:"100%"}} onClick={onAdd}>增加</Button>
    </div>
  }

  export default KeyValueTable;