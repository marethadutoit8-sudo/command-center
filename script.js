document.addEventListener("DOMContentLoaded", () => {
  const pressureInput = document.getElementById("pressure");
  const clarityInput = document.getElementById("clarity");
  const energyInput = document.getElementById("energy");
  const priorityInput = document.getElementById("priority");

  const assessBtn = document.getElementById("assessBtn");
  const resetBtn = document.getElementById("resetBtn");

  const resultCard = document.getElementById("resultCard");
  const stateBadge = document.getElementById("stateBadge");
  const stateText = document.getElementById("stateText");
  const actionText = document.getElementById("actionText");
  const nextStepText = document.getElementById("nextStepText");
  const summaryText = document.getElementById("summaryText");
  const errorText = document.getElementById("errorText");

  function clearResultClasses() {
    resultCard.classList.remove(
      "result-ready",
      "result-strained",
      "result-overloaded",
      "result-unsettled"
    );
  }

  function classifyState(pressure, clarity, energy) {
    if (pressure >= 8 && clarity <= 4) {
      return {
        label: "Overloaded",
        className: "result-overloaded",
        action:
          "You are carrying too much pressure for clean execution right now. Do not add more. Reduce inputs, stop multitasking, and narrow to one move.",
        nextStep:
          "Step away for 60 seconds. Exhale slowly 5 times, drink water, then do only the single most important task for 10 minutes."
      };
    }

    if (pressure >= 6 && energy <= 4) {
      return {
        label: "Strained",
        className: "result-strained",
        action:
          "You still have movement available, but your system is taxed. Push less, simplify harder, and protect energy.",
        nextStep:
          "Remove one non-essential task, stand up, loosen shoulders, and complete one small useful action."
      };
    }

    if (clarity >= 7 && energy >= 6 && pressure <= 6) {
      return {
        label: "Ready",
        className: "result-ready",
        action:
          "You are clear enough to execute. This is a good window for focused work. Protect it.",
        nextStep:
          "Ignore distractions for one work block and complete the next concrete step on your priority."
      };
    }

    return {
      label: "Unsettled",
      className: "result-unsettled",
      action:
        "You are not fully overloaded, but you are not fully settled either. Clarity will improve if you simplify the field.",
      nextStep:
        "Name the one thing that matters most, then work on it for 10 minutes before reassessing."
    };
  }

  function validateScore(value, name) {
    if (value === "" || Number.isNaN(Number(value))) {
      return `${name} is required.`;
    }

    const numericValue = Number(value);

    if (numericValue < 1 || numericValue > 10) {
      return `${name} must be between 1 and 10.`;
    }

    return "";
  }

  function buildSummary(pressure, clarity, energy, priority) {
    return `Pressure: ${pressure}/10 · Clarity: ${clarity}/10 · Energy: ${energy}/10 · Priority: ${priority}`;
  }

  function assessState() {
    errorText.textContent = "";

    const pressureError = validateScore(pressureInput.value, "Pressure");
    const clarityError = validateScore(clarityInput.value, "Clarity");
    const energyError = validateScore(energyInput.value, "Energy");

    if (pressureError) {
      errorText.textContent = pressureError;
      return;
    }

    if (clarityError) {
      errorText.textContent = clarityError;
      return;
    }

    if (energyError) {
      errorText.textContent = energyError;
      return;
    }

    const priority = priorityInput.value.trim();

    if (!priority) {
      errorText.textContent = "Main Priority is required.";
      return;
    }

    const pressure = Number(pressureInput.value);
    const clarity = Number(clarityInput.value);
    const energy = Number(energyInput.value);

    const result = classifyState(pressure, clarity, energy);

    clearResultClasses();
    resultCard.classList.remove("hidden");
    resultCard.classList.add(result.className);

    stateBadge.textContent = result.label;
    stateText.textContent = result.label;
    actionText.textContent = result.action;
    nextStepText.textContent = result.nextStep;
    summaryText.textContent = buildSummary(pressure, clarity, energy, priority);

    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetForm() {
    pressureInput.value = "";
    clarityInput.value = "";
    energyInput.value = "";
    priorityInput.value = "";

    errorText.textContent = "";
    stateBadge.textContent = "State";
    stateText.textContent = "Your Current State";
    actionText.textContent = "";
    nextStepText.textContent = "";
    summaryText.textContent = "";

    clearResultClasses();
    resultCard.classList.add("hidden");
  }

  assessBtn.addEventListener("click", assessState);
  resetBtn.addEventListener("click", resetForm);
});
