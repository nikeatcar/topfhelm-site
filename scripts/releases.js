const isRussian = window.location.pathname.includes('/ru');

const albumData = {
  
spadcyna: {
  getHtml: (isRussian) => `
    <div class="album-card fade-in">
      <h3>"Spadčyna" – ${isRussian ? 'Наследие' : 'Heritage'}</h3>
      <p>
        ${isRussian
          ? 'Полноформатный альбом из 25 треков, основанный на белорусском фольклоре. Более 80 минут атмосферной музыки, где переплетаются древние обряды, лесные духи, женские напевы и ритуальные мотивы. Осмысленное путешествие в культурное наследие Беларуси, выполненное в стиле Dungeon Folk и Medieval Ambient.'
          : 'A full-length 25-track album rooted in Belarusian folklore. Over 80 minutes of atmospheric music shaped by ancient rituals, forest spirits, traditional chants and mystical Slavic motifs. A deep journey into Belarusian cultural heritage, crafted through Dungeon Folk and Medieval Ambient.'}
      </p>

       
          <div class="cta-buttons">
            <a href="https://distrokid.com/hyperfollow/topfhelm/spadyna" target="_blank" class="shop-btn">
              ${isRussian ? '🎧 Предсохранить альбом' : '🎧 Presave'}
            </a>
          </div>
        </div>
      </div>
    </div>
  `
},



        solemnis: {
    getHtml: (isRussian) => `
      <div class="album-card fade-in">
        <h3>"Solemnis" – ${isRussian ? 'Торжественный Dungeon Synth' : 'Majestic Dungeon Synth'}</h3>
        <p>
          ${isRussian
            ? 'Энергичный и величественный EP, вдохновлённый саундтреками 70-х. Dungeon Synth и Dungeon Folk в торжественной форме.'
            : 'An energetic and majestic EP inspired by 70s film scores. Dungeon Synth and Dungeon Folk in ceremonial form.'}
        </p>

        <div class="players">
        <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/album/5wp4FkIgpd9fVTTiW5b2ar?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>

      <div id="social-container">
        <div class="social-icons">
          <a href="https://topfhelm.bandcamp.com/album/solemnis" target="_blank">
            <img src="icons/Bandcamp_icon.svg" alt="Listen to Solemnis by TopfHelm on BandCamp" loading="lazy">
          </a>
          <a href="https://soundcloud.com/topfhelmmusic/sets/solemnis" target="_blank">
            <img src="icons/Soundcloud_icon.svg" alt="Listen to Solemnis by TopfHelm on Soundcloud" loading="lazy">
          </a>
        </div>
      </div>

        <h2>${isRussian ? '🎁 Мерч' : '🎁 Related Merch'}</h2>
        <div class="merch-preview">
          <div class="bandcamp-merch-card">
            <img class="merch-cover" src="media/merch/solemnis_cd_5.webp" alt="Solemnis CD">
            <p><strong>"Solemnis" – ${isRussian ? 'Коллекционное издание на CD' : "Collector's CD Edition"}</strong></p>
            <p>${isRussian
              ? 'Фирменный CD в Jewel box с вкладышем, оформленным в торжественном стиле альбома. Лимитированный тираж.'
              : 'Official CD in Jewel box with an insert in the album’s ceremonial style. Limited edition.'}</p>
            <a href="https://topfhelm.bandcamp.com/album/solemnis" target="_blank" class="shop-btn">Buy on Bandcamp</a>
            </a>
          </div>
        </div>
      </div>
    `
  },
  
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

          <h2>${isRussian ? '📰 Обзоры' : '📰 Reviews'}</h2>
          <div class="reviews-section">
            <ul>
              <li>
                <a href="https://www.blacforjemagazine.com/reviews/sir-godric-by-topfhelm" target="_blank">
                  ${isRussian ? 'Обзор от журнала Blacforje Magazine' : 'Blacforje Magazine Review'}
                </a>
              </li>
            </ul>
          </div>

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
