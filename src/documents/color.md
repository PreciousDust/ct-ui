# 概述
推荐使用以下调色板的颜色作为设计和开发规范，以保证页面和组件之间的视觉一致。

### 主色
使用较为安全的蓝色作为主色调，其中 LightPrimary 常用于 hover，DarkPrimary 常用于 active。
```san 主色
import Icon from '@/icon/icon'
import colorShow from '&/components/colorShow'

module.exports = san.defineComponent({
    template: \`
        <template>
            <color-show type = "LightPrimary"></color-show>
            <color-show type = "Primary"></color-show>
            <color-show type = "DarkPrimary"></color-show>
        </template>
    \`,
    components: {
        'color-show': colorShow
    }
})
```

### 辅助色
辅助色是具有代表性的颜色，常用于信息提示，比如成功、警告和失败。
```san 辅助色
import Icon from '@/icon/icon'
import colorShow from '&/components/colorShow'

module.exports = san.defineComponent({
    template: \`
        <template>
            <color-show type = "Info"></color-show>
            <color-show type = "Success"></color-show>
            <color-show type = "Warning"></color-show>
            <color-show type = "Error"></color-show>
            <color-show type = "Badge"></color-show>
        </template>
    \`,
    components: {
        'color-show': colorShow
    }
})
```

### 中性色
中性色常用于文本、背景、边框、阴影等，可以体现出页面的层次结构。
```san 中性色
import Icon from '@/icon/icon'
import colorShow from '&/components/colorShow'

module.exports = san.defineComponent({
    template: \`
        <template>
            <color-show type = "Background" color="black"></color-show>
            <color-show type = "Sub"></color-show>
            <color-show type = "Disabled" color="black"></color-show>
            <color-show type = "Border" color="black"></color-show>
            <color-show type = "Divider" color="black"></color-show>
            <color-show type = "Title"></color-show>
            <color-show type = "Content"></color-show>
            <color-show type = "SubContent"></color-show>
            <color-show type = "DisContent" color="black"></color-show>
            <color-show type = "LinkContent"></color-show>
        </template>
    \`,
    components: {
        'color-show': colorShow
    }
})
```