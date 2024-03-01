# 连字符分隔转化驼峰

``` js
/**
 * camelize 连字符分隔转化驼峰，符号-或者_
 * @params:String str: 要转化的字符串
 * @return:String 转化为的字符串
 */
export const camelize = (str)=> {
    return str.replace(/(-|_)\w/g, _ => _ ? _.substr(1).toUpperCase() : '');
}
```