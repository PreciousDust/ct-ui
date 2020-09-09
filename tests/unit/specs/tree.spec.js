/**
 * Created by gaoguoqing on 2019/6/22.
 *
 */
import Tree from '@/tree/tree'
import { createComponent } from '../utils'
import { prefix } from '~/utils/common'

const prefixCls = prefix + 'tree'
describe('Tree', () => {
    it('component tree', done => {
        let component = createComponent({
            template: `
                <template>
                    <b-tree s-ref="tree" data="{{data}}"></b-tree>
                </template>
            `
            ,
            initData () {
                return {
                    data: [
                        {
                            name: '一级1'
                        }
                    ]
                }
            },
            components: {
                'b-tree': Tree
            }
        })
        let tree = component.ref('tree')
        expect(tree.el.classList.contains(`${prefixCls}`)).toBe(true)
        setTimeout(() => {
            expect(tree.el.querySelector(`.${prefixCls}-name`).textContent.trim()).toBe('一级1')
            done()
        }, 100)
    })
    
    it('tree props', done => {
        let component = createComponent({
            template: `
                <template>
                    <b-tree
                        show-checkbox
                        default-checked-values='{{defaultCheckedValues}}'
                        default-expanded-values='{{defaultExpandedValues}}'
                        data="{{data}}">
                    </b-tree>
                </template>
            `
            ,
            initData () {
                return {
                    defaultCheckedValues: [4, 7],
                    defaultExpandedValues: [1, 2, 5, 6],
                    data: [
                        {
                            name: '一级1',
                            id: 1,
                            children: [
                                {
                                    name: '二级1-1',
                                    id: 2,
                                    children: [
                                        {
                                            id: 3,
                                            name: '三级1-1-1'
                                        },
                                        {
                                            id: 4,
                                            name: '三级1-1-2'
                                        }
                                    ]
                                },
                                {
                                    name: '二级1-2',
                                    id: 5,
                                    children: [
                                        {
                                            id: 6,
                                            name: '三级1-2-1',
                                            children: [
                                                {
                                                    id: 7,
                                                    name: '四级1-2-1-1'
                                                },
                                                {
                                                    id: 8,
                                                    name: '四级1-2-1-2'
                                                }
                                            ]
                                        },
                                        {
                                            id: 9,
                                            name: '三级1-2-1'
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
        setTimeout(() => {
            expect(component.el.querySelectorAll(`.${prefix}checkbox-checked`).length).toBe(2)
            done()
        }, 100)
    })
    
    it('tree event', done => {
        let component = createComponent({
            template: `
                <template>
                    <b-tree
                        show-checkbox
                        on-check="handleCheck"
                        data="{{data}}">
                    </b-tree>
                </template>
            `
            ,
            initData () {
                return {
                    defaultCheckedValues: [4, 7],
                    defaultExpandedValues: [1, 2, 5, 6],
                    data: [
                        {
                            name: '一级1',
                            id: 1,
                            children: [
                                {
                                    name: '二级1-1',
                                    id: 2,
                                    children: [
                                        {
                                            id: 3,
                                            name: '三级1-1-1'
                                        },
                                        {
                                            id: 4,
                                            name: '三级1-1-2'
                                        }
                                    ]
                                },
                                {
                                    name: '二级1-2',
                                    id: 5,
                                    children: [
                                        {
                                            id: 6,
                                            name: '三级1-2-1',
                                            children: [
                                                {
                                                    id: 7,
                                                    name: '四级1-2-1-1'
                                                },
                                                {
                                                    id: 8,
                                                    name: '四级1-2-1-2'
                                                }
                                            ]
                                        },
                                        {
                                            id: 9,
                                            name: '三级1-2-1'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            handleCheck (options) {
                checkedResult = options
            },
            handleExpand (options) {
                expandResult = options
            },
            components: {
                'b-tree': Tree
            }
        })
        let checkedResult
        setTimeout(() => {
            component.el.querySelectorAll(`.${prefix}checkbox-input`)[0].click()
            expect(checkedResult.currentNode.name).toBe('一级1')
            expect(checkedResult.checkedNodes.length).toBe(9)
            done()
        }, 100)
    })
})
