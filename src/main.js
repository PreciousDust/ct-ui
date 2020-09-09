/**
 * Created by gaoguoqing on 2019/5/7.
 *
 */
import san from 'san'
import './utils/compatible'
import Nav from './components/nav'
import '&/assists/scss/index.scss'
import '~/styles/index.scss'

window.san = san
let MyApp = san.defineComponent({
    template: `
         <div class="wrap">
            <div class="header" s-ref="header">头部预留
                <span class="icon iconfont icon-shang"></span>
            </div>
            <div class="content">
                <div class="side">
                    <b-nav></b-nav>
                </div>
                <div class="content-wrap">
                    <div class="content-inner">
                        <div id="route"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    components: {
        'b-nav': Nav
    }
})
let myApp = new MyApp()
window.onload = () => {
    myApp.attach(document.body)
    require('./route')
}
