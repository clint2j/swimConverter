/**
 * SwimTime Converter - Chrome Extension
 * 
 * This file is part of the SwimTime Converter extension, which detects and converts
 * swim times between SCY, SCM, and LCM formats.
 *
 * Author: Clint Hart
 * Repository: https://github.com/clint2j/swimConverter
 * License: MIT
 *
 * @fileoverview [Brief description of what this file does]
 */
const STROKE_ADJUSTMENTS = {
  fr: 0.8,
  bk: 0.6,
  br: 1.0,
  fl: 0.7,
  im: 0.8,
};

const adjustLcmTime = (time, distance, stroke, direction = "subtract") => {
  const adjustment = STROKE_ADJUSTMENTS[stroke] || 0;
  const delta = adjustment * (distance / 50);
  return direction === "add" ? time + delta : time - delta;
};

const convertSpecialDistances = (
  totalSeconds,
  distance,
  stroke,
  inputType,
  outputType
) => {
  let time = totalSeconds;

  if ((distance === 400 && stroke === "fr") || distance === 800) {
    if (inputType === "scm") time += (6.4 * distance) / 400;
    if (outputType === "scy") time /= 0.8925;
    if (inputType === "scy") time *= 0.8925;
    if (outputType === "scm") time -= (6.4 * distance) / 400;
    return time;
  }

  if (distance === 1500) {
    if (inputType === "scm") time += 24;
    if (outputType === "scy") time /= 1.02;
    if (inputType === "scy") time *= 1.02;
    if (outputType === "scm") time -= 24;
    return time;
  }

  return null; // not a special distance
};

const convert = (totalSeconds, distance, stroke, inputType, outputType) => {
  // Handle special cases (400fr, 800, 1500)
  const specialCaseTime = convertSpecialDistances(
    totalSeconds,
    distance,
    stroke,
    inputType,
    outputType
  );
  if (specialCaseTime !== null) return specialCaseTime;

  let time = totalSeconds;

  // Adjust from LCM to base time
  if (inputType === "lcm") {
    time = adjustLcmTime(time, distance, stroke, "subtract");
  }

  // Convert pool type
  if (inputType === "scy") {
    time *= 1.11;
  } else if (outputType === "scy") {
    time /= 1.11;
  }

  // Adjust to LCM if needed
  if (outputType === "lcm") {
    time = adjustLcmTime(time, distance, stroke, "add");
  }

  return time;
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
