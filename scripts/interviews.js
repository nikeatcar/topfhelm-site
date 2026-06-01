// scripts/interviews.js

(function () {

    function isRussian() {
        return location.pathname.includes('/ru') ||
               document.body.classList.contains('ru');
    }

    function t(ru, en) {
        return isRussian() ? ru : en;
    }

    function renderInterviews() {

        const host = document.getElementById('interviews');

        if (!host) return;

        host.innerHTML = `
        
        <div class="featured-header">

            <div class="featured-label">
                ${t('Публикации', 'Featured In')}
            </div>

            <h2 class="featured-title">
                ${t(
                    'Интервью и публикации',
                    'Interviews & Publications'
                )}
            </h2>

            <p class="featured-subtitle">
                ${
                    t(
                        'Материалы о TopfHelm в музыкальных медиа, интервью и авторских каналах.',
                        'Articles, interviews and conversations about TopfHelm, Dungeon Folk and Dungeon Synth.'
                    )
                }
            </p>

        </div>

        <div class="featured-grid">

            <a
                class="featured-card"
                href="https://www.blacforjemagazine.com/interviews/interview-topfhelm"
                target="_blank"
                rel="noopener"
            >

                <div class="featured-type">
                    ${t('Текстовое интервью', 'Text Interview')}
                </div>

                <div class="featured-name">
                    Blacforje Magazine
                </div>

                <div class="featured-description">
                    ${
                        t(
                            'Интервью о Dungeon Folk, музыке, вдохновении и развитии проекта.',
                            'Interview about Dungeon Folk, creativity, inspiration and the evolution of the project.'
                        )
                    }
                </div>

                <div class="featured-arrow">
                    Read →
                </div>

            </a>

            <a
                class="featured-card"
                href="https://youtu.be/U-LhH7eHSA8?si=0KzkLGpljsiD36sx"
                target="_blank"
                rel="noopener"
            >

                <div class="featured-type">
                    ${t('Видео-интервью', 'Video Interview')}
                </div>

                <div class="featured-name">
                    Mayhem Facts & Quotes
                </div>

                <div class="featured-description">
                    ${
                        t(
                            'Разговор о творчестве, музыке и истории проекта TopfHelm.',
                            'Discussion about music, influences and the creative process behind TopfHelm.'
                        )
                    }
                </div>

                <div class="featured-arrow">
                    Watch →
                </div>

            </a>

            <a
                class="featured-card"
                href="https://youtu.be/He7gtqbDm9Q?si=puN8-qpaSijjpbdQ"
                target="_blank"
                rel="noopener"
            >

                <div class="featured-type">
                    ${t('Видео-интервью', 'Video Interview')}
                </div>

                <div class="featured-name">
                    BUGURT
                </div>

                <div class="featured-description">
                    ${
                        t(
                            'Интервью о Dungeon Synth, Dungeon Folk и современной средневековой музыке.',
                            'Interview about Dungeon Synth, Dungeon Folk and modern medieval music.'
                        )
                    }
                </div>

                <div class="featured-arrow">
                    Watch →
                </div>

            </a>

        </div>

        <div class="featured-stats">
            3 Interviews • 2 Video • 1 Print
        </div>
        `;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderInterviews);
    } else {
        renderInterviews();
    }

    window.addEventListener('languageChanged', renderInterviews);
    document.addEventListener('pjax:complete', renderInterviews);

})();
