document.addEventListener('DOMContentLoaded', async () => {
  const userToken = localStorage.getItem('token');
  const lang = localStorage.getItem('language') || 'uk';
  if (!userToken) return;

  // Функція отримання сповіщень від сервера
  async function fetchNotifications() {
    try {
      const res = await fetch('/api/homework/notifications', {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      return res.ok ? await res.json() : [];
    } catch (err) {
      console.error('Помилка завантаження сповіщень', err);
      return [];
    }
  }

  const badge = document.getElementById('notificationCount');
  const list = document.getElementById('notificationList');
  const icon = document.getElementById('notificationIcon');

  // Оновлення сповіщень
  async function updateNotificationsUI() {
    const notifications = await fetchNotifications();
    if (notifications.length > 0) {
      badge.textContent = notifications.length;
      badge.classList.remove('hidden');
    } else {
      badge.textContent = 0;
      badge.classList.add('hidden');
    }
    return notifications;
  }

  // Показ списку сповіщень
  icon.onclick = async () => {
    const notifications = await updateNotificationsUI();
    if (list.style.display === 'none') {
      list.innerHTML = notifications.length > 0
        ? notifications.map(n => `
            <div style="padding:5px; border-bottom:1px solid #58a6ff;">
              <strong>${lang === 'en' ? 'Lesson' : 'Урок'} #${n.lessonNumber}</strong><br>
              ${lang === 'en' ? 'Admin comment:' : 'Коментар адміна:'} ${n.adminComment}
            </div>
          `).join('')
        : `<div style="padding:5px;">${lang === 'en' ? 'No new notifications' : 'Немає нових сповіщень'}</div>`;
      list.style.display = 'block';

      // Позначаємо всі як прочитані
      for (const n of notifications) {
        if (!n.isRead) {
          await fetch(`/api/homework/${n._id}/read`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${userToken}` }
          });
          n.isRead = true;
        }
      }
      badge.textContent = 0;
      badge.classList.add('hidden');
    } else {
      list.style.display = 'none';
    }
  };

  // Початкове оновлення
  await updateNotificationsUI();

  // Перевірка нових сповіщень кожні 10 секунд
  setInterval(updateNotificationsUI, 10000);
});