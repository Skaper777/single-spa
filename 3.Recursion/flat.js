/*
Примеры:
flat([]) // []
flat([[1, 5], 5, 10]) // [1, 5, 5, 10]
flat([1, 2, [3, 4]]) // [1, 2, 3, 4]
flat([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
*/

function flat(array) {
  const result = []

  for (const element of array) {
    if (Array.isArray(element)) {
      result.push(...flat(element))
    } else {
      result.push(element)
    }
  }

  return result
}