import React from 'react';
import { RIGHT_PANEL_TYPE } from '../../constants';
import './style.css';
import { List, Input } from 'antd-mobile'


interface IRigthPanelProps {
  itemData: any;
  setSelctedDrawPanelData: Function;
}
export default function RightPanel(props: IRigthPanelProps) {
  const { itemData,setSelctedDrawPanelData } = props;

  const generateRightPanel = () => {
    if (itemData.type === RIGHT_PANEL_TYPE.SELECT) {
      return <div>SELECT控件</div>;
    } else if (itemData.type === RIGHT_PANEL_TYPE.TEXT) {
      //文本

      return (
        <div>
          <List header='文本框设置'>
            <List.Item extra={itemData.label}>标题</List.Item>
            <List.Item extra={<Input onBlur={e => {setSelctedDrawPanelData("name",e.target.value)}} className="placeholder-end" placeholder='请输入'/>}>字段</List.Item>
            <List.Item>其他</List.Item>
          </List>
        </div>
      );
    }
  };

  return <div className="right-panel">{generateRightPanel()}</div>;
}
