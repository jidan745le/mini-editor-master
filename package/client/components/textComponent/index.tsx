import React from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENT_TYPE } from '../../constants';
import './style.css';

export default function TextComponent() {
  const [_, drag] = useDrag(() => ({
    type: COMPONENT_TYPE.CONTROL,
    options:{dropEffect:"copy"},
    item:{
      type:COMPONENT_TYPE.TEXT,
      name:"text",
      label:undefined
    }
  }));

  return (
    <div className="text-component" ref={drag}>
      <div>
        <svg style={{width: "100%"}} viewBox="0 0 1424 1024" height="40" width="150" fill="currentColor" focusable="false" aria-hidden="true"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect fill="var(--dn-brand-color)" transform="translate(150.000000, 512.000000) rotate(90.000000) translate(-150.000000, -512.000000) " x="-50" y="502" width="400" height="20" rx="10"></rect><path d="M1344,218 C1388.18278,218 1424,253.81722 1424,298 L1424,726 C1424,770.18278 1388.18278,806 1344,806 L80,806 C35.81722,806 0,770.18278 0,726 L0,298 C0,253.81722 35.81722,218 80,218 L1344,218 Z M1344,238 L80,238 C47.1942859,238 20.5378857,264.328343 20,297.00779 L20,298 L20,726 C20,758.805714 46.328343,785.462114 79.0077903,785.991962 L80,786 L1344,786 C1376.80571,786 1403.46211,759.671657 1404,726.99221 L1404,726 L1404,298 C1404,265.194286 1377.67166,238.537886 1344.99221,238.008038 L1344,238 Z" fill="#999999" fill-rule="nonzero"></path></g></svg>
      </div>
      <span>文本组件</span>
    </div>
  );
}
