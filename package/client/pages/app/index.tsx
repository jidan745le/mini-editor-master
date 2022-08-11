import React, { useState } from 'react';
import './style.css';
import DrawPanel from '../drawPanel';
import LeftPanel from '../leftPanel';
import RightPanel from '../rightPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
    const [drawPanelData, setDrawPanelData] = useState({
        search: [{}]
    });
  
    const setData = (type,datas) => {
        const newDrawPanelData = {...drawPanelData};
        newDrawPanelData[type] = [...datas];
        console.log(type,datas,newDrawPanelData,"fdsfdsfds")

        setDrawPanelData(newDrawPanelData)
    }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex-row-space-between app">
        <LeftPanel data={drawPanelData}></LeftPanel>
        <DrawPanel
          onDrawPanelDataSet={setData}
          drawPanelData={drawPanelData}
        ></DrawPanel>
        <RightPanel
           setSelctedDrawPanelData={(key,value)=>{
              const selected = drawPanelData["search"].find(({selected})=> !!selected)
              selected[key] = value;
              const newDrawPanelData = {...drawPanelData};
              setDrawPanelData(newDrawPanelData)
           }}
          itemData={drawPanelData["search"].find(({selected})=> !!selected) || {}}         
        ></RightPanel>
      </div>
    </DndProvider>
  );
}
