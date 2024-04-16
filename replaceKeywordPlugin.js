export default function replaceKeywordPlugin() {
    return {
        name: 'replace-keyword',
        enforce: 'pre',
        transform(src, id) {
            // src：未转化之前的源码
            // id：模块名。vue
            // 关键点：自己的插件在官方的编译插件运行之前先执行
            if (id.endsWith('.vue')) {
                return {
                    code: src.replace(/Vue/g, 'React'), // 返回转化后的源码
                }
            }
        }
    }
}