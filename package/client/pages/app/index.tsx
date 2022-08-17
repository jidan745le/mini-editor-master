import React, { useState } from 'react';
import './style.css';
import DrawPanel from '../drawPanel';
import LeftPanel from '../leftPanel';
import RightPanel from '../rightPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import "@babel/core"
// import types from '@babel/types'
// import gen from '@babel/generator'
// const log = (node) => {
//     console.log(gen(node).code)
// }
// console.log(types.stringLiteral('string'))
// log(
//   types.objectExpression([
//       types.objectProperty(
//           types.identifier('a'),
//           types.nullLiteral()
//       ),
//       types.objectProperty(
//           // 字符串类型 key
//           types.stringLiteral('*'),
//           types.arrayExpression([]),
//       ),
//       types.objectProperty(
//           types.identifier('id'),
//           types.identifier('id'),
//           false,
//           // shorthand 对 { id: id } 简写为 { id }
//           true
//       ),
//       types.objectProperty(
//           types.memberExpression(
//               types.identifier('props'),
//               types.identifier('class')
//           ),
//           types.booleanLiteral(true),
//           // 计算值 key
//           true
//       )
//   ])
// )



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

    const selectedItem = (drawPanelData["search"].find(({selected})=> !!selected) || {});

    React.useEffect(()=> {
       console.log(drawPanelData,"drawPanelData");
    },[drawPanelData])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex-row-space-between app">
        <LeftPanel data={drawPanelData}></LeftPanel>
        <DrawPanel
          onDrawPanelDataSet={setData}
          drawPanelData={drawPanelData}
        ></DrawPanel>
        <RightPanel
          setSelctedDrawPanelData={(key, value) => {
            const selected = drawPanelData["search"].find(({ selected }) => !!selected)
            selected[key] = value;
            console.log(drawPanelData,"content")
            const newDrawPanelData = { ...drawPanelData };
            setDrawPanelData(newDrawPanelData)
          }}
          key={selectedItem.key}
          itemData={selectedItem}
        ></RightPanel>
      </div>
    </DndProvider>
  );
}
