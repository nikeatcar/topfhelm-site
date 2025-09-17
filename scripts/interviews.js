// scripts/interviews.js
(function () {
  const t = (ru, en) => (isRussian() ? ru : en);

  function isRussian() {
    // оба способа: по URL и по классу на body
    return location.pathname.includes('/ru') || document.body.classList.contains('ru');
  }

  function renderInterviews() {
    const host = document.getElementById('interviews');
    if (!host) return;

    host.innerHTML = `
      <h2 class="section-title">
        <span>🎙️ ${t('Интервью', 'Interviews')}</span>
      </h2>

      <div class="interviews-grid">
        <!-- Текстовые интервью -->
        <div class="interviews-col">
          <h3 class="col-title">📰 ${t('Текст', 'Text')}</h3>
          <a class="interview-link"
             href="https://www.blacforjemagazine.com/interviews/interview-topfhelm"
             target="_blank" rel="noopener">
            ${t('Интервью для Blacforje Magazine', 'Interview with Blacforje Magazine')}
          </a>
        </div>

        <!-- Видео-интервью -->
        <div class="interviews-col">
          <h3 class="col-title">🎥 ${t('Видео', 'Video')}</h3>
          <a class="interview-link"
             href="https://youtu.be/U-LhH7eHSA8?si=0KzkLGpljsiD36sx"
             target="_blank" rel="noopener">
            ${t('Интервью каналу "Mayhem Facts & Quotes"', '"Mayhem Facts & Quotes" channel Interview')}
          </a>
        </div>
      </div>
    `;
  }

  // Первичный рендер
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderInterviews);
  } else {
    renderInterviews();
  }

  // Если твой langchange.js диспатчит событие — перерисовываем
  window.addEventListener('languageChanged', renderInterviews);

  // На случай PJAX (у тебя стоит pjax): перерисовка после подмены контента
  document.addEventListener('pjax:complete', renderInterviews);
})();
