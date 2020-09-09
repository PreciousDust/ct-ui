# Collapse 折叠面板

可折叠收纳面板内容


### 基础用法
通过`value`设置默认展开项，
可通过子组件的 `name` 或 `index`确定展开项

```san 基础用法
import Collapse from '@/collapse/collapse'
import CollapseItem from '@/collapse/collapse-item'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-collapse value="{{values}}">
                <b-collapse-item name='one'>
                    <span slot="title">This is Title1</span>
                    <div slot="content">This is Content1</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title2</span>
                    <div slot="content">This is Content2</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title3</span>
                    <div slot="content">This is Content3</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title4</span>
                    <div slot="content">This is Content4</div>
                </b-collapse-item>
            </b-collapse>
        </template>
    \`,
    initData () {
        return {
            values:['one',2]
        }
    },
    components: {
        'b-collapse': Collapse,
        'b-collapse-item': CollapseItem
    }
})
```

### 手风琴
通过`value`设置默认展开项，
可通过子组件的 `name` 或 `index`确定展开项

```san 手风琴
import Collapse from '@/collapse/collapse'
import CollapseItem from '@/collapse/collapse-item'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-collapse accordion value="2">
                <b-collapse-item>
                    <span slot="title">This is Title1</span>
                    <div slot="content">This is Content1</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title2</span>
                    <div slot="content">This is Content2</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title3</span>
                    <div slot="content">This is Content3</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title4</span>
                    <div slot="content">This is Content4</div>
                </b-collapse-item>
            </b-collapse>
        </template>
    \`,
    components: {
        'b-collapse': Collapse,
        'b-collapse-item': CollapseItem
    }
})
```

### 箭头位置
通过`postions`设置箭头位置，默认为`left`

通过`hideArrow`设置子组件的箭头是否显示

```san 箭头位置
import Collapse from '@/collapse/collapse'
import CollapseItem from '@/collapse/collapse-item'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div>
                <b-collapse position="left" value="1">
                    <b-collapse-item>
                        <span slot="title">This is Title1</span>
                        <div slot="content">This is Content1</div>
                    </b-collapse-item>
                    <b-collapse-item>
                        <span slot="title">This is Title2</span>
                        <div slot="content">This is Content2</div>
                    </b-collapse-item>
                </b-collapse>
                <b-collapse style="margin-top: 10px" position="right" value="1">
                    <b-collapse-item>
                        <span slot="title">This is Title1</span>
                        <div slot="content">This is Content1</div>
                    </b-collapse-item>
                    <b-collapse-item>
                        <span slot="title">This is Title2</span>
                        <div slot="content">This is Content2</div>
                    </b-collapse-item>
                </b-collapse>
                <b-collapse style="margin-top: 10px" position="hidden" value="1">
                    <b-collapse-item>
                        <span slot="title">This is Title1</span>
                        <div slot="content">This is Content1</div>
                    </b-collapse-item>
                    <b-collapse-item>
                        <span slot="title">This is Title2</span>
                        <div slot="content">This is Content2</div>
                    </b-collapse-item>
                </b-collapse>
                <b-collapse style="margin-top: 10px" value="1">
                    <b-collapse-item hideArrow>
                        <span slot="title">This is Title1</span>
                        <div slot="content">This is Content1</div>
                    </b-collapse-item>
                    <b-collapse-item>
                        <span slot="title">This is Title2</span>
                        <div slot="content">This is Content2</div>
                    </b-collapse-item>
                </b-collapse>
            </div>
        </template>
    \`,
    components: {
        'b-collapse': Collapse,
        'b-collapse-item': CollapseItem
    }
})
```

### 面板嵌套
折叠面板可以进行嵌套。

```san 面板嵌套
import Collapse from '@/collapse/collapse'
import CollapseItem from '@/collapse/collapse-item'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-collapse value="2">
                <b-collapse-item>
                    <span slot="title">This is Title1</span>
                    <div slot="content">This is Content1</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title2</span>
                    <div slot="content">
                        <b-collapse accordion value="4">
                            <b-collapse-item>
                                <span slot="title">This is Title1</span>
                                <div slot="content">This is Content1</div>
                            </b-collapse-item>
                            <b-collapse-item>
                                <span slot="title">This is Title2</span>
                                <div slot="content">This is Content2</div>
                            </b-collapse-item>
                            <b-collapse-item>
                                <span slot="title">This is Title3</span>
                                <div slot="content">This is Content3</div>
                            </b-collapse-item>
                            <b-collapse-item>
                                <span slot="title">This is Title4</span>
                                <div slot="content">This is Content4</div>
                            </b-collapse-item>
                        </b-collapse>
                    </div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title3</span>
                    <div slot="content">This is Content3</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title4</span>
                    <div slot="content">This is Content4</div>
                </b-collapse-item>
            </b-collapse>
        </template>
    \`,
    components: {
        'b-collapse': Collapse,
        'b-collapse-item': CollapseItem
    }
})
```

### 简洁模式
simple 属性来开启简洁模式

```san 简洁模式
import Collapse from '@/collapse/collapse'
import CollapseItem from '@/collapse/collapse-item'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-collapse simple value="4">
                <b-collapse-item>
                    <span slot="title">This is Title1</span>
                    <div slot="content">This is Content1</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title2</span>
                    <div slot="content">This is Content2</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title3</span>
                    <div slot="content">This is Content3</div>
                </b-collapse-item>
                <b-collapse-item>
                    <span slot="title">This is Title4</span>
                    <div slot="content">This is Content4</div>
                </b-collapse-item>
            </b-collapse>
        </template>
    \`,
    components: {
        'b-collapse': Collapse,
        'b-collapse-item': CollapseItem
    }
})
```

### Collapse props
| 参数      | 说明    | 类型      | 默认值   |
|---------- |-------- |---------- |------------- |-------- |
| value     |  当前展开的面板的 `name`或`index`      | String  |   -   |
| accordion     |  是否开启手风琴模式  | Boolean  |   false  |
| simple     |  是否开启简洁模式      | Boolean  |   false   |
| position    |  箭头方向，可选值为`left`、 `right`、`hidden`      |  String  |   `left`   |

### CollapseItem props
| 参数      | 说明    | 类型      | 默认值   |
|---------- |-------- |---------- |------------- |-------- |
| name     |  当前面板的 name，与 Collapse的value对应，不填为索引值    | String  |   `index`   |
| hide-arrow   |  隐藏箭头 |  Boolean  |    false   |

### CollapseItem slot
| 属性      | 说明    |
| ---------- | -------- |
| title     |  标题  |
| content     |   描述内容  |

### Collapse events
| 方法名          | 说明        | 参数 |
|---------- |-------- |---------- |
| on-change    |  当 展开/收起面板时触发  |`openedNames`: 展开菜单`name` 集合<br>`currentName`: 当前展开菜单的`name`|
