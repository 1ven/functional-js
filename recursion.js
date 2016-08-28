const { head, tail } = require('ramda');

// ------------------------------------------------------------------

const strHead = str => str.split(' ')[0];
const strTail = str => str.split(' ').slice(1).join(' ');
const isSingleWord = str => ! ~str.indexOf(' ');

const reverseWords = str => (
  isSingleWord(str) ? str : reverseWords(strTail(str)) + ' ' + strHead(str)
);

const reverse = str => (
  str.length === 1 ? str : reverse(str.slice(1)) + str[0]
);

// ------------------------------------------------------------------

const greater = (x, y) => x > y ? x : y;

const max = ([head, ...tail]) => !tail.length ? head : greater(head, max(tail));

/* console.log(max([1, 2, 3, 4, 20, 3, 5, 6])) */

// ------------------------------------------------------------------

const replicate = (num, times) => times <= 0 ? [] : [...replicate(num, times - 1), num];

/* console.log(replicate(3, 5)); */

// ------------------------------------------------------------------

const take = (count, list) => (
  count <= 0 || !list.length ? [] : [list[0], ...take(count - 1, list.slice(1))]
);

/* console.log(take(6, [3, 5, 7, 6, 8, 3, 2, 1])); */

// ------------------------------------------------------------------

const zip = (a, b) => (
  !a.length || !b.length ? {} : [{
    [head(a)]: head(b)
  }, ...zip(tail(a), tail(b))]
);

/* console.log(zip(['a', 'b', 'c', 'd'], [1, 2, 3, 4, 5])); */

// ------------------------------------------------------------------

const elem = (el, list) => (
  !list.length ?
    false :
  head(el) === el ?
    true :
  elem(el, tail(el))
);

/* console.log(elem(7, [2, 4, 5])); */

// ------------------------------------------------------------------

const quicksort = ([head, ...tail]) => (
  !head ? [] : [
    ...quicksort(tail.filter(el => el <= head)),
    head,
    ...quicksort(tail.filter(el => el > head)),
  ]
);

/* console.log(quicksort([10,2,5,3,1,6,7,4,2,3,4,8,9])); */

// ------------------------------------------------------------------

const map = ([head, ...tail], f) => (
  !head ? [] : [f(head), ...map(tail, f)]
);

/* console.log(map([1, 2, 3,], el => el * 2)); */

// ------------------------------------------------------------------

const filter = ([head, ...tail], f) => (
  !head ? [] : (
    f(head) ? [head, ...filter(tail, f)] : filter(tail, f)
  )
);

/* console.log(filter([1, 2, 3,], el => el !== 2)); */

// ------------------------------------------------------------------

const reduce = ([head, ...tail], f, acc) => (
  !head ? acc : (
    reduce(tail, f, f(acc, head))
  )
);

/* console.log(reduce([1, 2, 3], (acc, el) => acc + el, 0)); */

// ------------------------------------------------------------------

const zipWith = (f, [xHead, ...xTail], [yHead, ...yTail]) => (
  !xHead || !yHead ? [] : [f(xHead, yHead), ...zipWith(f, xTail, yTail)]
);

/* console.log(zipWith((a, b) => a + b, [1, 2, 3], [4, 5, 6])); */

// ------------------------------------------------------------------

const takeWhile = ([head, ...tail], f) => (
  !f(head) ? [] : [head, ...takeWhile(tail, f)]
);

/* console.log(takeWhile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], el => el < 5)) */

// ------------------------------------------------------------------

const chain = n => (
  n === 1 ? [1] : (
    n % 2 === 0 ? (
      [n, ...chain(n / 2)]
    ) : (
      [n, ...chain(n * 3 + 1)]
    )
  )
);

/* console.log(chain(30)); */
const hundred = Array.apply(0, Array(100)).map((e, i) => i + 1);

console.log(
  hundred.map(chain).filter(c => c.length > 15).length
);
