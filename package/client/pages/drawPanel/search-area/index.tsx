import React, { useState } from 'react';
import { PageHeader, Button, Modal } from 'antd'
import SearchItem from "./component/search-item"
import ReactJson from "react-json-view"


interface SearchAreaType {
    searchAreaItems: any[],
    onDropFromControlPannel: Function,
    onDropInCanvas: Function,
    onExchangeInCanvas: Function,
    onChange: Function,
    onAdd: () => void,
}
export default (props: SearchAreaType) => {
    const { searchAreaItems } = props;
    const [jsonVisible,setJsonVisible] = React.useState(false)

    return <div>
        <PageHeader
            ghost={false}
            title="筛选区域"
            subTitle="放置筛选控件"
            extra={[
                <Button key="1" onClick={()=>{
                    setJsonVisible(true)
                }} >
                    JSON
                </Button> ,              
                <Button key="1" onClick={props.onAdd} type="primary">
                    增加块
                </Button>
         
            ]}>
            <div style={{ boxSizing: "border-box", display: "flex", flexWrap: "wrap" }}>
                {searchAreaItems.map((item, index) =>
                    <SearchItem
                        key={item.key}
                        searchItemConfig={item}
                        index={index}
                        onChange={props.onChange}
                        onExchangeInCanvas={props.onExchangeInCanvas}
                        onDropInCanvas={props.onDropInCanvas}
                        onDropFromControlPannel={props.onDropFromControlPannel} />)}
            </div>
        </PageHeader>
        <Modal onCancel={()=>setJsonVisible(false)} visible={jsonVisible} title="json数据">
            <ReactJson
                displayObjectSize={false}
                enableClipboard={true}
                src={searchAreaItems}
                displayDataTypes={false}
            />
        </Modal>
    </div>
}