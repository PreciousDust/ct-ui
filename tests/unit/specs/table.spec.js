/**
 * Created by gaoguoqing on 2019/6/22.
 *
 */
import Table from '@/table/table'
import { createComponent } from '../utils'
import { prefix } from '~/utils/common'

const prefixCls = prefix + 'table'
describe('Table', () => {
    it('component table', () => {
        let component = createComponent({
            template: `
                <template>
                    <b-table s-ref="table" columns="{{columns}}" data="{{data}}"></b-table>
                </template>
            `,
            initData () {
                return {
                    data: [
                        {
                            name: '欧阳',
                            age: 12,
                            sex: '男'
                        },
                        {
                            name: '青蛙',
                            age: 18,
                            sex: '男'
                        },
                        {
                            name: '警长',
                            age: 28,
                            sex: '男'
                        }
                    ],
                    columns: [
                        {
                            title: 'Name',
                            key: 'name'
                        },
                        {
                            title: 'Age',
                            key: 'age'
                        },
                        {
                            title: 'Sex',
                            key: 'sex'
                        }
                    ]
                }
            },
            components: {
                'b-table': Table
            }
        })
        let table = component.ref('table')
        expect(table.el.classList.contains(`${prefixCls}`)).toBe(true)
        expect(table.el.querySelector(`.${prefixCls}-body`)).toBeTruthy()
        expect(table.el.querySelector(`.${prefixCls}-header`)).toBeTruthy()
    })
    
    it('table props', done => {
        let component = createComponent({
            template: `
                <template>
                    <b-table
                        width="1000"
                        border
                        stripe
                        height="150"
                        s-ref="table"
                        columns="{{columns}}"
                        data="{{data}}">
                    </b-table>
                </template>
            `,
            initData () {
                return {
                    data: [
                        {
                            name: '欧阳',
                            age: 12,
                            sex: '男'
                        },
                        {
                            name: '青蛙',
                            age: 18,
                            sex: '男'
                        },
                        {
                            name: '警长',
                            age: 28,
                            sex: '男'
                        }
                    ],
                    columns: [
                        {
                            fixed: 'left',
                            title: 'Name',
                            key: 'name'
                        },
                        {
                            type: 'selection',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: 'Age',
                            sortable: true,
                            key: 'age'
                        },
                        {
                            title: 'Sex',
                            key: 'sex',
                            fixed: 'right'
                        }
                    ]
                }
            },
            components: {
                'b-table': Table
            }
        })
        let table = component.ref('table')
        expect(table.el.classList.contains(`${prefixCls}-border`)).toBe(true)
        expect(table.el.classList.contains(`${prefixCls}-stripe`)).toBe(true)
        expect(table.el.style.width).toBe('1000px')
        expect(table.el.style.height).toBe('150px')
        setTimeout(() => {
            expect(table.el.querySelector(`.${prefixCls}-fixed-left`)).toBeTruthy()
            expect(table.el.querySelector(`.${prefixCls}-fixed-right`)).toBeTruthy()
            expect(table.el.querySelector(`.${prefixCls}-sort`)).toBeTruthy()
            expect(table.el.querySelector(`.${prefix}checkbox-warpper`)).toBeTruthy()
            
            done()
        }, 200)
    })
})
