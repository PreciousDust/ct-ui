# menu 树形控件

### 基础用法
```san 基础用法
import Menu from '@/menu/menu'
import MenuItem from '@/menu/menu-item'
import Submenu from '@/menu/submenu'
import Icon from '@/icon/icon'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-menu>
                <b-submenu name="1">
                    <template slot="title">
                        <b-icon type="biaoqian"></b-icon>
                        标题1
                    </template>
                    <b-menu-item name="1-1">
                        内容1-1
                    </b-menu-item>
                    <b-menu-item name="1-2">
                        内容1-2
                    </b-menu-item>
                    <b-menu-item name="1-3">
                        内容1-3
                    </b-menu-item>
                </b-submenu>
                <b-submenu name="2">
                    <template slot="title">
                        <b-icon type="yunguiji"></b-icon>
                        标题2
                    </template>
                    <b-menu-item name="2-1">
                        内容2-1
                    </b-menu-item>
                    <b-menu-item name="2-2">
                        内容2-2
                    </b-menu-item>
                    <b-menu-item name="2-3">
                        内容2-3
                    </b-menu-item>
                </b-submenu>
            </b-menu>
        </template>
    \`,
    components: {
        'b-menu': Menu,
        'b-submenu': Submenu,
        'b-icon': Icon,
        'b-menu-item': MenuItem
    }
})
```

### 禁用
给`menu-item`传入`disabled`可以设置禁用属性
```san 禁用
import Menu from '@/menu/menu'
import MenuItem from '@/menu/menu-item'
import Submenu from '@/menu/submenu'
import Icon from '@/icon/icon'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-menu>
                <b-submenu name="1">
                    <template slot="title">
                        <b-icon type="biaoqian"></b-icon>
                        标题1
                    </template>
                    <b-menu-item disabled name="1-1">
                        内容1-1
                    </b-menu-item>
                    <b-menu-item name="1-2">
                        内容1-2
                    </b-menu-item>
                    <b-menu-item name="1-3">
                        内容1-3
                    </b-menu-item>
                </b-submenu>
                <b-submenu name="2">
                    <template slot="title">
                        <b-icon type="yunguiji"></b-icon>
                        标题2
                    </template>
                    <b-menu-item disabled name="2-1">
                        内容2-1
                    </b-menu-item>
                    <b-menu-item name="2-2">
                        内容2-2
                    </b-menu-item>
                    <b-menu-item name="2-3">
                        内容2-3
                    </b-menu-item>
                </b-submenu>
            </b-menu>
        </template>
    \`,
    initData () {
        return {
            openNames:['1']
        }
    },
    components: {
        'b-menu': Menu,
        'b-submenu': Submenu,
        'b-icon': Icon,
        'b-menu-item': MenuItem
    }
})
```

### 手风琴效果
设置accordion开启手风琴效果
```san 手风琴效果
import Menu from '@/menu/menu'
import MenuItem from '@/menu/menu-item'
import Submenu from '@/menu/submenu'
import Icon from '@/icon/icon'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-menu accordion>
                <b-submenu name='1'>
                    <template slot="title">
                        <b-icon type="yunguiji"></b-icon>
                        标题1
                    </template>
                    <b-menu-item name="1-1">
                        内容1-1
                    </b-menu-item>
                    <b-menu-item name="1-2">
                        内容1-2
                    </b-menu-item>
                </b-submenu>
                <b-submenu name='2'>
                    <template slot="title">
                        <b-icon type="biaoqian"></b-icon>
                        标题2
                    </template>
                    <b-menu-item name="2-1">
                        内容2-1
                    </b-menu-item>
                    <b-menu-item name="2-2">
                        内容2-2
                    </b-menu-item>
                    <b-menu-item name="2-3">
                        内容2-3
                    </b-menu-item>
                </b-submenu>
            </b-menu>
        </template>
    \`,
    components: {
        'b-menu': Menu,
        'b-icon': Icon,
        'b-submenu': Submenu,
        'b-menu-item': MenuItem
    }
})
```

### 水平布局

```san 基础用法
import Menu from '@/menu/menu'
import MenuItem from '@/menu/menu-item'
import Submenu from '@/menu/submenu'
import Icon from '@/icon/icon'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-menu accordion mode="horizontal">
                <b-submenu name="1">
                    <template slot="title">
                        <b-icon type="biaoqian"></b-icon>
                        标题1
                    </template>
                    <b-menu-item name="1-1">
                        下拉内容1-1
                    </b-menu-item>
                    <b-menu-item name="1-2">
                        下拉内容1-2
                    </b-menu-item>
                </b-submenu>
                <b-submenu name="2">
                    <template slot="title">
                        <b-icon type="yunguiji"></b-icon>
                        标题2
                    </template>
                    <b-menu-item name="2-1">
                        下拉内容2-1
                    </b-menu-item>
                    <b-menu-item name="2-2">
                        下拉内容2-2
                    </b-menu-item>
                </b-submenu>
            </b-menu>
        </template>
    \`,
    initData () {
        return {
            openNames:['1']
        }
    },
    components: {
        'b-menu': Menu,
        'b-submenu': Submenu,
        'b-icon': Icon,
        'b-menu-item': MenuItem
    }
})
```

### 切换主题
更改属性`theme`来切换主题

```san 切换主题
import Menu from '@/menu/menu'
import MenuItem from '@/menu/menu-item'
import Submenu from '@/menu/submenu'
import radio from '@/radio/radio'
import Icon from '@/icon/icon'

module.exports = san.defineComponent({
    template: \`
        <template>
            <span>切换主题：</span>
            <b-radio name='s' value='light' checked='{= checked =}'>light</b-radio>
            <b-radio name='s' value='dark' checked='{= checked =}'>dark</b-radio>
            <b-menu theme="{{checked}}">
                <b-submenu name="1">
                    <template slot="title">
                        <b-icon type="biaoqian"></b-icon>
                        标题1
                    </template>
                    <b-menu-item name="1-1">
                        内容1-1
                    </b-menu-item>
                    <b-menu-item name="1-2">
                        内容1-2
                    </b-menu-item>
                    <b-submenu name="3">
                        <template slot="title">
                            <b-icon type="linggou"></b-icon>
                            标题1
                        </template>
                        <b-menu-item name="3-1">
                            内容1-1
                        </b-menu-item>
                        <b-menu-item name="3-2">
                            内容1-2
                        </b-menu-item>
                        <b-menu-item name="3-3">
                            内容1-3
                        </b-menu-item>
                    </b-submenu>
                </b-submenu>
                <b-submenu name="2">
                    <template slot="title">
                        <b-icon type="yunguiji"></b-icon>
                        标题2
                    </template>
                    <b-menu-item name="2-1">
                        内容2-1
                    </b-menu-item>
                    <b-menu-item name="2-2">
                        内容2-2
                    </b-menu-item>
                    <b-menu-item name="2-3">
                        内容2-3
                    </b-menu-item>
                </b-submenu>
            </b-menu>
        </template>
    \`,
    initData () {
        return {
            checked:'light'
        }
    },
    components: {
        'b-radio': radio,
        'b-menu': Menu,
        'b-icon': Icon,
        'b-submenu': Submenu,
        'b-menu-item': MenuItem
    }
})
```

### 默认展开和选中
设置`openNames`和`activeName`，展示默认展开和选中效果
```san 默认展开和选中
import Menu from '@/menu/menu'
import MenuItem from '@/menu/menu-item'
import Submenu from '@/menu/submenu'
import Icon from '@/icon/icon'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-menu active-name="{{activeName}}" open-names="{{openNames}}">
                <b-submenu name='1'>
                    <template slot="title">
                        <b-icon type="yunguiji"></b-icon>
                        标题1
                    </template>
                    <b-menu-item name="1-1">
                        内容1-1
                    </b-menu-item>
                    <b-menu-item name="1-2">
                        内容1-2
                    </b-menu-item>
                </b-submenu>
                <b-submenu name='2'>
                    <template slot="title">
                        <b-icon type="biaoqian"></b-icon>
                        标题2
                    </template>
                    <b-menu-item name="2-1">
                        内容2-1
                    </b-menu-item>
                    <b-menu-item name="2-2">
                        内容2-2
                    </b-menu-item>
                    <b-menu-item name="2-3">
                        内容2-3
                    </b-menu-item>
                </b-submenu>
            </b-menu>
        </template>
    \`,
    initData () {
        return {
            openNames:['1','2'],
            activeName:'1-1'
        }
    },
    components: {
        'b-menu': Menu,
        'b-icon': Icon,
        'b-submenu': Submenu,
        'b-menu-item': MenuItem
    }
})
```

### 展开方式
设置`trigger`调整展开方式
```san 展开方式
import Menu from '@/menu/menu'
import MenuItem from '@/menu/menu-item'
import Submenu from '@/menu/submenu'
import Icon from '@/icon/icon'
import radio from '@/radio/radio'

module.exports = san.defineComponent({
    template: \`
        <template>
            <span>切换展开方式：</span>
            <b-radio name='trigger' value='hover' checked='{= trigger =}'>hover</b-radio>
            <b-radio name='trigger' value='click' checked='{= trigger =}'>click</b-radio>
            <b-menu accordion trigger="{{trigger}}">
                <b-submenu name='1'>
                    <template slot="title">
                        <b-icon type="yunguiji"></b-icon>
                        标题1
                    </template>
                    <b-menu-item name="1-1">
                        内容1-1
                    </b-menu-item>
                    <b-menu-item name="1-2">
                        内容1-2
                    </b-menu-item>
                </b-submenu>
                <b-submenu name='2'>
                    <template slot="title">
                        <b-icon type="biaoqian"></b-icon>
                        标题2
                    </template>
                    <b-menu-item name="2-1">
                        内容2-1
                    </b-menu-item>
                    <b-menu-item name="2-2">
                        内容2-2
                    </b-menu-item>
                    <b-menu-item name="2-3">
                        内容2-3
                    </b-menu-item>
                </b-submenu>
            </b-menu>
        </template>
    \`,
    initData () {
        return {
            trigger:'click'
        }
    },
    components: {
        'b-menu': Menu,
        'b-icon': Icon,
        'b-radio': radio,
        'b-submenu': Submenu,
        'b-menu-item': MenuItem
    }
})
```

### 路由模式
设置`route`开启路由模式,在`menu-item`传入`to`属性设置目标路由
```san 路由模式
import Menu from '@/menu/menu'
import MenuItem from '@/menu/menu-item'
import Submenu from '@/menu/submenu'
import Icon from '@/icon/icon'
import radio from '@/radio/radio'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-menu open-names="{{openNames}}" route accordion>
                <b-submenu name='1'>
                    <template slot="title">
                        <b-icon type="yunguiji"></b-icon>
                        路由列表1
                    </template>
                    <b-menu-item to="tree" name="1-1">
                        tree
                    </b-menu-item>
                    <b-menu-item to="table" name="1-2">
                        table
                    </b-menu-item>
                </b-submenu>
                <b-submenu name='2'>
                    <template slot="title">
                        <b-icon type="biaoqian"></b-icon>
                        路由列表2
                    </template>
                    <b-menu-item to="select" name="2-1">
                        select
                    </b-menu-item>
                    <b-menu-item to="input" name="2-2">
                        input
                    </b-menu-item>
                    <b-menu-item to="tabs" name="2-3">
                        tabs
                    </b-menu-item>
                </b-submenu>
            </b-menu>
        </template>
    \`,
    initData () {
    	return {
            openNames:['1','2']
    	}
    },
    components: {
        'b-menu': Menu,
        'b-icon': Icon,
        'b-submenu': Submenu,
        'b-menu-item': MenuItem
    }
})
```



### Menu props
| 参数      | 说明    | 类型      | 默认值   |
|---------- |-------- |---------- |------------- |-------- |
| mode     |  菜单类型，可选值为 `horizontal` 和 `vertical`  | String  |    `vertical`   |
| theme     |  主题，可选值为 `light`、`dark`  | String  |    `light`   |
| active-name	  |  激活菜单的 `name` 值	  | String / Number  |    -  |
| open-names  |  展开的 `Submenu` 的 `name` 集合	 | Array  |   []  |
| accordion |  是否开启手风琴模式	 | Boolean  |   false |
| width |  导航菜单的宽度，只在 `mode="vertical"` 时有效	 | String  |   `240px` |
| route |  是否开启路由模式	 | Boolean  |   false |
| trigger |  子菜单打开的触发方式，可选值为 `hover`和 `click`	 |  String  |   `click` |

### MenuItem props
| 参数      | 说明    | 类型      | 默认值   |
|---------- |-------- |---------- |------------- |-------- |
| name     |  菜单项的唯一标识，必填 | String / Number  |   -   |
| disabled     |  是否禁用 |  Boolean  |   -   |
| to     |  当开启 `route` 模式后，设置路由目标 |  Boolean  |   -   |

### Submenu props
| 参数      | 说明    | 类型      | 默认值   |
|---------- |-------- |---------- |------------- |-------- |
| name     |  菜单项的唯一标识，必填 | String / Number  |   -   |

### Submenu slot
| 属性      | 说明    |
| ---------- | -------- |
| title     |  标题  |

### Menu events
| 方法名	      | 说明	    | 参数 |
|---------- |-------- |---------- |
| on-select    |  当前选中的节点  |  `name`: 当前选中的数据 |
| on-open-change   |  当 展开/收起 子菜单时触发	  |  `openedNames`: 展开菜单`name` 集合<br>`currentName`: 当前展开菜单的`name` |
