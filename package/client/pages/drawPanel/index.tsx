
import React, { useState, createContext } from 'react';
import './style.css';
import SearchArea from "./search-area"
import TableArea from './table-area';
import { Button, Drawer,Modal } from 'antd';
import ReactJson from "react-json-view"
import {cloneDeep} from "lodash"

export const DrawPanelContext = createContext(null);

interface IDrawPanelProps {
  drawPanelData?: any;
  onDrawPanelDataSet: Function
}

type SearchChangePayload = {
  items: any[];
  originItem: any;
  targetItem: any;
  dropIndex: number;
  deletedIndex: number;
  changedKey: string;
  changedValue: any;
}

interface SearchChangeTypePayloadMap {
  addBlock: Pick<SearchChangePayload, "items">;
  minusBlock: Pick<SearchChangePayload, "items" | "deletedIndex">;
  itemsExchange: Pick<SearchChangePayload, "items" | "originItem" | "targetItem">;
  droppedItemPlaced: Pick<SearchChangePayload, "items" | "originItem" | "dropIndex">;
  itemDropped: Pick<SearchChangePayload, "items" | "originItem" | "dropIndex">;
  changeAttr: Pick<SearchChangePayload, "items" | "targetItem" | "changedKey" | "changedValue">
}

type PayloadType<T> =
  T extends "addBlock" ? SearchChangeTypePayloadMap["addBlock"] :
  T extends "minusBlock" ? SearchChangeTypePayloadMap["minusBlock"] :
  T extends "itemsExchange" ? SearchChangeTypePayloadMap["itemsExchange"] :
  T extends "droppedItemPlaced" ? SearchChangeTypePayloadMap["droppedItemPlaced"] :
  T extends "itemDropped" ? SearchChangeTypePayloadMap["itemDropped"] :
  T extends "changeAttr" ? SearchChangeTypePayloadMap["changeAttr"] :
  any


function addBlockHandle({ items }: PayloadType<"addBlock">) {
  return [...items, {}]
}

function minusBlockHandle({ items, deletedIndex }: PayloadType<"minusBlock">) {
  const newItem = [...items];
  newItem.splice(deletedIndex, 1);
  return newItem;
}

function itemsExchangeHandle({ items, originItem, targetItem }: PayloadType<"itemsExchange">) {
  const exchange = (fromKey, toKey, list) => {
    const fromIndex = list.findIndex(({ key }) => key === fromKey);
    const toIndex = list.findIndex(({ key }) => key === toKey);

    const temp = list[toIndex];
    list[toIndex] = list[fromIndex];
    const newAry = [...list];
    newAry.splice(fromIndex, 1);
    if (fromIndex > toIndex) {
      newAry.splice(toIndex + 1, 0, temp);
    } else if (fromIndex < toIndex) {
      newAry.splice(toIndex - 1, 0, temp);
    }
    return newAry;
  }

  const newItems = exchange(originItem.key, targetItem.key, items)
  return newItems;
}

function droppedItemPlacedHandle({ items, originItem, dropIndex }: PayloadType<"droppedItemPlaced">) {
  //在画布中放置到空块
  const newItems: any = [...items];
  const fromItemIndex = newItems.findIndex(({ key }) => key === originItem.key)
  newItems[dropIndex] = originItem;
  newItems[fromItemIndex] = {};
  return newItems;
}

function itemDroppedHandle({ items, originItem, dropIndex }: PayloadType<"itemDropped">) {
  //从左边控件区拖到画布区
  const newItems = [...items];
  const newItem = { ...originItem, key: Date.now() };
  newItem.label = `cumtom_${dropIndex + 1}`
  newItems[dropIndex] = newItem;
  return newItems;
}

function modifyAttrHandle({ items, targetItem, changedKey, changedValue }: PayloadType<"changeAttr">) {
  const newItems: any = [...items];
  const index = newItems.findIndex(({ key: k }) => { return targetItem.key === k })
  if (changedKey === "selected") {
    newItems.forEach(item => {
      if (!!Object.keys(item).length)
        item.selected = false;
    })
  }
  newItems[index][changedKey] = changedValue;
  return newItems;
}

function transformToNewSearchItems<T extends keyof SearchChangeTypePayloadMap>(type: T, payload: PayloadType<T>): any[] {
  let retItems = []
  switch (type) {
    case "addBlock": retItems = addBlockHandle(payload); break;
    case "minusBlock": retItems = minusBlockHandle(payload as PayloadType<"minusBlock">); break;
    case "itemsExchange": retItems = itemsExchangeHandle(payload as PayloadType<"itemsExchange">); break;
    case "droppedItemPlaced": retItems = droppedItemPlacedHandle(payload as PayloadType<"droppedItemPlaced">); break;
    case "itemDropped": retItems = itemDroppedHandle(payload as PayloadType<"itemDropped">); break;
    case "changeAttr": retItems = modifyAttrHandle(payload as PayloadType<"changeAttr">); break;
  }
  console.log(type, retItems, "newItems")

  return retItems;
}

export default function DrawPanel(props: IDrawPanelProps) {
  const { drawPanelData, onDrawPanelDataSet } = props;
  const [visible, setVisible] = useState(false);
  const frameDom = React.useRef(null)
  const [jsonVisible,setJsonVisible] = React.useState(false)


  const showDrawer = () => {
    const data = cloneDeep(drawPanelData);
    data.columns.forEach(column => {
      delete column.onHeaderCell;
    })
    frameDom.current && frameDom.current.contentWindow.postMessage(data, "*")
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  console.log(drawPanelData, "drawPanelData")
  //search部分
  const onItemDropped = (originItem, dropIndex) => {
    //从左边控件区拖到画布区
    console.log(JSON.stringify(drawPanelData), "drawPanelData", "onItemDropped")

    const payload = {
      items: drawPanelData["search"],
      originItem,
      dropIndex
    }
    console.log(payload)
    const newItems = transformToNewSearchItems("itemDropped", payload)
    onDrawPanelDataSet("search", newItems)
  }

  const onDropTo = (originItem, dropIndex) => {
    const payload = {
      items: drawPanelData["search"],
      originItem,
      dropIndex
    }
    const newItems = transformToNewSearchItems("droppedItemPlaced", payload)
    onDrawPanelDataSet("search", newItems)
  }

  const onExchange = (originItem, targetItem) => {
    const payload = {
      items: drawPanelData["search"],
      originItem,
      targetItem
    }
    const newItems = transformToNewSearchItems("itemsExchange", payload)
    onDrawPanelDataSet("search", newItems)
  }

  const onChange = (targetItem, attr, changedValue) => {
    const payload = {
      items: drawPanelData["search"],
      targetItem,
      changedKey: attr,
      changedValue
    }

    const newItems = transformToNewSearchItems("changeAttr", payload)
    onDrawPanelDataSet("search", newItems)
  }

  const onAdd = () => {
    const payload = {
      items: drawPanelData["search"],
    }
    console.log(payload, "payload")

    const newItems = transformToNewSearchItems("addBlock", payload)
    onDrawPanelDataSet("search", newItems)
  }

  const onDelete = (deletedIndex, isEmptyItem) => {
    const payload = {
      items: drawPanelData["search"],
      deletedIndex
    }
    if (isEmptyItem) {
      const newItems = transformToNewSearchItems("minusBlock", payload)
      onDrawPanelDataSet("search", newItems)
    } else {
      const newItems = [...payload.items]
      newItems[deletedIndex] = {};
      onDrawPanelDataSet("search", newItems)
    }

  }

  const onCopy = (copyIndex) => {
    const items = drawPanelData["search"]
    const newItems = [...items];
    let newItem
    if (Object.keys(newItems[copyIndex]).length) {
      newItem = { ...newItems[copyIndex], key: Date.now() }
      delete newItem.selected;
    } else {
      newItem = {}
    }
    newItems.splice(copyIndex + 1, 0, newItem)
    onDrawPanelDataSet("search", newItems)
  }

  const onHeaderCellChange = (type, columns) => {
    onDrawPanelDataSet("columns", columns)
  }

  return (
    <DrawPanelContext.Provider value={{ onDelete, onCopy, searchItems: drawPanelData["search"] }}>
      <div
        className="draw-panel"
      >
        <Button onClick={showDrawer}>预览</Button>
        <Button onClick={
          () => {
            setJsonVisible(true)
          }}>
          Json
        </Button>

        <Drawer
          title="预览"
          placement="right"
          onClose={onClose}
          visible={visible}
          width="100vw"
        >
          <iframe ref={ref => {
            console.log(ref, "ref..........")
            if (!ref) {
              return;
            }
            frameDom.current = ref;
            frameDom.current.onload = () => {
              const data = cloneDeep(drawPanelData);
              data.columns.forEach(column => {
                delete column.onHeaderCell;
              })
              frameDom.current.contentWindow.postMessage(data, "*")
            }
          }} style={{ border: "0px" }}
            height="100%"
            width="100%"
            src="http://localhost:9999" />
        </Drawer>
        <SearchArea
          onDropFromControlPannel={onItemDropped}
          onDropInCanvas={onDropTo}
          onExchangeInCanvas={onExchange}
          onChange={onChange}
          onAdd={onAdd}
          searchAreaItems={drawPanelData["search"]}
        />
        <TableArea onHeaderCellChange={onHeaderCellChange} />
        <Modal
          onCancel={() => setJsonVisible(false)}
          visible={jsonVisible}
          title="json数据">
            <ReactJson
                displayObjectSize={false}
                enableClipboard={true}
                src={drawPanelData}
                displayDataTypes={false}
            />
        </Modal>
      </div>
    </DrawPanelContext.Provider>
  );
}



