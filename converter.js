const convert = (totalSeconds, distance, stroke, inputType, outputType) => {
  let outputTime = 0;

  if ((distance === 400 && stroke == "fr") || distance === 800) {
    outputTime = totalSeconds;
    if (inputType === "scm") {
      outputTime += (6.4 * distance) / 400;
    }
    if (outputType === "scy") {
      outputTime /= 0.8925;
    }
    if (inputType === "scy") {
      outputTime *= 0.8925;
    }
    if (outputType === "scm") {
      outputTime -= (6.4 * distance) / 400;
    }
    return outputTime;
  }

  if (distance === 1500) {
    outputTime = totalSeconds;
    if (inputType === "scm") {
      outputTime += 24;
    }
    if (outputType === "scy") {
      outputTime /= 1.02;
    }
    if (inputType === "scy") {
      outputTime *= 1.02;
    }
    if (outputType === "scm") {
      outputTime -= 24;
    }
    return outputTime;
  }

  if (inputType == "lcm") {
    switch (stroke) {
      case "fr":
        totalSeconds -= 0.8 * (distance / 50);
        break;
      case "bk":
        totalSeconds -= 0.6 * (distance / 50);
        break;
      case "br":
        totalSeconds -= 1 * (distance / 50);
        break;
      case "fl":
        totalSeconds -= 0.7 * (distance / 50);
        break;
      case "im":
        totalSeconds -= 0.8 * (distance / 50);
        break;
    }
  }

  if (inputType == "scy") {
    outputTime = totalSeconds * 1.11;
  } else if (outputType == "scy") {
    outputTime = totalSeconds / 1.11;
  } else {
    outputTime = totalSeconds;
  }

  if (outputType == "lcm") {
    switch (stroke) {
      case "fr":
        outputTime += 0.8 * (distance / 50);
        break;
      case "bk":
        outputTime += 0.6 * (distance / 50);
        break;
      case "br":
        outputTime += 1 * (distance / 50);
        break;
      case "fl":
        outputTime += 0.7 * (distance / 50);
        break;
      case "im":
        outputTime += 0.8 * (distance / 50);
        break;
    }
  }

  return outputTime;
};

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const whole = String(Math.floor(seconds)).padStart(2, "0");
  const frac = String((seconds % 1).toFixed(3)).substring(1);

  const paddedSeconds = whole + frac;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${paddedSeconds}`;
  } else if (minutes > 0) {
    return `${minutes}:${paddedSeconds}`;
  } else {
    return `${paddedSeconds}`;
  }
};

export { convert, formatTime };
