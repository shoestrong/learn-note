# 时间戳格式化

``` js
/**
 * timestampFormat
 * 时间戳格式化
 * @param {*} [times=+new Date()]   * 默认为当天时间戳
 * @param {string} [format='yyyy-MM-dd hh:mm:ss']   * 默认yyyy-MM-dd hh:mm:ss
 *        y:年 M:月 d:日 h:小时 m:分钟 s:秒 q:季 S:毫秒   
 * @returns * 2018-07-06 22:21:26
 */
export let timestampFormat = (times = +new Date(), format = 'yyyy-MM-dd hh:mm:ss') => {
    if ((typeof times === 'string') || (times.toString().length !== 13)) {
        throw new Error('Error: The first parameter is not a number or does not satisfy 13 digits');
    }
    var newDate = new Date(times);
    var date = {
        'M+': newDate.getMonth() + 1,
        'd+': newDate.getDate(),
        'h+': newDate.getHours(),
        'm+': newDate.getMinutes(),
        's+': newDate.getSeconds(),
        'q+': Math.floor((newDate.getMonth() + 3) / 3),
        'S+': newDate.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
        }
    }
    return format;
}
```