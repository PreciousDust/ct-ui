/**
 * Created by gaoguoqing on 2019/6/20.
 *
 */
import Collapse from '@/collapse/collapse'
import CollapseItem from '@/collapse/collapse-item'
import { createComponent } from '../utils'
import { prefix } from '~/utils/common'

const prefixCls = prefix + 'collapse'
describe('Collapse', () => {
    it('collapse component', done => {
        let component = createComponent({
            template: `
                <template>
                    <b-collapse value="{{values}}">
                        <b-collapse-item s-ref="item" name='one'>
                            <span slot="title">Title1</span>
                            <div slot="content">Content1</div>
                        </b-collapse-item>
                        <b-collapse-item>
                            <span slot="title">Title2</span>
                            <div slot="content">This is Content2</div>
                        </b-collapse-item>
                        <b-collapse-item>
                            <span slot="title">Title3</span>
                            <div slot="content">This is Content3</div>
                        </b-collapse-item>
                        <b-collapse-item>
                            <span slot="title">Title4</span>
                            <div slot="content">This is Content4</div>
                        </b-collapse-item>
                    </b-collapse>
                </template>
            `,
            initData () {
                return {
                    values: ['one', 2]
                }
            },
            components: {
                'b-collapse': Collapse,
                'b-collapse-item': CollapseItem
            }
        })
        let item = component.ref('item')
        expect(item.slot('title')[0].children[0].el.textContent.trim()).toBe('Title1')
        setTimeout(() => {
            expect(item.el.classList.contains(`${prefixCls}-item-opened`)).toBe(true)
            done()
        }, 100)
    })
    
    it('collapse && collapseItem props', done => {
        let component = createComponent({
            template: `
                <template>
                    <div>
                        <b-collapse s-ref="left" position="left" value="1">
                            <b-collapse-item>
                                <span slot="title">This is Title1</span>
                                <div slot="content">This is Content1</div>
                            </b-collapse-item>
                            <b-collapse-item>
                                <span slot="title">This is Title2</span>
                                <div slot="content">This is Content2</div>
                            </b-collapse-item>
                        </b-collapse>
                        <b-collapse s-ref="right" position="right" value="1">
                            <b-collapse-item>
                                <span slot="title">This is Title1</span>
                                <div slot="content">This is Content1</div>
                            </b-collapse-item>
                            <b-collapse-item>
                                <span slot="title">This is Title2</span>
                                <div slot="content">This is Content2</div>
                            </b-collapse-item>
                        </b-collapse>
                        <b-collapse s-ref="hidden" position="hidden" value="1">
                            <b-collapse-item>
                                <span slot="title">This is Title1</span>
                                <div slot="content">This is Content1</div>
                            </b-collapse-item>
                            <b-collapse-item>
                                <span slot="title">This is Title2</span>
                                <div slot="content">This is Content2</div>
                            </b-collapse-item>
                        </b-collapse>
                        <b-collapse value="1">
                            <b-collapse-item s-ref="itemHidden" hideArrow>
                                <span slot="title">This is Title1</span>
                                <div slot="content">This is Content1</div>
                            </b-collapse-item>
                            <b-collapse-item>
                                <span slot="title">This is Title2</span>
                                <div slot="content">This is Content2</div>
                            </b-collapse-item>
                        </b-collapse>
                        <b-collapse s-ref="simple" simple value="1">
                            <b-collapse-item>
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
            `,
            initData () {
                return {
                    values: ['one', 2]
                }
            },
            components: {
                'b-collapse': Collapse,
                'b-collapse-item': CollapseItem
            }
        })
        let left = component.ref('left')
        let right = component.ref('right')
        let hidden = component.ref('hidden')
        let itemHidden = component.ref('itemHidden')
        let simple = component.ref('simple')
        expect(simple.el.classList.contains(`${prefixCls}-simple`)).toBe(true)
        setTimeout(() => {
            expect(left.el.querySelector(`.${prefixCls}-item-arrow-left`)).toBeTruthy()
            expect(right.el.querySelector(`.${prefixCls}-item-arrow-right`)).toBeTruthy()
            expect(hidden.el.querySelector(`.${prefixCls}-item-arrow`)).toBeNull()
            expect(itemHidden.el.querySelector(`.${prefixCls}-item-arrow`)).toBeNull()
            done()
        }, 100)
    })
    
    it('collapse && collapseItem event', () => {
        let component = createComponent({
            template: `
                <template>
                    <b-collapse on-change="handleChange" value="{{values}}">
                        <b-collapse-item s-ref="item" name='one'>
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
            `,
            initData () {
                return {
                    values:['one',2]
                }
            },
            handleChange (data) {
                changeResult = data
            },
            components: {
                'b-collapse': Collapse,
                'b-collapse-item': CollapseItem
            }
        })
        let changeResult
        let item = component.ref('item')
        item.el.querySelectorAll(`.${prefixCls}-item-header`)[0].click()
        expect(changeResult.currentName).toBe('one')
        expect(changeResult.openedNames.length).toBe(1)
    })
})
