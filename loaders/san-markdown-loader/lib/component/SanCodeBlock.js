import san from 'san'

module.exports = san.defineComponent({
    template: `
        <div class="code-warp">
            <h4
                class="code-title"
                on-click="toggleSource">
                <label>{{title}}</label>
            </h4>
            <div class="code-content">
                <slot />
            </div>
            <div class="code-show" style="{{sourceStyle}}">
                <pre><code class="html">{{_content}}</code></pre>
            </div>
        </div>
    `,
    initData () {
        return {
            expanded: false
        }
    },
    toggleSource () {
        let expanded = this.data.get('expanded')
        this.data.set('expanded', !expanded)
    },
    computed: {
        sourceStyle () {
            let expanded = this.data.get('expanded')
            return {
                'height': expanded ? 'auto' : '0',
                'overflow': 'hidden'
            }
        },
        _content () {
            if (this.data.get('content')) {
                // return _.unescape(this.data.get('content').replace('/\\/g', ''))
                return decodeURIComponent(this.data.get('content').replace('/\\/g', ''))
                .replace(/&#x7B;/g, '{')
                .replace(/&#x7D;/g, '}')
            } else {
                return ''
            }
        }
    }
})
