import san from 'san'
import { prefix } from '../../utils/common'
import Icon from '../icon/icon'

const prefixCls = prefix + 'option-group'

module.exports = san.defineComponent({
    template: `
        <div>
            11
        </div>
    `,
    initData () {
        return {
            prefixCls
        }
    },
    components: {
        'b-icon': Icon
    },
    computed: {

    }
})
