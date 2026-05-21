function loadContent(lang) {
  // логотип і меню
  document.querySelector('.logo').textContent = lang === 'en' ? 'AI Course from Zero' : 'AI-курс з нуля';
  document.querySelector('.nav-links a[href="index.html"]').textContent = lang === 'en' ? 'Home' : 'Головна';
  document.querySelector('.nav-links a[href="lessons.html"]').textContent = lang === 'en' ? 'Lessons' : 'Уроки';
  document.querySelector('#homeworkLink').textContent = lang === 'en' ? 'Homework' : 'Домашні завдання';
  document.querySelector('#profileLink').textContent = lang === 'en' ? 'Profile' : 'Профіль';

  // форма авторизації
  const authSection = document.querySelector('#authSection h2');
  if (authSection) authSection.textContent = lang === 'en' ? 'Login / Register' : 'Вхід / Реєстрація';

  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) loginBtn.textContent = lang === 'en' ? 'Login' : 'Увійти';

  const registerBtn = document.getElementById('registerBtn');
  if (registerBtn) registerBtn.textContent = lang === 'en' ? 'Register' : 'Зареєструватись';

  const emailInput = document.getElementById('emailInput');
  if (emailInput) emailInput.placeholder = lang === 'en' ? 'Email' : 'Email';

  const passwordInput = document.getElementById('passwordInput');
  if (passwordInput) passwordInput.placeholder = lang === 'en' ? 'Password' : 'Пароль';

  // завдання (завантаження файлів)
  const homeworkUpload = document.querySelector('#homeworkUpload h3');
  if (homeworkUpload) {
    homeworkUpload.textContent = lang === 'en' ? 'Submit Homework' : 'Відправити домашнє завдання';
  }

  const dropZone = document.getElementById('dropZone');
  if (dropZone) {
    dropZone.innerHTML = lang === 'en'
      ? 'Drag & drop file here or click to select <input type="file" name="file" id="homeworkFile" style="opacity:0; position:absolute; left:0; top:0; width:1px; height:1px;" required>'
      : 'Перетягніть файл сюди або натисніть для вибору <input type="file" name="file" id="homeworkFile" style="opacity:0; position:absolute; left:0; top:0; width:1px; height:1px;" required>';
  }

  const homeworkFile = document.getElementById('homeworkFile');
  if (homeworkFile) homeworkFile.title = lang === 'en' ? 'No file chosen' : 'Файл не вибрано';

  const homeworkText = document.getElementById('homeworkText');
  if (homeworkText) homeworkText.placeholder = lang === 'en' ? 'Homework comment' : 'Коментар до домашнього завдання';

  const submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) submitBtn.textContent = lang === 'en' ? 'Submit' : 'Відправити';

  // повідомлення, якщо урок не вибрано
  const lockedDiv = document.querySelector('.locked');
  if (lockedDiv) lockedDiv.textContent = lang === 'en' ? 'Select a lesson' : 'Виберіть потрібний урок';

  // профіль користувача
  const username = document.getElementById('username');
  if (username && (username.textContent === 'Loading...' || username.textContent === 'Завантаження...')) {
    username.textContent = lang === 'en' ? 'Loading...' : 'Завантаження...';
  }

  const emailDiv = document.getElementById('email');
  if (emailDiv && emailDiv.textContent === '') {
    emailDiv.textContent = lang === 'en' ? 'Loading email...' : '';
  }

  const progressSummary = document.getElementById('progressSummary');
  if (progressSummary) progressSummary.textContent = lang === 'en' ? 'Loading progress...' : 'Завантаження прогресу...';

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.textContent = lang === 'en' ? 'Logout' : 'Вийти';

  // секція домашніх завдань
  const homeworkHeading = document.querySelector('.homework-list h2');
  if (homeworkHeading) homeworkHeading.textContent = lang === 'en' ? 'Homework' : 'Домашні завдання';

  const homeworkContainer = document.getElementById('homeworkContainer');
  if (homeworkContainer && 
     (homeworkContainer.textContent.includes('Завантаження') || homeworkContainer.textContent.includes('Loading'))) {
    homeworkContainer.textContent = lang === 'en' ? 'Loading homework...' : 'Завантаження домашніх завдань...';
  }
}

// ініціалізація
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('languageSelect');
  const savedLang = localStorage.getItem('language') || 'uk';
  select.value = savedLang;
  loadContent(savedLang);

  select.addEventListener('change', e => {
    const lang = e.target.value;
    localStorage.setItem('language', lang);
    loadContent(lang);
  });
});
