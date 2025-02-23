const array1 = [1, 2, 3, 4];

const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue
);

console.log("sumWithInitial =", sumWithInitial);

const pipe =
  (...something: unknown[]) =>
  (initialValue: unknown) =>
    something.reduce((acc, currFn) => {
      if (currFn instanceof Function) {
        return currFn(acc);
      }
      return Error(`parameter passed is not a function`);
    }, initialValue);

// Building blocks to use for composition
const double = (x: number) => 2 * x;
const triple = (x: number) => 3 * x;
const quadruple = (x: number) => 4 * x;

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);
const error = pipe(double, 2);
// Usage
console.info("pipe starts");
console.log(multiply6(6)); // 36
console.log(multiply9(9)); // 81
console.log(multiply16(16)); // 256
console.log(multiply24(10)); // 240
console.log(error(5)); // error: parameter passed is not a function
console.info("pipe ends");
