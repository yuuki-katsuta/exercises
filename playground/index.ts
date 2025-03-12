const contains = (unit: number[], num: number) => {
  let start = 0;
  let end = unit.length;

  while (start <= end) {
    const middle = Math.floor(start + (end - start) / 2);
    const value = unit[middle];

    if (num === value) {
      return true;
    }
    if (num > value) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }

  return false;
};

console.log(contains([...Array.from({ length: 10000 }, (_, i) => i)], 10000));
