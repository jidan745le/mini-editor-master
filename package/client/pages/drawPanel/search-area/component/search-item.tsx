import React, { useContext } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { COMPONENT_TYPE } from '../../../../constants';
import { Input, Select, Tag } from "antd"
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { DrawPanelContext } from "../../index"
import "../index.css"

const ComponentMap = {
    Input,
    Select
}

const isEmptyObject = obj => {
    return !Object.keys(obj).length;
}

const findItemsPosition = (items, key) => {
    return items.findIndex(({ key: k }) => k === key)
}

const ControlItem = ({ searchItemConfig, onChange }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: COMPONENT_TYPE.CONTROL,
        canDrag: (monitor) => {
            return true
        },
        item: searchItemConfig,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }));

    const onEdit = e => {
        onChange && onChange(
            searchItemConfig,
            "label",
            e.target.innerText
        )
    }

    const onSelect = e => {
        onChange && onChange(
            searchItemConfig,
            "selected",
            true
        )
    }

    const onEditVarname = e => {
        onChange && onChange(
            searchItemConfig,
            "name",
            e.target.innerText
        )
    }
    

    const {
        type,
        name,
        label
    } = searchItemConfig;

    const Component = ComponentMap[type]
    return <div ref={drag}
        style={{ opacity: isDragging ? 0.4 : 1, cursor: "grab", flex: 1 }}
        onClick={onSelect}>
        <label
            suppressContentEditableWarning
            className="item-label"
            onBlur={onEdit}
            onKeyDown={e => {
                if (e.code === "Enter") {
                    e.preventDefault();
                    e.target.blur();
                }
            }}
            contentEditable>
            {label}
        </label>：
        {<Component options={searchItemConfig?.optionConfig?.options} style={{ width: "30%", marginRight: "0.2em" }}>
        </Component>}
        <Tag
            suppressContentEditableWarning
            contentEditable
            onBlur={onEditVarname}
            onKeyDown={e => {
                if (e.code === "Enter") {
                    e.preventDefault();
                    e.target.blur();
                }
            }}>
            {name}
        </Tag>        
    </div>
}

const EmptyItem = () => {
    return <div></div>
}

const SeachItem = (props: any) => {
    const {
        onDropFromControlPannel,
        onDropInCanvas,
        onExchangeInCanvas,
        onChange,
        searchItemConfig,
        index
    } = props;

    const { onDelete, onCopy, searchItems } = useContext(DrawPanelContext)

    const [toolVisible, setToolVisible] = React.useState(false)
    const [{ canDrop, isOver, originItem }, dropRef] = useDrop(() => {
        return {
            accept: COMPONENT_TYPE.CONTROL,
            canDrop: (item) => {
                return item.key && searchItemConfig.key ?
                    item.key !== searchItemConfig.key :
                    !(!item.label && searchItemConfig.key)
            },
            drop: (item, monitor) => {
                const target = searchItemConfig;
                const origin = item;
                console.log(target, origin)
                if (isEmptyObject(target)) {
                    if (!(origin as any).label) {
                        //从控件选择区拖到画布
                        onDropFromControlPannel(origin, index)
                    } else {
                        onDropInCanvas(origin, index)
                    }
                } else {
                    onExchangeInCanvas(origin, target)
                }
                console.log(item, "item")
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                originItem: monitor.getItem(),
                isDrop:monitor.didDrop()
            })
        }
    }, [onDropFromControlPannel, onDropInCanvas, onExchangeInCanvas, onChange])

    const generateControlItem = () => {
        return isEmptyObject(searchItemConfig) ?
            <EmptyItem /> :
            <ControlItem
                searchItemConfig={searchItemConfig}
                onChange={onChange} />
    }

    const onDeleteItem = () => {
        onDelete(index, isEmptyObject(searchItemConfig))
    }

    const onCopyItem = () => {
        onCopy(index)
    }

    console.log(originItem, "originItem")
    const isExchangeOver = canDrop && isOver ?
        (!!(originItem?.key && searchItemConfig.key) ?
            ((findItemsPosition(searchItems, originItem.key) > findItemsPosition(searchItems, searchItemConfig.key)) ?
                "left" :
                "right") :
            "false") :
        "false"

    const borderLeft = {borderLeft:"2px solid rgb(112, 184, 240)"};
    const borderRight = {borderRight:"2px solid rgb(112, 184, 240)"};
    const isExchangeOverStyle = {
        left:borderLeft,
         right:borderRight,
        false:{}
    }   


    return <div
        ref={dropRef}
        className="place-item"
        onMouseEnter={e => { setToolVisible(true) }}
        onMouseLeave={e => { setToolVisible(false) }}
        style={{
            border: searchItemConfig.selected && "2px solid rgb(112, 184, 240)",            
            background: !isEmptyObject(searchItemConfig) ? "transparent" : (canDrop && isOver ? "rgb(112, 184, 240)" : "#eeeeee"),
            height: "48px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            backgroundClip: "padding-box",
            ...isExchangeOverStyle[isExchangeOver],
            outline:canDrop?"1px dashed orange":"none"
        }}>
        {generateControlItem()}
        {toolVisible && <div style={{ position: "absolute", top: 0, right: 0 }}>
            <CopyOutlined
                onClick={onCopyItem}
                style={{ color: "rgb(112, 184, 240)", cursor: "pointer", marginRight: "0.1em" }}
            />
            <DeleteOutlined
                onClick={onDeleteItem}
                style={{ color: "red", cursor: "pointer" }} />
        </div>}
    </div>
}

export default SeachItem            
