function iqTest(numbers) {
  const remainders = numbers.split(" ").map(x => x % 2)
  const sum = remainders.reduce((a, b) => a + b)
  const target = sum > 1 ? 0 : 1

  return remainders.indexOf(target) + 1
}