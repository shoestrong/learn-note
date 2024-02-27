# Regular Expression 正则表达式

> Regular Expression 处理字符串的一种规则。简称RegExp

[[toc]]

## 创建方式

1. 字面量创建（两个斜杆包起来）

```js:line-numbers
const reg = /\d+/
```

2. 构造函数创建（使用`new`的方式，字符串形式）

```js:line-numbers
// 字符串中直接`\d`是输出的d,因此需要使用`\`转义一下
const reg = new RegExp('\\d+')
```

## 正则表达式的组成

### 1. 元字符

1. 量词元字符：设置出现的次数

| 元字符 | 含义 |
| :----: | :----: |
| * | 0到多次 |
| + | 1到多次 |
| ? | 0到1次 |
| \{n\} | n次 |
| \{n,\} | n到多次 |
| \{n,m\} | n到m次 |

2. 特殊元字符：单个或者组合在一起代表特殊的含义

| 元字符 | 含义 |
| :----: | :----: |
| \ | 转义字符 |
| . | 除\n（换行符）之外的任意字符 |
| ^ | 以哪一个元字符开头 |
| $ | 以哪一个元字符结尾 |
| \n | 软回车（换行符） |
| \r | 软空格（一般和\n一起用，代表回车键） |
| \d | 0-9 之间的一个数字 |
| \D | 除 0-9 之间的一个数字 |
| \w | 数字、字母、下划线中的任意一个字符 |
| \s | 一个空白字符（包含空格、制表符、换页符） |
| \t | 一个制表符（一个 TAB 键，四个空格） |
| \b | 匹配一个单词的边界 |
| x|y | x 或 y 中的一个字符 |
| [xyz] | x 或 y 或 z 中的一个字符 |
| [^xy] | 除了 x 和 y 以外的任意一个字符 |
| [a-z] | 指定 a-z 这个范围的任意字符 |
| [^a-z] | 上一个的取反“非” |
| () | 正则中的分组符号 |
| (?\:) | 只匹配不捕获 |
| (?=) | 正向预查 |
| (?!) | 反向预查 |

3. 普通元字符：匹配本身

`/name/`此正则就是去匹配字符串中的`'name'`

### 2. 修饰符

| 修饰符 | 含义 |
| :----: | :----: |
| i(ignoreCase) | 忽略大小写匹配 |
| m(multiline) | 可以进行多行匹配 |
| g(global) | 全局匹配 |
| u(Unicode) | 用来正确处理大于\uFFF 的 Unicode 字符 |
| y(sticky) | 粘连 |
| s(dotAll) | 让'.'能匹配任意字符，包含\n\r |

## 常用元字符

1. ^ $

- ^ 以什么元字符开始
- $ 以什么元字符结尾
- ^/$ 两个都不加匹配的是：字符串中包含符合规则的内容即可
- ^/$ 两个都加匹配的是：字符串只能是和规则一致的内容

```js:line-numbers
// 匹配的是：以数字开头的字符串
const reg = /^\d/
console.log(reg.test('name'))   // false
console.log(reg.test('2020name'))  // true
console.log(reg.test('name2020'))   //false
```
```js:line-numbers
// 匹配的是：以数字结尾的字符串
const reg = /\d$/
console.log(reg.test('name')) // false
console.log(reg.test('2020name'))  // false
console.log(reg.test('name2020'))  //true
```
```js:line-numbers
// ^/$ 两个都不加匹配的是：字符串中包含符合规则的内容即可
const reg1 = /\d/
console.log(reg1.test('as2')) // true

// ^/$ 两个都加匹配的是：字符串只能是和规则一致的内容
const reg2 = /^\d$/console.log(reg2.test('as2')) // false
console.log(reg2.test('22')) // false
console.log(reg2.test('2')) // true
```

2. \ 转义字符

```js:line-numbers
// '.' 是代表除换行符之外的任意字符，而不是小数点
const reg = /^2.3$/
console.log(reg.test('2.3')) // true
console.log(reg.test('2@3')) // true
console.log(reg.test('23')) // false

// 现在我们把‘.’变为一个普通的小数点（使用到的就是\）
const reg = /^2\.3$/
console.log(reg.test('2.3')) // true
console.log(reg.test('2@3')) // false
```

3. x|y x 或 y，如果有小括号，优先级最高

```js:line-numbers
// 匹配的是：以18开头或者以29结尾的都可以,以1开头以9结尾，8或2都可以，所以不加括号怎么理解都可以
const reg = /^18|29$/
console.log(reg.test('18'))
console.log(reg.test('29'))
console.log(reg.test('129'))
console.log(reg.test('189'))
console.log(reg.test('1829'))
console.log(reg.test('182'))
// 匹配结果都为 true

// 如果加上括号，意义就不一样了
const reg = /^(18|29)$/
console.log(reg.test('18'))
console.log(reg.test('29'))
console.log(reg.test('129'))
console.log(reg.test('189'))
// 匹配的是：18或者29中的一个，其余都是 false
```

4. []

- 中括号中出现的字符「一般」都代表它本身的含义
- \d 在中括号里面的含义仍然是 0-9，这个没有消磁
- [18]：代表的是 1 或者 8 中的任意一个
- [10-29]：代表的是 1 或者 9 或者 0-2

```js:line-numbers
// 下面的'.'就是小数点的意思
const reg = /^[.]+$/
console.log(reg.test('.....')) // true

// 匹配的含义是：只能是@或者+的
const reg = /^[@+]$/
console.log(reg.test('@')) // true
console.log(reg.test('+')) // true
console.log(reg.test('@@')) // false
console.log(reg.test('@+')) // false

// 匹配的含义是：\d还是代表0-9
const reg = /^[\d]$/
console.log(reg.test('9')) // true
console.log(reg.test('\\')) // false
console.log(reg.test('d')) // false

// 匹配的含义是：1或者8
const reg = /^[18]$/
console.log(reg.test('1')) // true
console.log(reg.test('8')) // true
console.log(reg.test('18')) // false

// 匹配的含义是：1或者0-2或者9
const reg = /^[10-29]$/
console.log(reg.test('1')) // true
console.log(reg.test('2')) // true
console.log(reg.test('3')) // false

// 匹配的含义是：1或者0-2或者9或'('或')'
const reg = /^[(10-29)]$/
console.log(reg.test('1')) // true
console.log(reg.test('3')) // false
console.log(reg.test('(')) // true

```

5. {n,m} 从n到m出现次数的匹配

```js:line-numbers
const reg = /\d{2,4}/
reg.test('1')  // false
reg.test('14') // true
reg.test('123456') // true 为什么这个也能匹配到？因为没有加入^ $

const reg = /^\d{2,4}$/
reg.test('123456') // false
```

6. 分组作用

- 改变优先级

```js:line-numbers
// 提升优先级，reg1可以匹配的比reg2的多
const reg1 = /^18|29$/
const reg2 = /^(18|29)$/
```

- 分组捕获

```js:line-numbers
// 身份证号匹配
// 使用exec捕获的时候，不仅可以得到整个大正则的结果，也会分别拿到每一个分组内的
const reg = /^([1-9]\d{5})((19|20)\d{2})(0[1-9]|10|11|12)(0[1-9]|[1-2]\d|30|31)\d{3}(\d|x)$/i

console.log(reg.exec('11023419960111162x')) // ['110234199601111621', '110234', '1996', '19', '01', '11', 'x']
```

- 分组引用

```js:line-numbers
// 第一位是a-z的字母，分组1；第二位也是a-z的字母，分组2；第三位\2是和第二个分组出现一模一样的内容...
const reg = /^([a-z])([a-z]\1)$/
console.log(reg.test('wsw')) // true
console.log(reg.test('wssw')) // false
```

7. ?<名字> 分组别名

```js:line-numbers
const str = '132123201203200000'
const reg = /^(?<Area>[1-9]\d{5})(?<Year>(19|20)\d{2})(?<Month>0[1-9]|10|11|12)(?<Date>0[1-9]|[1-2]\d|30|31)\d{3}(\d|x)$/i
const res = reg.exec(str)
console.log(res) // ['132123201203200000', '132123', '2012', '20', '03', '20', '0']
// res prototype上的值 { index: 0, input: '132123201203200000', groups: { "Area": "132123", "Year": "2012", "Month": "03", "Date": "20" }, length: 7 }
console.log(res.groups.Year) // 2012
```

8. 问号在正则中的五大作用

- 1. 问号左边是非量词元字符：本身代表量词元字符，出现0或1次，类似于{0,1}；
```js:line-numbers
const reg = /abc(d)?/
console.log(reg.test('abc')) // true
console.log(reg.test('abcd')) // true
```
- 2. 问号左边是量词元字符：取消捕获时候的贪婪性，或者叫非贪婪匹配；
```js:line-numbers
const str = 'aaaacaaaaaaac'
console.log(str.match(/\S+c/)) // ['aaaacaaaaaaac']
console.log(str.match(/\S+?c/)) // ['aaaac']
```
- 3. (?:)：只匹配不捕获；
```js:line-numbers
const str = 'aaaabbbccc'
const reg1 = /(a+)(b*)c/
const reg2 = /(a+)(?:b*)c/
console.log(reg1.test(str)) // true
console.log(str.match(reg1)) // [ "aaaabbbc", "aaaa", "bbb" ] 捕获的字符串会被缓存起来以供后续使用
console.log(reg2.test(str)) // true
console.log(str.match(reg2)) // [ "aaaabbbc", "aaaa" ] 捕获的字符串不会被缓存下来
```
- 4. 断言

|||
|:--|:--|
|(?=pattern)|非获取匹配，正向肯定预查，在任何匹配pattern的字符串开始处匹配查找字符串，该匹配不需要获取供以后使用|
|(?!pattern)|非获取匹配，正向否定预查，在任何不匹配pattern的字符串开始处匹配查找字符串，该匹配不需要获取供以后使用。|
|(?<=pattern)|非获取匹配，反向肯定预查，与正向肯定预查类似，只是方向相反。|
|(?<!patte_n)|非获取匹配，反向否定预查，与正向否定预查类似，只是方向相反。|

?=pattern和?<=pattern分别表示匹配断言成立时左侧和右侧的文本
```js:line-numbers
const reg1 = /test(?=123)/
const reg2 = /(?<=123)test/
console.log(reg1.exec('test123')) // test
console.log(reg1.exec('test122')) // null
console.log(reg2.exec('123test')) // test
console.log(reg2.exec('12test')) // null
```
对于?!pattern和?<!pattern可以看成是上面两个表达式的取反
```js:line-numbers
const reg1 = /test(?!123)/
const reg2 = /(?<!123)test/
console.log(reg1.exec('test123')) // null
console.log(reg1.exec('test122')) // test
console.log(reg2.exec('123test')) // null
console.log(reg2.exec('12test')) // test
```

## 常用的正则表达式

### 1. 验证手机号
11 位数字；第一位是数字 1；第二位是数字 3-9 中的任意一位
::: code-group
```js:line-numbers{1} [checkPhone.js]
const reg = /^1[3-9]\d{9}$/
console.log(reg.test('13245678945')) // true
console.log(reg.test('1324567895'))  // false
console.log(reg.test('12245678945'))  // false
```
:::

### 2. 验证是否为有效数字
开头可以有+ -；如果是一位数可以是 0-9 任意数；如果是多位数，首位不可以是 0；如果有小数位，那么小数位后面至少有一位数字，也可以没有小数位
::: code-group
```js:line-numbers{1} [checkValidNumber.js]
const reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?$/
console.log(reg.test('0.2')) // true
console.log(reg.test('02.1'))  // false
console.log(reg.test('20.'))  // false
```
:::

### 3. 验证密码
6-16 为组成；必须由数字、大小写字母组成
::: code-group
```js:line-numbers{1} [checkPassword.js]
const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\d(a-z)(A-Z)]{6,16}$/
console.log(reg.test('233Abcd')) // true
console.log(reg.test('2_3abcd')) // false
```
:::

### 4. 验证真实姓名
必须是汉字；名字长度 2-10 位；可能有译名：·汉字
::: code-group
```js:line-numbers{2} [checkRealName.js]
// 匹配汉字，速记：有事100 有酒罚我
const reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10})?$/
console.log(reg.test('张三')) // true
console.log(reg.test('海伦·凯勒')) // true
```
:::

### 5. 验证邮箱
邮箱的名字以‘数字字母下划线-.’几部分组成，但是-/.不能连续出现也不能作为开头 \w+((-\w+)|(.\w+))*;@ 后面可以加数字字母，可以出现多位 @[A-Za-z0-9]+ ;对@后面名字的补充：多域名 .com.cn ;企业域名 (.|-)[A-Za-z0-9]+)*；.com/.cn 等域名 .[A-Za-z0-9]+
::: code-group
```js:line-numbers{1} [checkEmail.js]
const reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
console.log(reg.test('abc@gmail.com')) // true
```
:::

### 6. 验证身份证号
18 位；最后一位是数字或者 X；前 6 位是省市县；后四位是年；后两位是月 01-12；后两位是日 01-31；最后四位；最后一位：X 或者数字；倒数第二位：偶数：女 奇数：男
::: code-group
```js:line-numbers{1} [checkIDCard.js]
const reg = /^([1-9]\d{5})((19|20)\d{2})(0[1-9]|10|11|12)(0[1-9]|[1-2]\d|30|31)\d{3}(\d|x)$/i;
console.log(reg.test('132123201203200000')) // true
```
:::

## 正则方法

- 正则 `RegExp.prototype` 上的方法（exec、test）
- 字符串 `String.prototype` 上支持正则表达式处理的方法（replace、match、search、matchAll...）

### 1. 正则exec方法

有两个性质：懒惰性和贪婪性

#### a. 懒惰性：默认只捕获一个

- 捕获到的结果是 null 或一个 数组
  - 第一项：本次捕获到的内容
  - 其余项：对应小分组本次单独循环的内容
  - index：当前捕获内容在字符串中的起始索引
  - input：原始字符串
- 每执行一次 exec，只能捕获到一个符合正则规则的，但是默认情况下，我们执行一百次，获取的结果永远都是第一个匹配到的，其余的都捕获不到

```js:line-numbers
const str = 'name2020name2021name2022'
const reg = /\d+/
console.log(reg.exec(str)) // ["2020"]
```

#### b. 懒惰性的解决方法

reg.lastIndex：当前正则下一次匹配的起始索引位置

「原因：」 默认情况下lastIndex的值不会被修改，每一次都是从字符串开始位置查找，所以找到的永远都是第一个。因此只要把lastIndex值改变，就可以解决这个问题

「解决方法：」 设置全局修饰符g

```js:line-numbers
const str = 'name2020name2021name2022'
const reg1 = /\d+/
const reg2 = /\d+/g
console.log(reg1.exec(str)) // ['2020']
console.log(reg1.exec(str)) // ['2020']
console.log(reg1.exec(str)) // ['2020']

console.log(reg2.exec(str)) // ['2020']
console.log(reg2.exec(str)) // ['2021']
console.log(reg2.exec(str)) // ['2022']
```

#### c. 封装解决正则懒惰性的方法

```js:line-numbers
RegExp.prototype.execAll = function (str = '') {
  if (!this.global) return this.exec(str);
  const ary = [];
  let res = this.exec(str);
  while(res){
    ary.push(res[0]);
    res = this.exec(str);
  }
  return  ary.length ===0?null:ary;
}

const reg = /\d+/g
console.log(reg.execAll('name2020name2021')) // [ "2020", "2021" ]
```

### 2. 字符串match方法

#### a. 贪婪性

匹配的最长结果来获取

```js:line-numbers
const reg = /\d+/g
console.log('name2020'.match(reg)) // ['2020']
```

#### b. 解决贪婪性问题

在量词元字符后面设置?取消捕获时候的贪婪性，匹配的最短结果来获取

```js:line-numbers
const reg = /\d+?/g
console.log('name2020'.match(reg)) // ['2', '0', '2', '0']
```

#### c. 与exec匹配结果相同，没有加g
```js:line-numbers
// 身份证号
const str = '130222195202303210'
const reg = /^([1-9]\d{5})((19|20)\d{2})(0[1-9]|10|11|12)(0[1-9]|[1-2]\d|30|31)\d{3}(\d|x)$/i
console.log(reg.exec(str))
console.log(str.match(reg))
// 输出结果都为 ["130222195202303210", "130222", "1952", "19", "02", "30", "0", index: 0, input: "130222195202303210", groups: undefined]
```

#### d. 与exec的差异性

- 字符串中的match方法可以在执行一次的情况下，捕获到所有匹配的数据（前提正则也得设置g才可以）
- 加g之后，match不能获取到小分组内的东西

```js:line-numbers
const reg = /\d+/g
console.log('name2020name2021'.match(reg)) // ['2020', '2021']
console.log(reg.exec('name2020name2021')) // ['2020']
```
```js:line-numbers
const str = '{0}年{1}月'
const reg = /\{(\d)\}/g
console.log(reg.exec(str))  // ['{0}', '0']
console.log(str.match(reg)) // ['{0}', '{1}']
```

### 3. 字符串replace方法

字符串替换 str.replace(reg, func)
- 首先会拿reg和func去进行匹配，匹配捕获一次，就会把func函数执行一次
- 并且会把每一次捕获的结果（和exec捕获的结果一样）传递给func函数
- 在func函数中返回return什么，就相当于把原始字符中,大正则匹配的结果替换成啥

```js:line-numbers
const str = '2024-02-09'
console.log(str.replace(/-/g, '/')) // 2024/02/09
```

```js:line-numbers
const str = '{0}年{1}月'
const reg = /\{(\d)\}/g
const newStr = str.replace(reg, (...args) => {
  console.log(args) // 第一次输出 ["{0}","0",0,"{0}年{1}月"]; 第二次输出 ["{1}","1",0,"{0}年{1}月"]
  return 1
})
console.log(newStr) // 1年1月
```

## 正则方法应用场景

### 1. 时间格式字符串

月日不足十位补零；换成年月日的格式
::: code-group
```js:line-numbers{2} [方法一]
let time = '2024-2-9'
let arr = time.match(/\d+/g)
arr = arr.map(item => item.length < 2 ? '0'+item : item)

time = `${arr[0]}年${arr[1]}月${arr[2]}日`
console.log(time) // 2024年02月09日
```
```js:line-numbers{2,6} [方法二]
let time = '2024-2-9'
let arr = time.match(/\d+/g)
arr = arr.map(item => item.length < 2 ? '0'+item : item)

let template = '{0}年{1}月{2}日';
template = template.replace(/\{(\d+)\}/g, (value, group) => {
  return arr[group]; // 返回啥就是把 template中大正则本次匹配的结果替换成啥
})
console.log(template)  // 2024年02月09日
```
:::

### 2. 获取URL中的传参信息（可能也包含HASH值）
::: code-group
```js:line-numbers{3,4} [queryURLParams.js]
String.prototype.queryURLParams = function () {
  let obj = {} // 哈希值值的处理 
  this.replace(/#([^?=#&]+)/g, (_, group) => obj['HASH'] = group) // 问号传参信息的处理 
  this.replace(/([^?#=&]+)=([^?#=&]+)/g, (_, group1, group2) => {  
    obj[group1] = group2 
  }) 
  return obj
}
let str = 'http://www.baidu.cn/?lx=1&from=weixin&name=xxx#video';
let obj = str.queryURLParams()
console.log(obj) // { "HASH": "video", "lx": "1", "from": "weixin", "name": "xxx" }
```
:::

### 3. millimeter：实现千分符处理
::: code-group
```js:line-numbers{2} [millimeter.js]
String.prototype.millimeter = function() { 
  return this.replace(/\d{1,3}(?=(\d{3})+$)/g, value => {
    return value + ','
  })
}
let str = "2312345638"
str = str.millimeter()
console.log(str) // 2,312,345,638
```
:::
