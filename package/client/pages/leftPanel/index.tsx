import axios from 'axios';
import React from 'react';
import TextComponent from '../../components/textComponent';
import SelectComponent from '../../components/selectComponent';
import './style.css';

interface ILeftPanelProps {
  data: any;
}

export default function LeftPanel(props: ILeftPanelProps) {
  const { data } = props;

  return (
    <div className="left-panel">
      <div className="component-list">
        <TextComponent></TextComponent>
        <SelectComponent></SelectComponent>
      </div>
      
    </div>
  );
}
