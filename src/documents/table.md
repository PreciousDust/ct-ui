# Table

主要用于展示大量结构化数据。

支持排序、筛选、分页、自定义操作等复杂功能。

### 基础功能
- 斑马纹切换、边框切换效果、hover 效果
- 单选、单击、双击效果
- 固定表头、固定列
- 单选、多选
- 列表筛选【wait Poptip】
- 列表排序

### 扩展功能
- 指定数据特定样式
- 自定义表头和表尾
- 可展开【暂时不加】
- 多级表头
- 数据加载蒙层【wait Loading】
- 合并行或列
- 自定义索引
- 多级表头

### 通过设置`columns`以及`data`来渲染基础的表格

```san 基础用法
import Table from '@/table/table'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-table columns="{{columns}}" data="{{data}}"></b-table>
        </template>
    \`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男'
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男'
                }
            ],
            columns: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ]
		}
    },
    components: {
        'b-table': Table
    }
})
```

### 通过`border`设置表格的边框
```san 边框
import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table border columns="{{columns}}" data="{{data}}"></b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男'
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男'
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女'
                }
            ],
            columns: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ]
        }
    },
    components: {
        'b-table': Table
    }
})
```

### 通过`width`设置表格的宽度
```san 固定宽度
import Table from '@/table/table'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-table width=800 columns={{columns1}} data="{{data1}}"></b-table>
            <br/>
            <b-table width=800 columns={{columns2}} data="{{data1}}"></b-table>
        </template>
    \`,
    initData () {
        return {
            data1: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男'
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男'
                }
            ],
            columns1: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ],
            columns2: [
                {
                    title: 'Name',
                    key: 'name',
                    width:400
                },
                {
                    title: 'Age',
                    key: 'age',
                    width:300
                },
                {
                    title: 'Sex',
                    key: 'sex',
                    width:600
                }
            ]
		}
    },
    components: {
        'b-table': Table
    }
})
```

### 通过`height`设置表格的高度
```san 固定高度
import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
<template>
    <b-table height=150 border columns="{{columns}}" data="{{data}}"></b-table>
    <br/>
    <b-table height=150 border width=800 columns={{columns1}} data="{{data}}"></b-table>
</template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男'
                },
                {
                    name: '闪电',
                    age: 21,
                    sex: '男'
                },
                {
                    name: '麦克',
                    age: 24,
                    sex: '男'
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男'
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女'
                }
            ],
            columns: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ],
            columns1: [
                {
                    title: 'Name',
                    key: 'name',
                    width:500
                },
                {
                    title: 'Age',
                    key: 'age',
                    width:400
                },
                {
                    title: 'Sex',
                    key: 'sex',
                    width:300
                }
            ]
        }
    },
    components: {
        'b-table': Table
    }
})
```

### 固定列
```san 固定列
import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table border height=150 columns="{{columns}}" data="{{data}}"></b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男',
                    hobby:'Swimming',
                    pets:'dog',
                    occupation:'Doctor'

                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男',
                    pets:'cat',
                    hobby:'Swimming',
                    occupation:'Doctor'
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男',
                    pets:'rhizomys',
                    hobby:'Swimming',
                    occupation:'Doctor'
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女',
                    pets:'cat',
                    hobby:'Swimming',
                    occupation:'Bodyguard'
                }
            ],
            columns: [
                {
                    title: 'Name',
                    key: 'name',
                    fixed:'left',
                    minWidth:100
                },
                {
                    title: 'Age',
                    key: 'age',
                    minWidth:100
                },
                {
                    title: 'Sex',
                    key: 'sex',
                    width:100
                },
                {
                    title: 'hobby',
                    key: 'hobby',
                    width:200
                },
                {
                    title: 'occupation',
                    key: 'occupation',
                    width:400
                },
                {
                    title: 'Pets',
                    key: 'pets',
                    width:200,
                    fixed:'right'
                }
            ]
        }
    },
    components: {
        'b-table': Table
    }
})
```

### 通过设置`stripe`斑马纹，切换不同的显示效果
```san 斑马纹
import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table stripe columns="{{columns}}" data="{{data}}"></b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男'
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男'
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女'
                }
            ],
            columns: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ]
        }
    },
    components: {
        'b-table': Table
    }
})
```

```san 自定义表头和表尾
import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table stripe columns="{{columns}}" data="{{data}}">
            <div class='example-slot' slot='header'>自定义表头</div>
            <div class='example-slot' slot='footer'>自定义表尾</div>
        </b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男'
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男'
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女'
                }
            ],
            columns: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ]
        }
    },
    components: {
        'b-table': Table
    }
})

```

### 通过给`columns` 数据指定 `type: 'selection'`，即可自动开启多选。

给 `data` 设置`_checked: true` 可以默认选中当前项。

给 `data` 设置`_disabled: true` 可以禁止选择当前项。

```san 多选
import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table
                on-checked="handleChecked"
                on-checked-cancel="handleCancel"
                on-check-all="handleChecAll"
                columns="{{columns}}"
                data="{{data}}">
        </b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    _disabled: true,
                    sex: '男'
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男',
                    _checked: true
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女'
                }
            ],
            columns: [
                {
                    type:'selection',
                    width:80,
                    align:'center'
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ]
        }
    },
    components: {
        'b-table': Table
    },
    handleChecked(options){
        console.log('on-checked:选中数据集合：',options.selection)
        console.log('on-checked:当前选中数据：',options.row)
    },
    handleCancel(options){
        console.log('on-cancel:选中数据集合：',options.selection)
        console.log('on-cancel:当前取消选中数据：',options.row)
    },
    handleChecAll(selection){
        console.log('on-check-all:选中数据集合',selection)
    }
})

```

### 最小和最大宽度

通过给数据 `columns` 设置字段 `minWidth`可以给某一列的数据设置最小宽度

设置字段 `maxWidth` 可以给某一列的数据字段设置最大宽度。

```san 最小和最大宽度
import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table border columns="{{columns}}" data="{{data}}"></b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男',
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男'
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女'
                }
            ],
            columns: [
                {
                    title: 'Name',
                    key: 'name',
                    minWidth:150
                },
                {
                    title: 'Age',
                    key: 'age',
                    maxWidth:200
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ]
        }
    },
    components: {
        'b-table': Table
    }
})

```


### 通过给 `columns` 数据设置一项，指定 `type: 'index'`，可以自动显示一个从 1 开始的索引列。使用 `indexInfo` 可以配合分页显示序号

```san 序号
import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table border columns="{{columns}}" data="{{data}}"></b-table>
        <br/>
        <b-table border index-info="{{indexInfo}}" columns="{{columns}}" data="{{data}}"></b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男',
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男'
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女'
                }
            ],
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    align:'center',
                    width: 50
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ],
            indexInfo:{
                page:2,
                size:10
            }
        }
    },
    components: {
        'b-table': Table
    }
})
```

### 合并行、列

行：通过给数据 data 设置字段 _colspan 可以设置某一行的合并单元格

列：通过给数据 data 设置字段 _rowspan 可以给某一列的合并单元格

```san 合并行、列
import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table border columns="{{columns}}" data="{{data}}"></b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男',
                    _rowspan:{
                        name:3
                    }
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男',
                    _colspan:{
                        age:2
                    }
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女'
                }
            ],
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    align:'center',
                    width: 50
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ]
        }
    },
    components: {
        'b-table': Table
    }
})
```

### 特定样式

行：通过给数据 `data` 设置字段 `_className` 可以给某一行指定一个样式名称。

列：通过给列 `columns` 设置字段 `className` 可以给某一列指定一个样式。

单元格：通过给数据 `data` 设置字段 `_cellClass` 可以给任意一个单元格指定样式。

```san 特定样式

import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table border columns="{{columns}}" data="{{data}}"></b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男'
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男',
                    _className:'test-table-row'
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女',
                    _cellClass:{
                        sex:'test-table-cell'
                    }
                }
            ],
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    align:'center',
                    width: 50
                },
                {
                    title: 'Name',
                    key: 'name',
                    className:'test-table-columns'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ]
        }
    },
    components: {
        'b-table': Table
    }
})

```

### 单选、单击、双击效果
通过设置属性 `highlight-row`，可以选中某一行。

当选择时，触发事件 `current-change`，可以自定义操作，事件返回两个值 `currentRow` 和 `oldRow`，分别为当前行的数据和上一次选择的数据。

给 `data` 项设置特殊 `_highlight: true` 可以默认选中当前项。

调用 `clearCurrentRow` 方法可以手动清除选中项。

```san 单选、单击、双击效果

import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table
                highlight-row
                border
                on-row-click="handleClick"
                on-row-dbclick="handleDbclick"
                columns="{{columns}}"
                data="{{data}}">
        </b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男',
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男',
                    _highlight: true
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女'
                }
            ],
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    align:'center',
                    width: 50
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ]
        }
    },
    handleClick(row){
        console.log('on-row-click 当前单击数据:',row)
    },
    handleDbclick(row){
        console.log('on-row-dbclick 当前双击数据:',row)
    },
    components: {
        'b-table': Table
    }
})

```

### 排序
通过给 `columns` 数据的项，设置 `sortable: true`，即可对该列数据进行排序。

排序默认使用升序和降序，也可以通过设置属性 `sortMethod` 指定一个自定义排序函数，接收三个参数 `a` 、 `b` 和 `type`。

通过给某一列设置 `sortType` 可以在初始化时使用排序。

```san 排序

import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table
                border
                columns="{{columns}}"
                on-sort-change="handleSort"
                data="{{data}}">
        </b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男',
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男'
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女'
                }
            ],
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    align:'center',
                    width: 50
                },
                {
                    title: 'Age',
                    key: 'age',
                    sortable:true
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ]
        }
    },
    handleSort(options){
        console.log('当前排序列:',options.column)
        console.log('当前排序列key值:',options.key)
        console.log('当前排序数据顺序:',options.order)
    },
    components: {
        'b-table': Table
    }
})

```

### 多级表格

`column` 设置 `children`，可以渲染出多级表头

注意：不支持在多级表头里面嵌套 `fixed` 固定列

```san 过滤

import Table from '@/table/table'

module.exports = san.defineComponent({
template: \`
    <template>
        <b-table
                border
                columns="{{columns}}"
                data="{{data}}">
        </b-table>
    </template>
\`,
    initData () {
        return {
            data: [
                {
                    name: '欧阳',
                    age: 12,
                    sex: '男',
                    id:1,
                    hobby:'football',
                    color:'red'
                },
                {
                    name: '青蛙',
                    age: 18,
                    sex: '男',
                    id:2,
                    hobby:'book',
                    color:'yellow'
                },
                {
                    name: '警长',
                    age: 28,
                    sex: '男',
                    id:3,
                    hobby:'movies',
                    color:'green'
                },
                {
                    name: '黑猫',
                    age: 30,
                    sex: '女',
                    id:4,
                    hobby:'write',
                    color:'pink'
                }
            ],
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    align:'center',
                    width: 50
                },
                {
                    title: '测试',
                    align:'center',
                    children:[
                        {
                            title: 'Color',
                            key: 'color',
                            width:200,
                            sortable:true
                        },
                        {
                            title: '合计',
                            align:'center',
                            children:[
                                {
                                    title: 'Hobby',
                                    key: 'hobby',
                                    width:100
                                },
                                {
                                    title: 'Id',
                                    key: 'id',
                                    width:100,
                                    sortable:true
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Age',
                    key: 'age',
                    sortable:true
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Sex',
                    key: 'sex'
                }
            ]
        }
    },
    components: {
        'b-table': Table
    }
})

```

### Table props
| 参数      | 说明    | 类型      | 默认值   |
|---------- |-------- |---------- |------------- |-------- |
| data     |  显示的结构化数据，特殊配置项具体项见下文  | Array  |    [ ]   |
| columns     |  表格列的配置描述，具体项见下文  | Array  |   [ ]   |
| border     |  是否显示单元格边框  |  Boolean  |    false   |
| stripe     |  是否显示间隔斑马纹  |  Boolean  |    false   |
| index-info     |  表格序号的配置项 |   Object  |   `page`:当前页【1】<br> `size`:页大小【10】 |
| width     |  表格宽度	  |  Number / String  |   auto   |
| height     |  表格高度，设置后，如果表格内容大于此值，会固定表头	  |  Number / String  |  -    |    auto   |
| highlight-row     |  	是否支持高亮选中的行，即单选	  |  Boolean  |    false   |
| show-header     |  	 是否显示表头	  |  Boolean  |      true   |

### columns props
| 属性      | 说明    | 类型      | 可选值       | 默认值       |
| ---------- | -------- | ----------- | ------------- | -------- |
| type     |  列类型，可选值为   |  String  | `selection`、`html`、`index`、`expand`   | html    |
| title     |  列头显示文字  |  String  |  -    | '...'    |
| key     |  对应列内容的字段名  |  String  |  -    | -    |
| width     |  列宽	  |  Number  |  -    | -    |
| minWidth     |  最小列宽	  |  Number  |  -    | -    |
| maxWidth     |  最小列宽	  |  Number  |  -    | -    |
| align     |  对齐方式	  |  String  |  `left`、`right`、`center`    | -    |
| className     |  列的样式名称		  |  String  |  -    | -    |
| fixed     |  列是否固定在左侧或者右侧	  |  String  |  `left`、`right`   | -    |
| sortable     |  对应列是否可以排序，如果设置为 `custom`，则开启远程排序，需要配合 `on-sort-change` 事件	  |  Boolean / 'custom'  | -  | false   |
| sortMethod     |  自定义排序使用的方法，当设置 sortable: true 时有效。详见示例	  |  Boolean  | -  | -   |
| sortType     |  设置初始化排序	  |  Boolean  | `asc`、`desc`  | -   |
| children     |  多级表头配置项，具体见示例  |   Array  | -  | -   |

### data props
| 属性      | 说明    | 类型      | 可选值       | 默认值       |
| ---------- | -------- | ----------- | ------------- | -------- |
| _checked     |  设定当前行默认选中状态  |  Boolean  | - | false |
| _disabled     |  设定当前行默认禁止状态  |  Boolean  |  -    | false    |
| _className     |  给某一行指定一个样式名称,详见特定样式  |  String  |  -    | -    |
| _cellClass     |  给任意一个单元格指定样式,详见特定样式	  |  Object  |  -    | -    |
| _colspan     |  某一行的合并单元格,详见合并行、列	  |  Object  |  -    | -    |
| _rowspan     |  某一列的合并单元格,详见合并行、列  |  Object  |  -    | -    |

### slot
| 属性      | 说明    |
| ---------- | -------- |
| header     |  表头  |
| footer     |  页脚  |

### events
| 方法名	      | 说明	    | 参数 |
|---------- |-------- |---------- |
| on-checked     |  当选中节点时触发   |  `selection`: 已经选中的数据<br>`row`: 当前选中的数据  |
| on-checked-cancel     |  当取消选中节点时触发   |  `selection`: 已经选中的数据<br>`row`: 当前取消选中的数据  |
| on-check-change     |  当选中状态改变时触发   |  `selection`: 已经选中的数据  |
| on-check-all     |  当全选数据时触发   |  `selection`: 已经选中的数据  |
| on-check-all-cancel     |  当全部取消数据时触发   |  -  |
| on-row-click     |  当选中节点时触发   |  `row`: 当前选中的数据  |
| on-row-dbclick     |  当选中节点时触发   |  `row`: 当前选中的数据  |
| on-current-change   |  开启 `highlight-row` 后有效，当表格的当前行发生变化的时候会触发   |  `currentRow`: 当前高亮行的数据 <br> `oldRow`: 上一次高亮的数据  |
| on-sort-change     |  当选中节点时触发   |  `column`: 当前列数据 <br> `key`: 排序依据的指标 <br> `order`: 排序的顺序，值为 asc 或 desc|
