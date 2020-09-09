/**
 * Created by gaoguoqing on 2019/6/20.
 *
 */
import Menu from '@/menu/menu'
import MenuItem from '@/menu/menu-item'
import Submenu from '@/menu/submenu'
import { createComponent } from '../utils'
import { prefix } from '~/utils/common'

const prefixCls = prefix + 'menu'
describe('Menu', () => {
    it('component menu', () => {
        let component = createComponent({
            template: `
                <template>
                    <b-menu>
                        <b-submenu s-ref="submenu" name="1">
                            <template slot="title">
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
                                标题2
                            </template>
                            <b-menu-item san-ref="item" name="2-1">
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
            `
            ,
            components: {
                'b-menu': Menu,
                'b-menu-item': MenuItem,
                'b-submenu': Submenu
            }
        })
        
        let submenu = component.ref('submenu')
        let item = component.ref('item')
        expect(submenu.el.querySelector(`.${prefixCls}-submenu-title`).textContent.trim()).toBe('标题1')
        expect(item.el.textContent.trim()).toBe('内容2-1')
    })
    it('Menu && MenuItem props', done => {
        let component = createComponent({
            template: `
                <template>
                    <b-menu
                        mode="horizontal"
                        theme="dark"
                        open-names="{{openNames}}"
                        active-name="{{activeName}}">
                        <b-submenu s-ref="submenu" name="1">
                            <template slot="title">
                                标题1
                            </template>
                            <b-menu-item san-ref="item" name="1-1">
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
                                标题2
                            </template>
                            <b-menu-item name="2-1">
                                内容2-1
                            </b-menu-item>
                            <b-menu-item san-ref="disabledItem" disabled name="2-2">
                                内容2-2
                            </b-menu-item>
                            <b-menu-item name="2-3">
                                内容2-3
                            </b-menu-item>
                        </b-submenu>
                    </b-menu>
                </template>
            `
            ,
            initData () {
                return {
                    activeName: '1-1',
                    openNames: ['1']
                }
            },
            components: {
                'b-menu': Menu,
                'b-menu-item': MenuItem,
                'b-submenu': Submenu
            }
        })
        let submenu = component.ref('submenu')
        let item = component.ref('item')
        let disabledItem = component.ref('disabledItem')
        let root = submenu.parentComponent
        expect(root.el.classList.contains(`${prefixCls}-horizontal`)).toBe(true)
        expect(root.el.classList.contains(`${prefixCls}-dark`)).toBe(true)
        expect(disabledItem.el.classList.contains(`${prefixCls}-item-disabled`)).toBe(true)
        setTimeout(() => {
            expect(submenu.el.classList.contains(`${prefixCls}-submenu-opened`)).toBe(true)
            expect(item.el.classList.contains(`${prefixCls}-item-active`)).toBe(true)
            done()
        }, 100)
    })
    
    it('Menu && MenuItem event', () => {
        let component = createComponent({
            template: `
                <template>
                    <b-menu on-select="handleSelect" on-open-change="handleOpened">
                        <b-submenu s-ref="submenu" name="1">
                            <template slot="title">
                                标题1
                            </template>
                            <b-menu-item san-ref="item" name="1-1">
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
            `
            ,
            initData () {
                return {
                    activeName: '1-1',
                    openNames: ['1']
                }
            },
            handleSelect (data) {
                clickResult = data
            },
            handleOpened (options) {
                openedResult = options
            },
            components: {
                'b-menu': Menu,
                'b-menu-item': MenuItem,
                'b-submenu': Submenu
            }
        })
        let clickResult
        let openedResult
        let submenu = component.ref('submenu')
        let item = component.ref('item')
        submenu.el.querySelectorAll(`.${prefixCls}-submenu-title`)[0].click()
        item.el.click()
        expect(clickResult).toBe('1-1')
        expect(openedResult.currentName).toBe('1')
        expect(openedResult.openedNames.length).toBe(1)
    })
})
