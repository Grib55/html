
async function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  const response = await fetch(`lang/${lang}.json`);
  const strings = await response.json();
  document.title = strings.title;
  for (const key in strings) {
    const element = document.querySelector(`[data-lang="${key}"]`);
    if (element) element.textContent = strings[key];
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "ru";
  setLanguage(savedLang);
});
function checkAnswer(isCorrect) {
  const result = document.getElementById("quizResult");
  result.textContent = isCorrect ? "Правильно! 🎉" : "Неправильно. Попробуй ещё!";
}
