let current = 0;
const steps = document.querySelectorAll(".step");
const form = document.getElementById("nominationForm");
const errorBox = document.getElementById("errorBox");

function showStep(n) {
  steps.forEach(s => s.classList.remove("active"));
  steps[n].classList.add("active");
  document.getElementById("progressBar").style.width =
    ((n + 1) / steps.length) * 100 + "%";
}

function validateStep() {
  let valid = true;
  errorBox.classList.add("d-none");

  let fields = steps[current].querySelectorAll("input, textarea, select");

  fields.forEach(f => {
    f.classList.remove("error");
    if (f.hasAttribute("required") && !f.value.trim()) {
      f.classList.add("error");
      valid = false;
    }
  });

  if (!valid) {
    errorBox.innerText = "Please fill all required fields before continuing.";
    errorBox.classList.remove("d-none");
  }

  return valid;
}

function nextStep() {
  if (!validateStep()) return;

  if (current < steps.length - 1) {
    current++;
    showStep(current);
  } else {
    submitToGoogle();
  }
}

function prevStep() {
  if (current > 0) {
    current--;
    showStep(current);
  }
}

/* ---------- LOCAL STORAGE ---------- */
form.addEventListener("input", () => {
  let data = new FormData(form);
  let obj = {};
  data.forEach((v, k) => obj[k] = v);
  localStorage.setItem("nominationDraft", JSON.stringify(obj));
});

function loadDraft() {
  let saved = localStorage.getItem("nominationDraft");
  if (!saved) return;

  let data = JSON.parse(saved);
  Object.keys(data).forEach(k => {
    let field = form.querySelector(`[name="${k}"]`);
    if (field) field.value = data[k];
  });
}

/* ---------- SUBMIT ---------- */
function submitToGoogle() {
  let data = new FormData(form);
  let obj = {};
  data.forEach((v, k) => obj[k] = v);

  fetch("PASTE_YOUR_GOOGLE_WEB_APP_URL_HERE", {
    method: "POST",
    body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(() => {
    localStorage.removeItem("nominationDraft");
    form.style.display = "none";
    document.getElementById("success").classList.remove("d-none");
  });
}

loadDraft();
showStep(0);


