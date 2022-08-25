import React from 'react';
import { RIGHT_PANEL_TYPE } from '../../constants';
import './style.css';
import { List, Input,Collapse,Selector,Button } from 'antd-mobile'
import OptionConfigure from "./components/option-configure"


interface IRigthPanelProps {
  itemData: any;
  setSelctedDrawPanelData: Function;
}


export default function RightPanel(props: IRigthPanelProps) {
  const { itemData,setSelctedDrawPanelData } = props;
  const [optionType,setOptionType] = React.useState(itemData.optionType)
  const generateRightPanel = () => {
    if (itemData.type === RIGHT_PANEL_TYPE.SELECT) {
      return <div>  <List header='下拉框设置'>
        <List.Item  key={1} extra={itemData.label}>标题</List.Item>
        <List.Item  key={2} extra={itemData.name}>字段</List.Item>

        <Collapse>
          <Collapse.Panel  key='1' title='键值对'>
            <OptionConfigure 
            itemData={itemData}
            setSelctedDrawPanelData={setSelctedDrawPanelData}/>
          </Collapse.Panel>
        </Collapse>
     
      </List></div>;
    } else if (itemData.type === RIGHT_PANEL_TYPE.TEXT) {
      //文本

      return (
        <div>
          <List header='文本框设置'>
            <List.Item key={1} extra={itemData.label}>标题</List.Item>
            <List.Item key={2} extra={itemData.name}>字段</List.Item>
          </List>
        </div>
      );
    }
  };

  return <div className="right-panel">{generateRightPanel()}</div>;
}
