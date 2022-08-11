import React from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENT_TYPE } from '../../constants';
import './style.css';

export default function TextComponent() {
  const [_, drag] = useDrag(() => ({
    type: COMPONENT_TYPE.CONTROL,
    item: {
      type: COMPONENT_TYPE.SELECT,
      name: "select",
      label: undefined
    }
  }));

  return (
    <div className="text-component" ref={drag}>
      <div>
        <svg  style={{width: "100%"}} viewBox="0 0 1024 1024" height="40" width="150" fill="currentColor" focusable="false" aria-hidden="true"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M944,0 C988.18278,0 1024,35.81722 1024,80 L1024,944 C1024,988.18278 988.18278,1024 944,1024 L80,1024 C35.81722,1024 0,988.18278 0,944 L0,80 C0,35.81722 35.81722,0 80,0 L944,0 Z M944,20 L80,20 C47.1942859,20 20.5378857,46.328343 20,79.0077903 L20,80 L20,944 C20,976.805714 46.328343,1003.46211 79.0077903,1004 L80,1004 L944,1004 C976.805714,1004 1003.46211,977.671657 1004,944.99221 L1004,944 L1004,80 C1004,47.1942859 977.671657,20.5378857 944.99221,20 L944,20 Z" fill="#999999" fill-rule="nonzero"></path><rect fill="#999999" transform="translate(512.000000, 571.000000) scale(-1, 1) rotate(630.000000) translate(-512.000000, -571.000000) " x="502" y="171" width="20" height="800" rx="10"></rect><rect fill="#999999" transform="translate(512.000000, 791.000000) scale(-1, 1) rotate(630.000000) translate(-512.000000, -791.000000) " x="502" y="391" width="20" height="800" rx="10"></rect><rect fill="#999999" transform="translate(513.500000, 350.000000) scale(-1, 1) rotate(630.000000) translate(-513.500000, -350.000000) " x="503.5" y="-150.5" width="20" height="1001" rx="10"></rect><path d="M903.653115,129.492777 C906.69467,124.882919 912.897366,123.611559 917.507223,126.653115 C922.036206,129.64131 923.342804,135.6807 920.50299,140.263154 L920.346885,140.507223 L863.014644,227.401401 C860.820018,230.727631 857.984696,233.583294 854.674239,235.801642 C841.047887,244.932702 822.647581,241.416301 813.331586,227.989873 L813.052078,227.579981 L754.744243,140.56675 C751.669812,135.978753 752.896799,129.767127 757.484796,126.692696 C761.990865,123.673166 768.063093,124.802804 771.191174,129.190685 L771.35885,129.43325 L829.666685,216.446481 C832.741116,221.034478 838.952742,222.261466 843.540739,219.187035 C844.533876,218.52153 845.398727,217.683951 846.09506,216.714816 L846.320874,216.386954 L903.653115,129.492777 Z" fill="var(--dn-brand-color)" fill-rule="nonzero"></path><rect fill="#999999" transform="translate(362.000000, 181.000000) scale(-1, 1) rotate(630.000000) translate(-362.000000, -181.000000) " x="352" y="-69" width="20" height="500" rx="10"></rect></g></svg>      </div>
      <span>选择组件</span>
    </div>
  );
}
