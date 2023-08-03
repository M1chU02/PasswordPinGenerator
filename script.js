//PASSWORD GENERATOR
const generatedPsw = document.getElementById("generatedpassword");
const pswCpyBtn = document.getElementById("copybtn");
const pswGenBtn = document.getElementById("generatebtn");
const pswLength = document.getElementById("length");
const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

pswCpyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = generatedPsw.value;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
});

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

pswGenBtn.addEventListener("click", () => {
  const length = +pswLength.value;
  const hasLower = lowercase.checked;
  const hasUpper = uppercase.checked;
  const hasNumber = numbers.checked;
  const hasSymbol = symbols.checked;

  generatedPsw.value = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  shuffledPsw = shufflePassword(finalPassword);

  return shuffledPsw;
}

function shufflePassword(finalPassword) {
  const charArray = finalPassword.split("");

  for (let i = charArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
  }
  return charArray.join("");
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

//PIN GENERATOR
const generatedPin = document.getElementById("generatedpin");
const copyPinBtn = document.getElementById("copypinbtn");
const generatePinBtn = document.getElementById("generatepinbtn");
const pinlengthEl = document.getElementById("pinlength");

generatePinBtn.addEventListener("click", () => {
  let pinlength = +pinlengthEl.value;
  let pin = "";
  for (let i = 0; i < pinlength; i++) {
    pin += Math.floor(Math.random() * 10);
  }
  generatedPin.value = pin;
});

copyPinBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const checkpin = generatedPin.value;

  if (!checkpin) {
    return;
  }

  textarea.value = checkpin;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
});

window.addEventListener("load", () => {
  document.addEventListener("contextmenu", (e) => e.preventDefault(), false);
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.keyCode == 123) {
      e.stopPropagation();
      e.preventDefault();
    }
  });
});
