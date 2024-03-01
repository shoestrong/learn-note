# 检测页面全局变量脚本

由于不同的流量器宿主全局方法并不一样，但同一个浏览器的不内window实例一定是一样的，所以我们可以构建一个临时的iframe，里面的window对象是干净无污染的，只要拿topwindow和这个iframeWindow中的变量进行对比，就行。如果是用户不小心抛出去的全局变量，一定是可写可读的，不可能是用Object.Object.defineProperty搞出来的只读的常量。

``` js
/**
 * 检测页面全局变量脚本
 */
;(function (topWindow, document) {
    var iframeWindow
    var whiteList = []
    var ret = []
    function checkGlobalVar () {
        var iframe = document.createElement('iframe'), i, originValue
        document.body.appendChild(iframe)
        iframeWindow = iframe.contentWindow
        for (i in topWindow) {
            if (!(i in iframeWindow) && !~whiteList.indexOf(i)) {
                originValue = topWindow[i]
                topWindow[i] = '耗子么么哒' // 写一个不可能是系统预设的值
                if (topWindow[i] === '耗子么么哒') {
                iframeWindow.console.info(i) // 防止重写了 topWindow 的 console
                ret.push(i)
                }
                topWindow[i] = originValue
            }
        }
        iframeWindow.console.warn('共找到' + ret.length + '个全局变量')
        document.body.removeChild(iframe) // 干完坏事会死灭迹
        iframeWindow = null
    }
    setTimeout(function () {
        if (!document.body) {
            alert('页面还没加载完！')
            return
        }
        checkGlobalVar()
    }, 1000)
})(top, document)
```
复制一下代码到控制台

```
javascript:eval(decodeURIComponent('!function(n%2Ce)%7Bvar%20o%2Ct%3D%5B%5D%2Ci%3D%5B%5D%3BsetTimeout(function()%7Be.body%3Ffunction()%7Bvar%20d%2Cl%2Cc%3De.createElement(%22iframe%22)%3Be.body.appendChild(c)%2Co%3Dc.contentWindow%3Bfor(d%20in%20n)d%20in%20o%7C%7C~t.indexOf(d)%7C%7C(l%3Dn%5Bd%5D%2Cn%5Bd%5D%3D%22%E8%80%97%E5%AD%90%E4%B9%88%E4%B9%88%E5%93%92%22%2C%22%E8%80%97%E5%AD%90%E4%B9%88%E4%B9%88%E5%93%92%22%3D%3D%3Dn%5Bd%5D%26%26(o.console.dir(d)%2Ci.push(d))%2Cn%5Bd%5D%3Dl)%3Bo.console.warn(%22%E5%85%B1%E6%89%BE%E5%88%B0%22%2Bi.length%2B%22%E4%B8%AA%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%22)%2Ce.body.removeChild(c)%2Co%3Dnull%7D()%3Aalert(%22%E9%A1%B5%E9%9D%A2%E8%BF%98%E6%B2%A1%E5%8A%A0%E8%BD%BD%E5%AE%8C%EF%BC%81%22)%7D%2C1e3)%7D(top%2Cdocument)%3B'))
```
