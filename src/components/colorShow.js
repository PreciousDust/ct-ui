/**
 * Created by gaoguoqing on 2019/6/12.
 *
 */
import san from 'san'

module.exports = san.defineComponent({
    template: `
     <div style="{{backgroundStyle}}" class="b-color-box">
        <div class="b-color-body">
            <div class="b-color-name" style="{{fontColor}}">{{type}}</div>
            <div class="b-color-desc" style="{{fontColor}}">{{colorName}}</div>
        </div>
    </div>
    `,
    initData () {
        return {
            colorObj: {
                'LightPrimary': '52b7fc',
                'Primary': '0079CC',
                'DarkPrimary': '00558f',
                'Info': '0079CC',
                'Success': '1fca74',
                'Warning': 'ff8f00',
                'Error': 'f44336',
                'Badge': 'ff5722',
                'Background': 'f8f8f9',
                'Sub': '80848f',
                'Disabled': 'e8e8e8',
                'Border': 'dddee1',
                'Divider': 'e9eaec',
                'Title': '1c2438',
                'Content': '495060',
                'SubContent': '9ea7b4',
                'DisContent': 'bbbbbb',
                'LinkContent': '0079cc'
            }
        }
    },
    computed: {
        backgroundStyle () {
            let type = this.data.get('type')
            let colorObj = this.data.get('colorObj')
            return {
                background: '#' + colorObj[type]
            }
        },
        colorName () {
            let type = this.data.get('type')
            let colorObj = this.data.get('colorObj')
            return '#' + colorObj[type]
        },
        fontColor () {
            return {
                color: this.data.get('color')
            }
        }
    }
})
