import { convert, formatTime } from "./converter.js";

const twoDNums = document.getElementsByClassName("2dNum");
for (const element of twoDNums) {
  restrictToTwoDigitNumbers(element);
  addAutoSelectBehavior(element);
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
    const allowedKeys = [
      "Backspace",
      "Tab",
      "Escape",
      "Enter",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
    ];

    // Allow navigation and editing shortcuts
    if (
      allowedKeys.includes(e.key) ||
      (e.ctrlKey && ["a", "c", "v", "x"].includes(e.key.toLowerCase()))
    ) {
      return;
    }

    // Allow only numeric keys (single characters "0" to "9")
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    // if (this.selectionStart !== this.selectionEnd) {
    //   console.log("Test123");
    //   return;
    // }
    // Prevent if already 2 digits
    if (this.value.length >= 2) {
      e.preventDefault();
    }
  });
}

function addAutoSelectBehavior(inputElement) {
  // Select all text when the input gains focus
  inputElement.addEventListener("focus", function () {
    // Use setTimeout to ensure the select happens after the focus event
    setTimeout(() => {
      this.select();
    }, 0);
  });

  // Optional: Also select all on click (for mouse users)
  inputElement.addEventListener("click", function () {
    if (document.activeElement === this) {
      this.select();
    }
  });
}

document.getElementById("secs_inputted").addEventListener("blur", (e) => {
  const val = e.target.value;
  if (val.length >= 2) {
    return;
  }
  if (val === "") {
    e.target.value = "00";
    return;
  }
  const nVal = Number(val);
  if (nVal >= 0 && nVal < 10) {
    e.target.value = "0" + val;
  }
});

document.getElementById("mins_inputted").addEventListener("blur", (e) => {
  const val = e.target.value;
  if (val === "") {
    e.target.value = "00";
    return;
  }
});

document.getElementById("hh_inputted").addEventListener("blur", (e) => {
  const val = e.target.value;
  if (val.length >= 2) {
    return;
  }
  if (val === "") {
    e.target.value = "00";
    return;
  }
  const nVal = Number(val);
  if (nVal >= 0 && nVal < 10) {
    e.target.value = val + "0";
  }
});
