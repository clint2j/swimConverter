import { convert, formatTime } from "./converter.js";

const twoDNums = document.getElementsByClassName("2dNum");
for (const element of twoDNums) {
  restrictToTwoDigitNumbers(element);
}

document.getElementById("but").onclick = () => {
  const setBorderColor = (elementId, isError) => {
    document.getElementById(elementId).style.border = `1px solid ${
      isError ? "#ff0000" : "#bbb"
    }`;
  };

  const getInputValue = (elementId) => document.getElementById(elementId).value;

  let hasError = false;

  // Validate event
  const event = getInputValue("event");
  if (event === "placeholder") {
    setBorderColor("event", true);
    hasError = true;
  } else {
    setBorderColor("event", false);
  }

  // Validate minutes
  const minsValue = getInputValue("mins_inputted");
  const mins = Number(minsValue);
  if (minsValue === "" || mins < 0) {
    setBorderColor("mins_inputted", true);
    hasError = true;
  } else {
    setBorderColor("mins_inputted", false);
  }

  // Validate seconds
  const secsValue = getInputValue("secs_inputted");
  const secs = Number(secsValue);
  if (secsValue === "" || secs < 0 || secs >= 60) {
    setBorderColor("secs_inputted", true);
    hasError = true;
  } else {
    setBorderColor("secs_inputted", false);
  }

  // Validate hundredths
  const hhValue = getInputValue("hh_inputted");
  const hh = Number(hhValue);
  if (hhValue === "" || hh < 0 || hh >= 100) {
    setBorderColor("hh_inputted", true);
    hasError = true;
  } else {
    setBorderColor("hh_inputted", false);
  }

  if (hasError) return;

  const totalSeconds = mins * 60 + secs + hh / 100;

  const eventMatch = event.match(/^(\d+)([a-zA-Z]+)$/);

  const distance = Number(eventMatch[1]);
  const stroke = eventMatch[2];

  const conversionValue = document.getElementById("conversion")?.value ?? "";
  const inputType = conversionValue.slice(0, 3);
  const outputType = conversionValue.slice(4);

  const convertedTime = convert(
    totalSeconds,
    distance,
    stroke,
    inputType,
    outputType
  );

  document.getElementById("outputBox").style.display = "block";
  document.getElementById("output_value").innerHTML = formatTime(convertedTime);
};

function restrictToTwoDigitNumbers(inputElement) {
  inputElement.addEventListener("keydown", function (e) {
    // Allow backspace, delete, tab, escape, enter
    console.log("hello");
    if (
      [8, 9, 27, 13, 46].includes(e.keyCode) ||
      // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode))
    ) {
      return;
    }

    // Prevent if not a number key (0-9)
    if (
      !(
        (e.keyCode >= 48 && e.keyCode <= 57) || // Top row numbers
        (e.keyCode >= 96 && e.keyCode <= 105)
      )
    ) {
      // Numpad numbers
      e.preventDefault();
      return;
    }

    // Prevent if already 2 digits
    if (this.value.length >= 2) {
      e.preventDefault();
    }
  });

  // Handle paste events
  //   inputElement.addEventListener("paste", function (e) {
  //     e.preventDefault();
  //     const paste = (e.clipboardData || window.clipboardData).getData("text");
  //     const numbersOnly = paste.replace(/\D/g, "").slice(0, 2);
  //     this.value = numbersOnly;
  //   });

  //   // Cleanup existing value on initial setup
  //   inputElement.value = inputElement.value.replace(/\D/g, "").slice(0, 2);
}
