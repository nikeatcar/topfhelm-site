const isRussian = window.location.pathname.includes('index-ru');

const albumData = {
  
  forty: {
  getHtml: (isRussian) => `
    <div class="album-card fade-in">
      <h3>${isRussian ? '"40" – Симфония Ушедших"' : '"40" – Symphony of the Departed"'}</h3>
      <p>
        ${isRussian
          ? '40-минутное путешествие в жанре Dungeon Synth и Dungeon Folk через первые дни после смерти. Вдохновлено христианскими обрядами, траурной музыкой и мистицизмом.'
          : 'A 40-minute Dungeon Synth & Dungeon Folk odyssey through the first days of death. Inspired by medieval Christian rites and the soul’s journey through darkness. Mournful chants, battle horns, and flickering light in the catacombs of memory.'}
      </p>

      <div class="players">
        <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/album/3veuEvIr7Pl4UseL8UxLa9?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>

      <div id="social-container">
        <div class="social-icons">
          <a href="https://topfhelm.bandcamp.com/album/40" target="_blank">
            <img src="icons/Bandcamp_icon.svg" alt="Listen to 40 by TopfHelm on BandCamp" loading="lazy">
          </a>
          <a href="https://soundcloud.com/topfhelmmusic/sets/40symphony" target="_blank">
            <img src="icons/Soundcloud_icon.svg" alt="Listen to 40 by TopfHelm on Soundcloud" loading="lazy">
          </a>
        </div>
      </div>

      <h2>${isRussian ? '🎥 Смотреть' : '🎥 Watch'}</h2>
      <section class="video-section">
        <div class="video-container">
          <div class="youtube-placeholder" data-video="qX5yWEfDsas">
            <img src="https://img.youtube.com/vi/qX5yWEfDsas/hqdefault.jpg" alt="Preview of TopfHelm album teaser video on YouTube" loading="lazy">
            <button class="play-btn">▶ Play</button>
          </div>
        </div>
      </section>

      <h2>${isRussian ? '🎁 Мерч' : '🎁 Related Merch'}</h2>
      <div class="merch-preview">
        <div class="bandcamp-merch-card">
          <img class="merch-cover" src="media/merch/40_cassette_4.webp" alt="TopfHelm – 40 Cassette">
          <p><strong>"40" – ${isRussian ? 'Коллекционное издание на кассете' : 'Limited Cassette Edition'}</strong></p>
          <p>${isRussian
            ? '40 минут ручной работы, уникальный арт и вложение с текстом. Для ценителей атмосферной медитативной музыки.'
            : '40-minute handcrafted Dungeon Synth journey. Limited edition with unique art & printed insert.'}</p>
          <a href="https://topfhelm.bandcamp.com/album/40" target="_blank" class="shop-btn">Buy on Bandcamp</a>
        </div>
      </div>
    </div>
  `
},

  sirgodric: {
    getHtml: (isRussian) =>`
        <div class="album-card fade-in">
          <h3>${isRussian ? '"Сэр Годрик" – Кровавое искупление' : '"Sir Godric" – The Bloody Redemption'}</h3>
          <p>
            ${isRussian
              ? 'Мрачная и абсурдная средневековая трагикомедия, рассказанная через Dungeon Synth и Dungeon Folk. Следуйте за проклятым рыцарем, теряющим веру, рассудок и кровь в поисках искупления.'
              : 'A grim yet absurd medieval tale told through Dungeon Synth & Dungeon Folk. Journey with a cursed knight as he descends into madness, battle, and tragicomedy.'}
          </p>

          <div class="players">
            <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/album/4KsZMaOI7RAtHqus19DaOP?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          </div>

          <div id="social-container">
            <div class="social-icons">
              <a href="https://topfhelm.bandcamp.com/album/sir-godric" target="_blank">
                <img src="icons/Bandcamp_icon.svg" alt="Listen to Sir Godric by TopfHelm on BandCamp" loading="lazy">
              </a>
              <a href="https://soundcloud.com/topfhelmmusic/sets/sir-godric" target="_blank">
                <img src="icons/Soundcloud_icon.svg" alt="Listen to Sir Godric by TopfHelm on Soundcloud" loading="lazy">
              </a>
            </div>
          </div>

          <h2>${isRussian ? '🎥 Смотреть' : '🎥 Watch'}</h2>
          <section class="video-section">
            <div class="video-container">
              <div class="youtube-placeholder" data-video="fcD2Mm-Yn-Q">
                <img src="https://img.youtube.com/vi/fcD2Mm-Yn-Q/hqdefault.jpg" alt="Sir Godric Cassette Preview" loading="lazy">
                <button class="play-btn">▶ Play</button>
              </div>
            </div>
          </section>

          <h2>${isRussian ? '🎁 Мерч' : '🎁 Related Merch'}</h2>
          <div class="merch-preview">
            <div class="bandcamp-merch-card">
              <img class="merch-cover" src="media/merch/sir_godric_cassette_1.webp" alt="Sir Godric Cassette">
              <p><strong>"Sir Godric" – ${isRussian ? 'Коллекционное издание на кассете' : "Collector's Cassette"}</strong></p>
              <p>${isRussian
                ? 'Полная версия с озвучкой, оформлением вручную и кроваво-красными деталями. Ограниченный и личный артефакт.'
                : 'Includes full narrated version with voice acting, handmade box and blood-red details. Limited & personal.'}</p>
              <a href="https://topfhelm.bandcamp.com/album/sir-godric" target="_blank" class="shop-btn">Buy on Bandcamp</a>
            </div>
          </div>
        </div>
      `
    },

  sanguis: {
    getHtml: (isRussian) => `
      <div class="album-card fade-in">
        <h3>"Sanguis et Mulsum" – ${isRussian ? 'Крестоносное Пьянство' : 'Crusader Debauchery'}</h3>
        <p>
          ${isRussian
            ? 'Dungeon Folk & Dungeon Synth, пропитанный вином и войной. Дебютный мини-альбом хаотичного средневекового безумия.'
            : 'Dungeon Folk & Synth drenched in wine and war. The debut EP of chaotic medieval delight.'}
        </p>

        <div class="players">
          <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/album/5MQbQmcU1hE2nAOtoikPMV?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>

        <div id="social-container">
          <div class="social-icons">
            <a href="https://topfhelm.bandcamp.com/album/sanguis-et-mulsum" target="_blank">
              <img src="icons/Bandcamp_icon.svg" alt="Listen to Sanguis et Mulsum by TopfHelm on BandCamp" loading="lazy">
            </a>
            <a href="https://soundcloud.com/topfhelmmusic/sets/sanguisetmulsum" target="_blank">
              <img src="icons/Soundcloud_icon.svg" alt="Listen to Sanguis et Mulsum by TopfHelm on Soundcloud" loading="lazy">
            </a>
          </div>
        </div>

        <h2>${isRussian ? '🎥 Смотреть' : '🎥 Watch'}</h2>
        <section class="video-section">
          <div class="video-container">
            <div class="youtube-placeholder" data-video="2KSd2DAOC90">
              <img src="https://img.youtube.com/vi/2KSd2DAOC90/hqdefault.jpg" alt="Sanguis et Mulsum Teaser" loading="lazy">
              <button class="play-btn">▶ Play</button>
            </div>
          </div>
        </section>
      </div>
    `
  }
};

// Основной скрипт
document.querySelectorAll('.album-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const selected = icon.dataset.album;
    if (!albumData[selected]) return;

    const container = document.getElementById('album-detail');
    if (!container) return;

    // Удаляем активный класс с других
    document.querySelectorAll('.album-icon').forEach(el => el.classList.remove('active'));
    icon.classList.add('active');

    // Плавная замена
    container.classList.remove('visible');
    setTimeout(() => {
    container.innerHTML = albumData[selected].getHtml(isRussian);
    initYouTubePlaceholders();
    container.classList.add('visible');
    }, 100);


    document.querySelectorAll('.album-icon').forEach(el =>
    el.classList.remove('active')
    );
    icon.classList.add('active');

    function initYouTubePlaceholders() {
    document.querySelectorAll('.youtube-placeholder').forEach(placeholder => {
        if (placeholder.dataset.initialized) return;
        placeholder.dataset.initialized = true;

        placeholder.addEventListener('click', () => {
        const videoId = placeholder.dataset.video;
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.width = '100%';
        iframe.height = '315';

        placeholder.replaceWith(iframe);
        });
    });
    }
  });
});
