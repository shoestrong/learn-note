# 获取url参数转化为对象

``` js
/**
 * getUrlQuery
 * 获取url参数转化为对象
 * @param {string} url
 * @returns * 对象的健和值
 */
let getUrlQuery = (url) => {
    if (!/^(https?:\/\/)/.test(url)) {
        throw new Error('Error: Not a correct URL');
    }
    if (url && url.indexOf('?') > -1) {
        var arr = url.split('?');
        var qs = arr[1],
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    }
    return {};
}
```