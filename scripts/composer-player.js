(function () {
    function formatTime(sec) {
        sec = Math.floor(sec || 0);
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return m + ":" + (s < 10 ? "0" + s : s);
    }

    function setupPlayer(audio) {
        // Уже инициализирован? Выходим.
        if (audio.dataset.tpInit === "1") return;
        audio.dataset.tpInit = "1";

        audio.controls = false;

        const wrapper = document.createElement("div");
        wrapper.className = "tp-player";

        // Кнопка play/pause
        const playBtn = document.createElement("button");
        playBtn.className = "tp-player-play is-paused";
        playBtn.type = "button";
        playBtn.innerHTML = '<span class="tp-player-icon">▶</span>';

        // Прогресс-бар
        const bar = document.createElement("div");
        bar.className = "tp-player-bar";

        const fill = document.createElement("div");
        fill.className = "tp-player-fill";
        bar.appendChild(fill);

        // Время
        const timeBox = document.createElement("div");
        timeBox.className = "tp-player-time";

        const curSpan = document.createElement("span");
        const sep = document.createTextNode(" / ");
        const durSpan = document.createElement("span");

        curSpan.textContent = "0:00";
        durSpan.textContent = "0:00";

        timeBox.appendChild(curSpan);
        timeBox.appendChild(sep);
        timeBox.appendChild(durSpan);

        wrapper.appendChild(playBtn);
        wrapper.appendChild(bar);
        wrapper.appendChild(timeBox);

        // Вставляем после audio
        audio.parentNode.insertBefore(wrapper, audio.nextSibling);
        audio.style.display = "none";

        // Обновление длительности
        function setDuration() {
            if (isFinite(audio.duration) && durSpan.textContent === "0:00") {
                durSpan.textContent = formatTime(audio.duration);
            }
        }

        audio.addEventListener("loadedmetadata", setDuration);

        // Обновление прогресса
        audio.addEventListener("timeupdate", () => {
            const current = audio.currentTime || 0;
            const duration = isFinite(audio.duration) ? audio.duration : 0;
            const percent = duration ? (current / duration) * 100 : 0;

            fill.style.width = percent + "%";
            curSpan.textContent = formatTime(current);

            if (duration && durSpan.textContent === "0:00") {
                durSpan.textContent = formatTime(duration);
            }
        });

        // Play/Pause
        playBtn.addEventListener("click", () => {
            // Останавливаем другие плееры
            document.querySelectorAll("audio[data-tp-player]").forEach(a => {
                if (a !== audio) {
                    a.pause();
                }
            });

            if (audio.paused) {
                audio.play();
                playBtn.classList.remove("is-paused");
                playBtn.classList.add("is-playing");
                playBtn.innerHTML = '<span class="tp-player-icon">❚❚</span>';
            } else {
                audio.pause();
                playBtn.classList.add("is-paused");
                playBtn.classList.remove("is-playing");
                playBtn.innerHTML = '<span class="tp-player-icon">▶</span>';
            }
        });

        // Сбрасываем кнопку в паузу по окончании
        audio.addEventListener("ended", () => {
            playBtn.classList.add("is-paused");
            playBtn.classList.remove("is-playing");
            playBtn.innerHTML = '<span class="tp-player-icon">▶</span>';
        });

        // Перемотка по клику/перетаскиванию
        function seekFromEvent(e) {
            const rect = bar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const ratio = Math.min(Math.max(x / rect.width, 0), 1);

            if (isFinite(audio.duration)) {
                audio.currentTime = audio.duration * ratio;
            }
        }

        let seeking = false;
        let wasPlaying = false;

        bar.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            seeking = true;
            wasPlaying = !audio.paused;

            if (wasPlaying) audio.pause();

            seekFromEvent(e);

            const handleMove = (ev) => {
                if (!seeking) return;
                seekFromEvent(ev);
            };

            const handleUp = (ev) => {
                seekFromEvent(ev);
                seeking = false;

                if (wasPlaying) audio.play();

                document.removeEventListener("pointermove", handleMove);
                document.removeEventListener("pointerup", handleUp);
            };

            document.addEventListener("pointermove", handleMove);
            document.addEventListener("pointerup", handleUp);
        });
    }

    function initTpPlayers() {
        const audios = document.querySelectorAll('audio[data-tp-player]');
        if (!audios.length) return;

        audios.forEach(setupPlayer);
    }

    // Инициализация при первой загрузке
    document.addEventListener("DOMContentLoaded", initTpPlayers);

    // Инициализация после PJAX-перехода
    if (window.$ && $(document).on) {
        $(document).on("pjax:complete", function () {
            initTpPlayers();
        });
    }
})();
