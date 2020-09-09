# Tabs 标签页

***警告：TabPane 组件请勿包裹于*** `div` ***等块级元素中，其唯一父元素为 Tabs。***

```san 基础用法
import Tabs from '@/tabs/tabs'
import TabPane from '@/tabs/tab-pane'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-tabs>
                <b-tab-pane label="用户管理">窗前明月光</b-tab-pane>
                <b-tab-pane label="系统管理">疑是地上霜</b-tab-pane>
                <b-tab-pane label="角色管理">举头望明月</b-tab-pane>
                <b-tab-pane label="统计管理">低头思故乡</b-tab-pane>
            </b-tabs>
        </div>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-tabs': Tabs,
        'b-tab-pane': TabPane
    },
})
```


```san 禁用选项
import Tabs from '@/tabs/tabs'
import TabPane from '@/tabs/tab-pane'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-tabs>
                <b-tab-pane label="用户管理">窗前明月光</b-tab-pane>
                <b-tab-pane disabled label="系统管理">疑是地上霜</b-tab-pane>
                <b-tab-pane label="角色管理">举头望明月</b-tab-pane>
                <b-tab-pane label="统计管理">低头思故乡</b-tab-pane>
            </b-tabs>
        </div>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-tabs': Tabs,
        'b-tab-pane': TabPane
    },
})
```


```san 设置初始选定值
import Tabs from '@/tabs/tabs'
import TabPane from '@/tabs/tab-pane'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-tabs current="{{2}}">
                <b-tab-pane label="用户管理">窗前明月光</b-tab-pane>
                <b-tab-pane label="系统管理">疑是地上霜</b-tab-pane>
                <b-tab-pane label="角色管理">举头望明月</b-tab-pane>
                <b-tab-pane label="统计管理">低头思故乡</b-tab-pane>
            </b-tabs>
        </div>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-tabs': Tabs,
        'b-tab-pane': TabPane
    },
})
```

```san 自定义图标
import Tabs from '@/tabs/tabs'
import TabPane from '@/tabs/tab-pane'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-tabs>
                <b-tab-pane icon="yonghuguanli" label="用户管理">窗前明月光</b-tab-pane>
                <b-tab-pane icon="xitongguanli" label="系统管理">疑是地上霜</b-tab-pane>
                <b-tab-pane icon="jiaoseguanli" label="角色管理">举头望明月</b-tab-pane>
                <b-tab-pane icon="tongjibaobiao" label="统计管理">低头思故乡</b-tab-pane>
            </b-tabs>
        </div>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-tabs': Tabs,
        'b-tab-pane': TabPane
    },
})
```

```san 多级嵌套
import Tabs from '@/tabs/tabs'
import TabPane from '@/tabs/tab-pane'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-tabs>
                <b-tab-pane label="用户管理">
                    <b-tabs current="{{2}}">
                        <b-tab-pane label="用户管理">窗前明月光</b-tab-pane>
                        <b-tab-pane label="系统管理">疑是地上霜</b-tab-pane>
                        <b-tab-pane label="角色管理">举头望明月</b-tab-pane>
                        <b-tab-pane label="统计管理">
                            <b-tabs current="{{1}}">
                                <b-tab-pane label="用户管理">窗前明月光</b-tab-pane>
                                <b-tab-pane label="系统管理">疑是地上霜</b-tab-pane>
                                <b-tab-pane label="角色管理">举头望明月</b-tab-pane>
                                <b-tab-pane label="统计管理">低头思故乡</b-tab-pane>
                            </b-tabs>
                        </b-tab-pane>
                    </b-tabs>
                </b-tab-pane>
                <b-tab-pane label="系统管理">疑是地上霜</b-tab-pane>
                <b-tab-pane label="角色管理">举头望明月</b-tab-pane>
                <b-tab-pane label="统计管理">低头思故乡</b-tab-pane>
            </b-tabs>
        </div>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-tabs': Tabs,
        'b-tab-pane': TabPane
    },
})
```

### Tabs Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| current | Number | 当前选中，从 0 开始计数 | `0` |
 
### TabPane Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| label | String | 名称 |
| disabled | Boolean | 是否禁用 | `false` |
| icon | String | 图标，参考 Icon 组件 |
