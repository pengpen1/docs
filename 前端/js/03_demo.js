// 默认绑定
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
