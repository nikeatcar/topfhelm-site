// TopfHelm Custom Audio Player
(function () {
    let activeAudio = null;
    let activeButton = null;

    function formatTime(seconds) {
        if (!isFinite(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return m + ":" + (s < 10 ? "0" + s : s);
    }

    function initTpPlayers() {
        const audioNodes = document.querySelectorAll('audio[data-tp-player]');
        if (!audioNodes.length) return;

        audioNodes.forEach((audio) => {
            // Чтобы не инициализировать один и тот же плеер несколько раз
            if (audio.dataset.tpInited === "1") return;
            audio.dataset.tpInited = "1";

            // Создаем оболочку плеера
            const wrapper = document.createElement("div");
            wrapper.className = "tp-player";

            const playBtn = document.createElement("button");
            playBtn.type = "button";
            playBtn.className = "tp-player-play is-paused";

            const iconSpan = document.createElement("span");
            iconSpan.className = "tp-player-icon";
            iconSpan.textContent = "▶";
            playBtn.appendChild(iconSpan);

            const bar = document.createElement("div");
            bar.className = "tp-player-bar";

            const fill = document.createElement("div");
            fill.className = "tp-player-fill";
            bar.appendChild(fill);

            const timeBox = document.createElement("div");
            timeBox.className = "tp-player-time";

            const curSpan = document.createElement("span");
            curSpan.className = "tp-player-current";
            curSpan.textContent = "0:00";

            const sepSpan = document.createElement("span");
            sepSpan.innerHTML = "&nbsp;/&nbsp;";

            const durSpan = document.createElement("span");
            durSpan.className = "tp-player-duration";
            durSpan.textContent = "0:00";

            timeBox.appendChild(curSpan);
            timeBox.appendChild(sepSpan);
            timeBox.appendChild(durSpan);

            wrapper.appendChild(playBtn);
            wrapper.appendChild(bar);
            wrapper.appendChild(timeBox);

            // Вставляем плеер перед скрытым <audio>
            audio.parentNode.insertBefore(wrapper, audio);

            // Когда метаданные загружены — ставим длительность
            audio.addEventListener("loadedmetadata", () => {
                durSpan.textContent = formatTime(audio.duration || 0);
            });

            // Обновляем прогресс + текущее время
            audio.addEventListener("timeupdate", () => {
    const current = audio.currentTime || 0;
    const duration = isFinite(audio.duration) ? audio.duration : 0;
    const percent = duration ? (current / duration) * 100 : 0;

    fill.style.width = percent + "%";
    curSpan.textContent = formatTime(current);

    // Если длительность ещё не подставлена, но уже известна — обновляем
    if (duration && durSpan.textContent === "0:00") {
        durSpan.textContent = formatTime(duration);
    }
});


            // При окончании — сбрасываем кнопку
            audio.addEventListener("ended", () => {
                audio.currentTime = 0;
                fill.style.width = "0%";
                curSpan.textContent = "0:00";
                playBtn.classList.add("is-paused");
                playBtn.querySelector(".tp-player-icon").textContent = "▶";
                if (activeAudio === audio) {
                    activeAudio = null;
                    activeButton = null;
                }
            });

            // Клик по кнопке play/pause
            playBtn.addEventListener("click", () => {
                // если играет другой трек — ставим его на паузу
                if (activeAudio && activeAudio !== audio) {
                    activeAudio.pause();
                    if (activeButton) {
                        activeButton.classList.add("is-paused");
                        activeButton.querySelector(".tp-player-icon").textContent = "▶";
                    }
                }

                if (audio.paused) {
                    audio.play();
                    activeAudio = audio;
                    activeButton = playBtn;
                    playBtn.classList.remove("is-paused");
                    playBtn.querySelector(".tp-player-icon").textContent = "❚❚";
                } else {
                    audio.pause();
                    playBtn.classList.add("is-paused");
                    playBtn.querySelector(".tp-player-icon").textContent = "▶";
                }
            });

            // Клик по полосе прогресса
            // Функция для установки позиции по событию
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

// Перетаскивание по прогресс-бару (drag, как в Spotify)
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

        });
    }

    document.addEventListener("DOMContentLoaded", initTpPlayers);

    // Для PJAX — если используешь
    if (window.jQuery && window.$) {
        $(document).on("pjax:complete", initTpPlayers);
    }
})();
