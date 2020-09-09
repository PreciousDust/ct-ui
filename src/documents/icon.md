# Icon 图标
所有图标均来自公司内部[icon库](http://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=402308&keyword=)

### 基础用法
使用`type`属性来定义 `icon` 的类型

```san type
import Icon from '@/icon/icon'

module.exports = san.defineComponent({
    template: \`
    <template>
        <b-icon type="juanshi"></b-icon>
        <b-icon type="biaoqian"></b-icon>

    </template>
    \`,
    components: {
        'b-icon': Icon
    }
})
```
### 不同尺寸
可以在不同场景下选择合适的按钮尺寸。 通过设置`size`属性来配置它们。

```san size

import Icon from '@/icon/icon'

module.exports = san.defineComponent({
    template: \`
    <template>
        <b-icon type="juanshi" size=12></b-icon>
        <b-icon type="juanshi" size=40></b-icon>
    </template>
    \`,
    components: {
        'b-icon': Icon
    }
})
```
### 颜色选择
通过设置`color`属性来配置不同的颜色。

```san color
import Icon from '@/icon/icon'

module.exports = san.defineComponent({
    template: \`
    <template>
        <b-icon type="juanshi" color="red"></b-icon>
        <b-icon type="juanshi" color="#fff000"></b-icon>
    </template>
    \`,
    components: {
        'b-icon': Icon
    }
})
```


### 所有图标列表

```san 列表
import Icon from '@/icon/icon'
import IconList from '&/utils/icon.json'

module.exports = san.defineComponent({
    template: \`
    <template>
        <ul class="icon-list">
            <li s-for="item in iconList">
                <b-icon type="{{item.className}}" size=24></b-icon>
                <div class="name">{{item.name}}</div>
                <div class="fontclass">{{item.className}}</div>
            </li>
        </ul>
    </template>
    \`,
    initData () {
        return {
            iconList:IconList
        }
    },
    components: {
        'b-icon': Icon
    }
})
```