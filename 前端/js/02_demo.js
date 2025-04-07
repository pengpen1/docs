// 闭包DEMO
const a = 15;

const demo = () => {
  console.log("demo=>", a);
};
const demo2 = () => {
  const a = 20;
  console.log("demo2=>", a);
  demo();
};

demo2(); // demo2=> 20 demo=> 15

// 闭包DEMO2
const makeAdder = (count) => {
  return (num) => {
    return count + num;
  };
};

const add10 = makeAdder(10);
console.log(add10(5)); // 15
