# Base 基本使用

## 目录

- [赋值](#赋值)
- [Boolean值](#user-content-boolean值)
- [switch 中容易被忽视的细节](#user-content-switch-中容易被忽视的细节)


## 赋值

或表达式赋值

> 表达式左边的值，若是空或是 `undefined` 等情况，则使用右边的内容进行赋值

```js
function(p){
    var param = p || {a:1};
}
//等效于
function(p){
    var param;
    if(!p) param = {a:1};
}
```

与表达式赋值

> 表达式左边的值非空时，使用右边的值进行赋值

```js
function(p){
    var param = p && {a:1};
}
//等效于
function(p){
    var param;
    if(p) param = {a:1};
}
```


## Boolean值

我们经常需要使用 `boolean` 类型的变量对程序状态进行控制或判断，除去原生 `boolean` 类型的 `true` 和 `false` 之外，还有很多其它类型的数据值，也可以作为 `boolean` 的结果进行判断

0, -0, null, "", undefined 或 NaN 等数据值，在判断时，与 `false` 等效

非 0 或 -0 的数字值，非空的字符串，包含 "true" 和 "false"的内容，与 `true` 等效


## `switch` 中容易被忽视的细节

通常我们使用条件判断是使用 `if` ，但如果需要判断的情况较多，或是对每一个枚举的值都需要做不同处理，就会用到 `switch` 语句，不同条件执行不同代码块，首先来看一段代码

```js
var num = '5';
switch(num){
    case 5:
        console.log('result is ' + num);
        break;
    default:
        console.log('this is default branch');
}
//this is default branch
```

执行的代码块好像和期待的结果不一样，代码走到了 `default` 分支。使用 `if` 语句来试试

```js
var num = '5';
if(num == 5)
    console.log('match');
else
    console.log('no match');
//match
```

使用 `if` 判断结果是正确的！那么，使用严格比较

```js
var num = '5';
if(num === 5)
    console.log('match');
else
    console.log('no match');
//no match
```

这里的结果就和 `switch` 的结果一致了，说明 `switch` 中对于判断是使用的严格判断，那么修改 `switch` 中的判断条件，结果就满足期望了

```js
var num = '5';
switch(num){
    case '5':
        console.log('result is ' + num);
        break;
    default:
        console.log('this is default branch');
}
//result is 5
```

