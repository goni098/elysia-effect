export const randomDigits = (length: number) => {
  const digits = "0123456789";
  let code = "";
  const len = digits.length;

  for (let i = 0; i < length; i++) {
    code += digits[Math.floor(Math.random() * len)];
  }

  return code;
};
