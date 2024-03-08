# Javascript 事件处理

``` js
Event = {
    //页面加载完成后
    readyEvent: function(fn) {
        if (fn === null) {
            fn = document;
        }
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = fn;
        } else {
            window.onload = function() {
                oldonload();
                fn();
            };
        }
    },
    //视能力分别使用 demo0 || demo1 || IE 方式来绑定事件 
    //参数：操作的元素，事件名称，事件处理程序 
    addEvent: function(element, type, handler) {
        if (element.addEventListener) { //事件类型、需要执行的函数、是否捕捉   
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, function() {
                handler.call(element);
            });
        } else {
            element['on' + type] = handler;
        }
    },
    //移除事件 
    removeEvent: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.datachEvent) {
            element.datachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    //阻止事件（主要是事件冒泡，因为IE不支持事件捕获） 
    stopPropagation: function(ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else {
            ev.cancelBubble = true;
        }
    },
    //取消事件的默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //获取事件目标 
    getTarget: function(event) {
        return event.target || event.srcElemnt;
    },
    //获取event对象的引用，取到事件的所有信息，确保随时能使用event； 
    getEvent: function(e) {
        var ev = e || window.event;
        if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                ev = c.argument[0];
                if (ev && Event == ev.constructor) {
                    break;
                }
                c = c.caller;
            }
        }
        return ev;
    }
};
```