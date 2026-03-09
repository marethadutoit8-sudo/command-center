document.addEventListener("DOMContentLoaded", () => {
  const pressureInput = document.getElementById("pressure");
  const clarityInput = document.getElementById("clarity");
  const energyInput = document.getElementById("energy");
  const priorityInput = document.getElementById("priority");
  const assessBtn = document.getElementById("assessBtn");
  const resetBtn = document.getElementById("resetBtn");
  const resultCard = document.getElementById("resultCard");
  const stateText = document.getElementById("stateText");
  const actionText = document.getElementById("actionText");
  const summaryText = document.getElementById("summaryText");

  function getState(pressure, clarity, energy) {
    if (pressure >= 8 && clarity <= 4) {
      return {
        label: "Overloaded",
        action:
          "Stop. Do one 60-second exhale-focused breathing round, reduce inputs, and choose only one next step."
      };
    }

    if (pressure >= 6 && energy <= 4) {
      return {
        label: "Strained",
        action:
          "Do a short reset: stand up, loosen shoulders, drink water, and remove one non-essential task."
      };
    }

    if (clarity >= 7 && energy >= 6 && pressure <= 6) {
      return {
        label: "Ready",
        action:
          "You are clear enough to move. Protect focus and complete the next important task before checking anything else."
      };
    }

    return {
      label: "Unsettled",
      action:
        "Slow down and simplify. Name the real priority, ignore the rest for now, and work in one short focused block."
    };
  }

  function buildSummary(pressure, clarity, energy, priority) {
    return `Pressure: ${pressure}/10 | Clarity: ${clarity}/10 | Energy: ${energy}/10 | Priority: ${priority}`;
  }

  function assessState() {
    const pressure = Number(pressureInput.value);
    const clarity = Number(clarityInput.value);
    const energy = Number(energyInput.value);
    const priority = priorityInput.value.trim();

    if (!pressure || !clarity || !energy || !priority) {
      alert("Please complete all fields first.");
      return;
    }

    const result = getState(pressure, clarity, energy);

    stateText.textContent = result.label;
    actionText.textContent = result.action;
    summaryText.textContent = buildSummary(pressure, clarity, energy, priority);

    resultCard.style.display = "block";
  }

  function resetForm() {
    pressureInput.value = "";
    clarityInput.value = "";
    energyInput.value = "";
    priorityInput.value = "";

    stateText.textContent = "";
    actionText.textContent = "";
    summaryText.textContent = "";
    resultCard.style.display = "none";
  }

  if (assessBtn) {
    assessBtn.addEventListener("click", assessState);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetForm);
  }
});
