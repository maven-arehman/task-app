const math = require("./math");

test("Should convert 32 F to 0 C", () => {
  const temp = math.fahrenheitToCelsius(32);
  expect(temp).toBe(0);
});

test("Should convert 0 C to 32 F", () => {
  const temp = math.celsiusToFahrenheit(0);
  expect(temp).toBe(32);
});

test("Async - async/await", async () => {
  const result = await math.add(2, 3);
  expect(result).toBe(5);
});
