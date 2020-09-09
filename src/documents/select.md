# Select

下拉选择器，暂时实现基础功能，可以供page组件使用。

```san 基础用法
import Select from '@/select'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                ></ct-select>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'',
            options:[{
                        label: '增专',
                        value: '004'
                    }, {
                        label: '增普',
                        value: '007'
                    }, {
                        label: '机动车',
                        value: '005'
                    }, {
                        label: '电子票',
                        value: '025'
                    }]
        }
    },
    components: {
        'ct-select': Select
    },
    onChange(val){
        console.log('val',val)
    }
})
```

```san size
import Select from '@/select'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}"  size="small" ></ct-select>
            </div>
            <div class="inputDemoCss">
                <ct-select value="{= value2 =}" options="{{options}}"  size="normal" ></ct-select>
            </div>
            <div class="inputDemoCss">
                <ct-select value="{= value3 =}" options="{{options}}"  size="large" ></ct-select>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'004',
            value2:'004',
            value3:'004',
            options:[{
                        label: '增专',
                        value: '004'
                    }, {
                        label: '增普',
                        value: '007'
                    }, {
                        label: '机动车',
                        value: '005'
                    }, {
                        label: '电子票',
                        value: '025'
                    }]
        }
    },
    components: {
        'ct-select': Select
    }
})
```

```san readonly 和 disabled
import Select from '@/select'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}"  readonly ></ct-select>
            </div>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}"  disabled ></ct-select>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'004',
            options:[{
                        label: '增专',
                        value: '004'
                    }, {
                        label: '增普',
                        value: '007'
                    }, {
                        label: '机动车',
                        value: '005'
                    }, {
                        label: '电子票',
                        value: '025'
                    }]
        }
    },
    components: {
        'ct-select': Select
    }
})
```

```san labelInValue
import Select from '@/select'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" labelInValue on-change="onChange" ></ct-select>
            </div>
            <div class="inputDemoCss">
                <ct-select value="{= value2 =}" options="{{options}}" on-change="onChange" ></ct-select>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'004',
            value2:'004',
            options:[{
                        label: '增专',
                        value: '004'
                    }, {
                        label: '增普',
                        value: '007'
                    }, {
                        label: '机动车',
                        value: '005'
                    }, {
                        label: '电子票',
                        value: '025'
                    }]
        }
    },
    components: {
        'ct-select': Select
    },
    onChange(val){
        console.log('val',val)
    }
})
```
```san width 属性
import Select from '@/select'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" width="300" options="{{options}}" on-change="onChange" ></ct-select>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'004',
            options:[{
                        label: '增专',
                        value: '004'
                    }, {
                        label: '增普',
                        value: '007'
                    }, {
                        label: '机动车',
                        value: '005'
                    }, {
                        label: '电子票',
                        value: '025'
                    }]
        }
    },
    components: {
        'ct-select': Select
    },
    onChange(val){
        console.log('val',val)
    }
})
```

```san placement
import Select from '@/select'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="bottom-start" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
            <div class="inputDemoCss">
                 <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="bottom" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="bottom-end" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
            <div class="inputDemoCss">
                 <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="top-start" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="top" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
            <div class="inputDemoCss">
                 <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="top-end" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="left-start" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
            <div class="inputDemoCss">
                 <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="left" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="left-end" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
            <div class="inputDemoCss">
                 <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="right-start" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="right" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
            <div class="inputDemoCss">
                 <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                placement="right-end" dropWidth="{{dropWidth}}"
                ></ct-select>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'004',
            dropWidth:"230",
            options:[{
                        label: '增专',
                        value: '004'
                    }, {
                        label: '增普',
                        value: '007'
                    }, {
                        label: '机动车',
                        value: '005'
                    }, {
                        label: '电子票',
                        value: '025'
                    }]
        }
    },
    components: {
        'ct-select': Select
    },
    onChange(val){
        console.log('val',val)
    }
})
```

```san option 中的 disabled
import Select from '@/select'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                ></ct-select>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'',
            options:[{
                        label: '增专',
                        value: '004',
                        disabled:true
                    }, {
                        label: '增普',
                        value: '007'
                    }, {
                        label: '机动车',
                        value: '005'
                    }, {
                        label: '电子票',
                        value: '025'
                    }]
        }
    },
    components: {
        'ct-select': Select
    },
    onChange(val){
        console.log('val',val)
    }
})
```

```san clearable：可清空属性
import Select from '@/select'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                clearable
                ></ct-select>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'',
            options:[{
                        label: '增专',
                        value: '004',
                        disabled:true
                    }, {
                        label: '增普',
                        value: '007'
                    }, {
                        label: '机动车',
                        value: '005'
                    }, {
                        label: '电子票',
                        value: '025'
                    }]
        }
    },
    components: {
        'ct-select': Select
    },
    onChange(val){
        console.log('val',val)
    }
})
```

```san showLabelWidthValue：是否label和value都展示
import Select from '@/select'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                clearable showLabelWidthValue
                ></ct-select>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'',
            options:[{
                        label: '增专',
                        value: '004',
                        disabled:true
                    }, {
                        label: '增普',
                        value: '007'
                    }, {
                        label: '机动车',
                        value: '005'
                    }, {
                        label: '电子票',
                        value: '025'
                    }]
        }
    },
    components: {
        'ct-select': Select
    },
    onChange(val){
        console.log('val',val)
    }
})
```


```san ifHaveAll：是否包含全部按钮
import Select from '@/select'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-select value="{= value =}" options="{{options}}" on-change="onChange"
                clearable showLabelWidthValue ifHaveAll
                ></ct-select>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'',
            options:[{
                        label: '增专',
                        value: '004',
                        disabled:true
                    }, {
                        label: '增普',
                        value: '007'
                    }, {
                        label: '机动车',
                        value: '005'
                    }, {
                        label: '电子票',
                        value: '025'
                    }]
        }
    },
    components: {
        'ct-select': Select
    },
    onChange(val){
        console.log('val',val)
    }
})
```

### Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| value	 | `String`、`Object`| 当前select选中的值 | `-` |
| options | `Array`| 当前select框的下拉列表，所使用的数据 | `-` |
| labelInValue	 | `Boolean`| 默认为`false`，当使用`on-change`时，只外抛`value`，若为`false`，则外抛一个对象，`{label:'label',value:'value'}` | `false` |
| readonly	 | `Boolean`| 是否是只读状态 | `false` |
| disabled	 | `Boolean`| 是否禁用 | `false` |
| clearable	 | `Boolean`| 是否具有清除功能 | `false` |
| showLabelWidthValue	 | `Boolean`| 是否`label`和`value`都展示 | `false` |
| open	 | `Boolean`| 是否展开下拉列表 | `false` |
| width	 | `String`、`Number`| 宽度，支持像素和百分比 | `100%` |
| size	 | `String`| input框的型号，可选`large`、`normal`、`small` | `normal` |
| optionClassName	 | `String`| `option` 的`class` | `-` |
| ifHaveAll	 | `Boolean`| 是否展示`全部`选项 | `false` |
| allName | `String` | `全部` 选项的 `name` | `全部` |
| allValue	 | `String`| `全部` 选项的 `value` | `无` |
| placement	 | `String`| 下拉框的展示位置，可选`top`、`bottom`、`left`、`right`、`top-start`、`bottom-start`、`left-start`、`right-start`、`top-end`、`bottom-end`、`left-end`、`right-end`、 | `bottom-start` |


### Options

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| value	 | `String` | `option` 所代表的值 | `-` |
| label	 | `String` | `option` 的展示汉字 | `-` |
| disabled	 | `Boolean` | `option` 的禁用状态 | `false` |



### Events

| 名称 |描述 | 返回值 |
| --- |  --- | --- |
| on-change	 | `数据改变`时触发 | `value` |
| on-select	 | `数据改变`时触发 | `value` |
| on-clear	 | `清空数据`时触发 | `-` |
| on-open-change | 展开关闭状态切换时触发 | `open` |


### Select methods

| 方法名 | 说明 | 参数 |
| --- |--- | --- |
| clear | 清空select的所选值|`无`|



