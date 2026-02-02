let current = 0;
const steps = document.querySelectorAll(".step");

function showStep(n) {
  steps.forEach(s => s.classList.remove("active"));
  steps[n].classList.add("active");
  document.getElementById("progressBar").style.width =
    ((n+1)/steps.length)*100 + "%";
}

function nextStep() {
  if (current < steps.length-1) {
    current++;
    showStep(current);
  } else {
    document.getElementById("nominationForm").style.display="none";
    document.getElementById("success").classList.remove("d-none");
  }
}

function prevStep() {
  if (current > 0) {
    current--;
    showStep(current);
  }
}

showStep(0);