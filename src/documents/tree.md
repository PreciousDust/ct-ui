# Tree 树形控件
用清晰的层级结构展示信息，可展开或折叠。
- 当数据过多时，配合 table 组件批量显示数据。
- 支持默认选中不选中，默认禁用启用，默认展开收起
- 支持节点数据异步加载
- 支持节点级联勾选或只能单个勾选
- 支持全选、反选
- 支持节点搜索，模糊查询
- 支持手风琴效果，一个节点展开，同级其他节点收起

### 通过设置`data`来渲染基础的树形结构
给节点设置 `selected`可以将节点设置为选中,`select`触发选中事件。

```san 基础用法
import Tree from '@/tree/tree'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-tree data="{{data}}" on-select="handleSelect"></b-tree>
        </template>
    \`,
    initData () {
        return {
            data: [
                {
                    name: '一级 1',
                    expanded: true,
                    children: [
                        {
                            name: '二级 1-1',
                            expand: true,
                            selected:true,
                            children: [
                                {
                                    name: '三级 1-1-1'
                                },
                                {
                                    name: '三级 1-1-2'
                                }
                            ]
                        },
                        {
                            name: '二级 1-2',
                            children: [
                                {
                                    name: '三级 1-2-1'
                                },
                                {
                                    name: '三级 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    handleSelect(options){
        console.log('handleSelect:',options)
    },
    components: {
        'b-tree': Tree
    }
})
```

### 手风琴
设置`accordion`可以触发手风琴效果

给节点设置 `expanded`可以将节点设置为选中,`expand`触发展开/收起事件。

```san accordion
import Tree from '@/tree/tree'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-tree accordion data="{{data}}" on-expand="handleExpand"></b-tree>
        </template>
    \`,
    initData () {
        return {
            data: [
                {
                    name: '一级 1',
                    expanded: true,
                    children: [
                        {
                            name: '二级 1-1',
                            children: [
                                {
                                    name: '三级 1-1-1'
                                },
                                {
                                    name: '三级 1-1-2'
                                }
                            ]
                        },
                        {
                            name: '二级 1-2',
                            children: [
                                {
                                    name: '三级 1-2-1',
                                    children: [
                                        {
                                            name: '四级 1-2-1-1'
                                        },
                                        {
                                            name: '四级 1-2-1-2'
                                        }
                                    ]
                                },
                                {
                                    name: '三级 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    handleExpand(options){
        console.log('handleExpand:',options)
    },
    components: {
        'b-tree': Tree
    }
})
```

### 可勾选
支持节点级联勾选或只能单个勾选,`show-checkbox`来控制是否显示勾选栏,`checkboxOptions`来配置级联的效果

给节点设置 `expanded`、`selected`、`checked` 和 `disabled` 可以将节点设置为展开、选中、勾选和禁用

也可以通过`defaultOpt`配置以上 Key值【见文档配置项】

```san 可勾选
import Tree from '@/tree/tree'
import checkbox from '@/checkbox/checkbox'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-checkbox checked='{= checkboxOptions.parent =}'>是否级联父级数据</b-checkbox>
            <b-checkbox checked='{= checkboxOptions.children =}'>是否级联子级数据</b-checkbox>
            <b-tree show-checkbox checkbox-options="{{checkboxOptions}}" data="{{data}}" on-check="handleCheck"></b-tree>
        </template>
    \`,
    initData () {
        return {
            checkboxOptions: {
                parent: true,
                children: true
            },
            data: [
                {
                    name: '一级 1',
                    expanded: true,
                    children: [
                        {
                            name: '二级 1-1',
                            children: [
                                {
                                    name: '三级 1-1-1'
                                },
                                {
                                    disabled:true,
                                    name: '三级 1-1-2'
                                }
                            ]
                        },
                        {
                            name: '二级 1-2',
                            children: [
                                {
                                    name: '三级 1-2-1',
                                    children: [
                                        {
                                            name: '四级 1-2-1-1'
                                        },
                                        {
                                            name: '四级 1-2-1-2'
                                        }
                                    ]
                                },
                                {
                                    name: '三级 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    handleCheck(options){
        console.log('handleCheck:',options)
    },
    components: {
        'b-tree': Tree,
        'b-checkbox': checkbox
    }
})
```

### 默认选中、展开
通过`default-checked-values` 默认选中的节点。

通过`default-expanded-values` 默认展开的节点。

此方法和上述与 data 设置`expanded`、`checked`建议选一种方式使用。

```san 可勾选
import Tree from '@/tree/tree'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-tree
                    show-checkbox
                    default-checked-values='{{defaultCheckedValues}}'
                    default-expanded-values='{{defaultExpandedValues}}'
                    data="{{data}}">
            </b-tree>
        </template>
    \`,
    initData () {
        return {
            defaultCheckedValues: [4,7],
            defaultExpandedValues: [1,2,5],
            data: [
                {
                    name: '一级 11',
                    id:1,
                    children: [
                        {
                            name: '二级 1-1',
                            id:2,
                            children: [
                                {
                                    id:3,
                                    name: '三级 1-1-1'
                                },
                                {
                                    id:4,
                                    name: '三级 1-1-2'
                                }
                            ]
                        },
                        {
                            name: '二级 1-2',
                            id:5,
                            children: [
                                {
                                    id:6,
                                    name: '三级 1-2-1',
                                    children: [
                                        {
                                            id:7,
                                            name: '四级 1-2-1-1'
                                        },
                                        {
                                            id:8,
                                            name: '四级 1-2-1-2'
                                        }
                                    ]
                                },
                                {
                                    id:9,
                                    name: '三级 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    components: {
        'b-tree': Tree
    }
})
```

### 异步加载

需要使用懒加载进行数据展示时，传入`loading`为 `true` 开启功能，同时也需要设置`load-method`作为异步获取数据函数。

```san loading
import Tree from '@/tree/tree'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-tree data="{{data}}" loading load-method="{{loadData}}"></b-tree>
        </template>
    \`,
    initData () {
        return {
            checkboxOptions: {
                parent: true,
                children: true
            },
            data: [
                {
                    name: '根节点',
                    loading: false
                }
            ],
            loadData(item, callback) {
                setTimeout(() => {
                    const data = [
                        {
                        name: '懒加载数据',
                        loading: false
                        }
                    ]
                    callback(data)
                }, 1000)
            }
        }
    },
    components: {
        'b-tree': Tree
    }
})
```


### 模糊检索

需要使用懒加载进行数据展示时，传入`loading`为 `true` 开启功能，同时也需要设置`load-method`作为异步获取数据函数。

```san loading
import Tree from '@/tree/tree'
import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-input value="{= value =}" ></b-input>
            <b-tree filter-text='{{value}}' filter-method="{{filterMethod}}" data="{{data}}"></b-tree>
        </template>
    \`,
    initData () {
        return {
            value:'',
            filterMethod(value, data){
                return data.name.indexOf(value) !== -1
            },
            data: [
                {
                    name: '一级 1',
                    expanded: true,
                    children: [
                        {
                            name: '二级 1-1',
                            children: [
                                {
                                    name: '三级 1-1-1'
                                },
                                {
                                    disabled:true,
                                    name: '三级 1-1-2'
                                }
                            ]
                        },
                        {
                            name: '二级 1-2',
                            children: [
                                {
                                    name: '三级 1-2-1',
                                    children: [
                                        {
                                            name: '四级 1-2-1-1'
                                        },
                                        {
                                            name: '四级 1-2-1-2'
                                        }
                                    ]
                                },
                                {
                                    name: '三级 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    components: {
        'b-tree': Tree,
        'b-input': Input
    }
})
```

### Tree props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data     |  可嵌套的节点属性的数组，标准 tree 数据  | Array  |  -    |    []   |
| accordion     |  是否支持手风琴效果   |  Boolean    |  -|     false  |
| show-checkbox     | 是否显示多选框	   | Boolean    |  -  |     false  |
| checkbox-options     |  多选配置项，具体配置见下文 | Object    |  -  |     -  |
| loading     | 是否开启懒加载   | Boolean    |  -  |     false  |
| load-method     |  异步加载数据的方法，详见例子 | Function    |  -  |     -  |
| filter-text     |  模糊搜索的关键字 |  String \ Number    |  -  |     ''  |
| filter-method     |  模糊检索的自定义函数   | 	string    |   -  |     -  |
| default-opt     | 各种选中效果的配置项，具体配置见下文   | 	Object    |  -  |   -    |
| class-name      | 给 item-name 附加的 class	| String | - |   -  |
| default-expanded-values | 默认展开的节点的 key 的数组		| Array |	-   |    []   |
| default-checked-values | 默认勾选的节点的 key 的数组		| Array |	-   |    []   |

### Tree methods
| 方法名		      | 说明	    | 参数 |
|---------- |-------- |---------- |
| getCheckedNodes   |  获取被勾选的节点集合	   | - |
| getSelectedNodes   |  获取被选中的节点	集合	   | - |
| getIndeterminateNodes   |  获取半选状态节点集合	   | - |

### data props
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |-------- |
| children     |  子节点属性  |  Array  |  -    |
| name     |  显示文本  |  String  |  -    |
| disabled     |  失效状态  |  Boolean  |  -    |
| checked    |  勾选状态  |  Boolean  |  -    |
| expanded     |  展开状态  |  Boolean  |  -   |
| selected     |  选中状态  |  Boolean  |  -   |

### defaultOpt props
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |-------- |
| childrenKey     |  子节点属性配置项Key值  |  String  |  children    |
| nameKey     |  显示文本配置项Key值  |  String  |  name    |
| idKey     |  数据的唯一标识字段  |  String  |   id    |
| disabledKey     |  失效属性配置项Key值  |  String  |  disabled    |
| checkedKey     |  勾选属性配置项Key值  |  String  |  checked    |
| expandKey     |  展开属性配置项Key值  |  String  |  expand   |
| selectedKey     |  选中属性配置项Key值  |  String  |  selected   |

### checkboxOptions props
| 属性      | 说明    | 类型      | 默认值       |
|---------- |-------- |---------- |-------------  |
| parent      |   勾选时是否级联父级节点 |  Boolean  |  true    |
| children      |  勾选时是否级联子级节点  |  Boolean  |  true    |

### events
| 方法名	      | 说明	    | 参数 |
|---------- |-------- |---------- |
| select     |  当选中节点时触发   |  options【Object】 : <br> `node`:  当前选中的数据 |
| check     |  当勾选/取消节点时触发   |  options【Object】 : <br> `checkedNodes`:  当前全选节点集合<br> `indeterminateNodes`:  当前半选节点集合<br>`checkedAndIndeterminateNodes`:  当前半选节点和全选节点合集<br>`currentNode`:  当前选中节点 |
| expand     |  当展开/收起节点时触发   |  options【Object】 : <br> `node`:  当前选中的数据 |