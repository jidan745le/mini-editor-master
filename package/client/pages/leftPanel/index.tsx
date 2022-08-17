import axios from 'axios';
import React from 'react';
import TextComponent from '../../components/textComponent';
import SelectComponent from '../../components/selectComponent';
import { Collapse } from "antd"

import './style.css';

interface ILeftPanelProps {
  data: any;
}

export default function LeftPanel(props: ILeftPanelProps) {
  const { data } = props;

  return (
    <div className="left-panel">
      <Collapse>
        <Collapse.Panel  key={1} header="控件">
          <div className="component-list">
            <TextComponent></TextComponent>
            <SelectComponent></SelectComponent>
          </div>
        </Collapse.Panel>
        <Collapse.Panel key={2} header="按钮">
          <div className="component-list">
          
          </div>
        </Collapse.Panel>
      </Collapse>

    </div>
  );
}
