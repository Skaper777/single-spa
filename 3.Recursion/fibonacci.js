/*
Примеры:
fibonacci(1) // 0
fibonacci(2) // 1
fibonacci(13) // 144
*/

function fibonacci(index) {
  if (index === 1) {
    return 0;
  }

  if (index === 2) {
    return 1;
  }

  return fibonacci(index - 1) + fibonacci(index - 2);
}