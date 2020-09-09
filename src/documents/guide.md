# 介绍

`ct-ui`一套为兼容 `ie8+`的基于 [san框架](https://baidu.github.io/san/tutorial/start/) 的`桌面端组件库`

### 开发注意事项
- 所有代码都用`ES6`语法编写，便于打包优化
- 所有文档都用[markdown](https://www.appinn.com/markdown/)格式编写，便于迁移和自动生成文档

### 组件开发规范
- 组件的每个属性需要添加[数据校验](https://baidu.github.io/san/tutorial/data-checking/)
- 全局样式统一管理，并且引用全局变量[`color`、`z-index`、`size`等等]

### 代码提交流程
- 从 [develop](http://git.51baiwang.com/BaiwangFE/ct-ui/tree/develop)   分支为基础拉取新分支开发新组件，分支名举例`release-ggq-table`
- 在本地分支开发完成后在 `ie8+`进行功能测试，测试通过后，提交 `merge_requests`到`develop`分支

### 关于兼容性
经过[流量统计数据](https://tongji.baidu.com/data/browser)可知最近两年`ie8-`的 `ie`版本比例仅占`2.57%`并且还在持续下降中,考虑到此组件库主要面向的是国企、银行、保险公司、或其他类国企公司等有低版本ie兼容要求的项目,`ie8`是必须兼容的，但是对于`ie8-`来说，兼容的代价太高而且收益较小。开发者可以要求甲方用性能相对好的`ie8+`浏览器【即使在`xp`系统上`ie8`浏览器仍可以做到很好的支持】
![avatar](/static/image/browser.jpg)
