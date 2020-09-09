# Breadcrumb 面包屑
```san 基础用法
import Breadcrumb from '@/breadcrumb/breadcrumb'
import BreadcrumbItem  from '@/breadcrumb/breadcrumb-item'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-breadcrumb>
                <b-breadcrumb-item>首页</b-breadcrumb-item>
                <b-breadcrumb-item>系统管理</b-breadcrumb-item>
                <b-breadcrumb-item>角色管理</b-breadcrumb-item>
            </b-breadcrumb>
        </div>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-breadcrumb': Breadcrumb,
        'b-breadcrumb-item': BreadcrumbItem,
    },
})
```

```san 配合 san-router 使用
import Breadcrumb from '@/breadcrumb/breadcrumb'
import BreadcrumbItem  from '@/breadcrumb/breadcrumb-item'
const { Link } = require('san-router')

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-breadcrumb>
                <b-breadcrumb-item>
                    <b-router-link to="/guide">首页</b-router-link>
                </b-breadcrumb-item>
                <b-breadcrumb-item>
                    <b-router-link to="/datepicker">系统管理</b-router-link>
                </b-breadcrumb-item>
                <b-breadcrumb-item>角色管理</b-breadcrumb-item>
            </b-breadcrumb>
        </div>
    \`,
    components: {
        'b-breadcrumb': Breadcrumb,
        'b-breadcrumb-item': BreadcrumbItem,
        'b-router-link': Link
    },
})
```

```san 分隔符
import Breadcrumb from '@/breadcrumb/breadcrumb'
import BreadcrumbItem  from '@/breadcrumb/breadcrumb-item'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-breadcrumb separator="|">
                <b-breadcrumb-item>首页</b-breadcrumb-item>
                <b-breadcrumb-item>系统管理</b-breadcrumb-item>
                <b-breadcrumb-item>角色管理</b-breadcrumb-item>
            </b-breadcrumb>
        </div>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-breadcrumb': Breadcrumb,
        'b-breadcrumb-item': BreadcrumbItem
    },
})
```



### Breadcrumb Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| separator | String、Element String | 自定义分隔符 | `/` |
