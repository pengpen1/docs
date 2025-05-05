<h1 align="center" id="this指向">this指向</h1>

## 先看案例
```js
const demo = () => {
  console.log("this", this);
};

demo(); // node: {} , 浏览器:Window

function demo2() {
  console.log("demo2", this);
  demo3();
}

const demo3 = () => {
  console.log("demo3", this);
};
demo2(); // node: demo2 Object [global] demo3 {}, 浏览器: 都为Window

const obj = {
  name: "obj",
  demo: demo2,
  demo4: function () {
    console.log("demo4", this);
  },
};
obj.demo(); // 指向obj
obj.demo4(); // 指向obj
```
这些案例可以看出，函数在调用时，JavaScript会默认给this绑定一个值。
这个值是在函数被调用时确定的，而不是在函数定义时确定的。
这个值取决于函数的调用方式，在**运行时被绑定**的。

## 绑定规则
- 1.默认绑定
  - 函数在**独立调用**时，this指向全局对象（在浏览器中是window，在Node.js中是global）。
  - 函数在**严格模式**下，this指向undefined。
- 2.隐式绑定
  - 函数在**对象的方法调用**时，this指向该对象。
  - 函数在**箭头函数**中，this指向定义时所在的作用域(在词法上绑定了this值)。
- 3.显示绑定
  - 函数通过**call、apply、bind**方法来指定this的指向。
- 4.new绑定
  - 函数通过**new**关键字来创建一个新对象，this指向该新对象。

## 内置函数
我们经常调用像ForEach等内置函数，这些函数会要求我们传入一个函数，这个函数会被调用多次，每次调用时，函数内的this又该指向什么呢？
```js
const arr = [1, 2, 3];
arr.forEach(function (item) {
  console.log("arr", this); // 指向Window
});
arr.forEach((item) => {
  console.log("arr2", this); // 指向Window
}, arr);
arr.forEach(function (item) {
  console.log("arr3", this); // 指向arr
}, arr);
```

## New绑定
使用new关键字来调用函数是，会执行如下的操作：
- 创建一个新对象。
- 执行prototype连接：将新对象的__proto__属性指向构造函数的prototype属性。
- 这个新对象会绑定到函数调用的this上（this的绑定在这个步骤完成）。
- 如果构造函数没有返回其他对象，则返回新对象。

## 优先级
new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高。
new绑定可以和bind一起使用，new绑定优先级更高。

```js
new绑定 > bind显示绑定
```

其他的绑定优先级如下：

```js
显示绑定 > 隐式绑定 > 默认绑定
```

而箭头函数的this指向是在定义时确定的，而不是在调用时确定的。

## 关联考点

- 作用域
- 箭头函数
- 原型