/**
 * Created by gaoguoqing on 2019/5/23.
 *
 */
import menu from '../route/menu'
import san from 'san'

var sanRouter = require('san-router')
var router = sanRouter.router
module.exports = san.defineComponent({
    template: `
     <div class="nav">
        <div s-for="title in menuList" class="nav-container">
            <p class="nav-title">{{title}}</p>
            <div
                s-for="nav in data[title]"
                class="nav-items">
                <p class="nav-group">
                    <a href="#/{{nav.name}}" class="{{hash === nav.name ? ' active' : ''}}">{{nav.name}}</a>
                </p>
                <!--<div s-for="item in nav.items" :key="item.name">-->
                    <!--<p-->
                        <!--class="nav-component">{{item.name}}-->
                    <!--</p>-->
                <!--</div>-->
            </div>
        </div>
    </div>
    `,
    initData () {
        return {
            data: menu,
            hash: ''
        }
    },
    attached () {
        router.listen((e, config) => {
            this.data.set('hash', window.location.hash.substring(2))
        })
    },
    computed: {
        menuList () {
            return Object.keys(this.data.get('data'))
        }
    }
})
