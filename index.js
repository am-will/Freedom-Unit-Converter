/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

document.addEventListener('DOMContentLoaded', () => {
  // Grab the input once the DOM is ready.
  const input = document.getElementById('amount')

  // 100px for 0–2 chars; grows after that.
  const BASE_PX = 100;

  // Calculates and applies the width. Adds 1ch per char beyond 2.
  function grow() {
    const len = input.value.length;
    const extra = Math.max(0, len - 2); // start growth at the 3rd char
    input.style.width = `calc(${BASE_PX}px + ${extra}ch)`
  }

  // Keeps only digits (0–9). Fixes the caret, then grows.
  function sanitize() {
    const v = input.value
    const cleaned = v.replace(/\D+/g, '') // strip non-digits
    if (v !== cleaned) {
      // Try to keep the caret in the right place after stripping
      const pos = input.selectionStart
      const diff = v.length - cleaned.length
      input.value = cleaned;
      if (pos != null) {
        const newPos = Math.max(0, pos - diff)
        input.setSelectionRange(newPos, newPos)
      }
    }
    grow();
  }

  // Prevent non-digit keys before they even land (nice UX).
  input.addEventListener('keydown', (e) => {
    const allow = ['Backspace','Delete','ArrowLeft','ArrowRight','Home','End','Tab','Enter'];
    if (allow.includes(e.key)) return;
    if (e.ctrlKey || e.metaKey) return;     // allow Cmd/Ctrl+C/V/X/A, etc.
    if (/^\d$/.test(e.key)) return;         // allow 0–9
    e.preventDefault();                     // block everything else
  });

  // Sanitize after any change: typing, paste, drag-drop, autofill.
  input.addEventListener('input', sanitize);

  // Set initial width on load.
  sanitize();
});

const meterFoot = document.getElementById("meter-foot")
const literGal = document.getElementById("liter-gal")
const kiloPound = document.getElementById("kilo-pound")
const convertButton = document.getElementById("convert-btn")

convertButton.addEventListener("click", function() {
    const inputValue = (document.getElementById("amount")).value
    let meterToFoot = Math.round((inputValue * 3.281) * 100) / 100
    let footToMeter = Math.round((inputValue / 3.281) * 100) / 100
    let literToGal = Math.round((inputValue * 0.264) * 100) / 100
    let galToLiter = Math.round((inputValue / 0.264) * 100) / 100
    let kgToPound = Math.round((inputValue * 2.204) * 100) / 100
    let poundToKg = Math.round((inputValue / 2.204) * 100) / 100
    meterFoot.innerHTML = `${inputValue} meters = ${meterToFoot} | ${inputValue} feet = ${footToMeter} meters`
    literGal.innerHTML = `${inputValue} liters = ${literToGal} | ${inputValue} gallons = ${galToLiter} liters`
    kiloPound.innerHTML = `${inputValue} kg = ${kgToPound} | ${inputValue} lbs = ${poundToKg} kg`

})