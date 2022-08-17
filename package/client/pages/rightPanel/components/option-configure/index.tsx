
import React from 'react';
import { Input, Selector, Form } from 'antd-mobile'
import KeyValueTable from "../keyvalue-table"
import { pick } from "lodash"
interface OptionConfigType {
    optionType: "custom" | "datasource" | "";
    options?: any[];
    url?: string;
}

const keyMap = {
    "datasource": "url",
    custom: "options"
}

const OptionConfigure: React.FC<any> = ({ setSelctedDrawPanelData, itemData }) => {
    const [optionConfig, setOptionConfig] = React.useState<OptionConfigType>(itemData.optionConfig || { optionType: "" })
    const { optionType } = optionConfig;

    const initialOptions = [{
        label: '自定义',
        value: 'custom',
    }, {
        label: '接口数据源',
        value: 'datasource',
    }];

    return <div>
        <Selector
            options={initialOptions}
            defaultValue={[optionConfig.optionType]}
            onChange={(arr, extend) => {
                const config = { ...optionConfig, optionType: (arr.length > 0 ? arr[0] : "") }
                const content = pick(config, ["optionType", keyMap[config.optionType]])
                console.log(content, "content");

                setOptionConfig(config as OptionConfigType)
                setSelctedDrawPanelData("optionConfig", content)
            }}
            style={{ marginBottom: "12px" }}
        />
        {optionType === "custom" && <KeyValueTable values={optionConfig.options} onChange={value => {
            const config = { ...optionConfig, options: value }
            const content = pick(config, ["optionType", keyMap[config.optionType]])

            setOptionConfig(config)
            setSelctedDrawPanelData("optionConfig", content)
        }} />}
        {optionType === "datasource" &&
            <Form>
                <Form.Item
                    label='数据源'
                    extra={
                        <div>
                            <a>设置</a>
                        </div>
                    }
                >
                    <Input onBlur={e => {
                        const config = { ...optionConfig, url: e.target.value }
                        setOptionConfig(config)
                        setSelctedDrawPanelData("optionConfig", pick(config, ["optionType", "url"]))
                    }} style={{ textAlign: "right" }} placeholder='请输入数据源url' defaultValue={optionConfig.url} /> 
                </Form.Item>
            </Form>}
    </div>
}

export default OptionConfigure
