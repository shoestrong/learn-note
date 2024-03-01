# 发布订阅模式

``` js
class EventEmitter {
  constructor() {
    this.events = {}
  }
  // 存储事件队列
  on(type, fn) {
    if (this.events[type]) {
      this.events[type].push(fn)
    } else {
      this.events[type] = [fn]
    }
  }
  // 触发事件 可带参数
  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(fn => {
        fn.apply(this, args)
      });
    }
  }
  // 删除队列中的事件
  off(type, fn) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter(event => {
        return event !== fn
      })
    }
  }
  // 只执行一次
  once(type, cb) {
    function fn() {
      cb()
      this.off(type, fn)
    }
    this.on(type, fn)
  }
}

const et = new EventEmitter()

function fn1(pramas) { console.log('fn1-' + pramas); }
function fn2() { console.log('fn2'); }
function fn3() { console.log('fn3'); }

et.on('fn1', fn1)
et.off('fn2', fn2)
et.once('fn3', fn3)

et.emit('fn1', 'args')
et.emit('fn2')
et.emit('fn3')
et.emit('fn3')
et.emit('fn3')

// 输出结果为：
// fn1-args
// fn3
```