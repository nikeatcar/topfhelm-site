function initTpPlayers() {
    function formatTime(sec) {
        sec = Math.floor(sec || 0);
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return m + ":" + (s < 10 ? "0" + s : s);
    }

    function resetOtherPlayers(currentAudio) {
        document.querySelectorAll("audio[data-tp-player]").forEach((audio) => {
            if (audio !== currentAudio) {
                audio.pause();

                const player = audio.nextElementSibling;

                if (player && player.classList.contains("tp-player")) {
                    const btn = player.querySelector(".tp-player-play");

                    if (btn) {
                        btn.classList.add("is-paused");
                        btn.classList.remove("is-playing");
                        btn.innerHTML = '<span class="tp-player-icon">▶</span>';
                    }
                }
            }
        });
    }

    function setupPlayer(audio) {
        if (audio.dataset.tpInit === "1") return;

        audio.dataset.tpInit = "1";
        audio.controls = false;

        const wrapper = document.createElement("div");
        wrapper.className = "tp-player";

        const playBtn = document.createElement("button");
        playBtn.className = "tp-player-play is-paused";
        playBtn.type = "button";
        playBtn.innerHTML = '<span class="tp-player-icon">▶</span>';

        const bar = document.createElement("div");
        bar.className = "tp-player-bar";

        const fill = document.createElement("div");
        fill.className = "tp-player-fill";

        bar.appendChild(fill);

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

        audio.parentNode.insertBefore(wrapper, audio.nextSibling);
        audio.style.display = "none";

        function updateDuration() {
            if (isFinite(audio.duration)) {
                durSpan.textContent = formatTime(audio.duration);
            }
        }

        function updateProgress() {
            const current = audio.currentTime || 0;
            const duration = isFinite(audio.duration) ? audio.duration : 0;
            const percent = duration ? (current / duration) * 100 : 0;

            fill.style.width = percent + "%";
            curSpan.textContent = formatTime(current);

            if (duration) {
                durSpan.textContent = formatTime(duration);
            }
        }

        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("durationchange", updateDuration);
        audio.addEventListener("timeupdate", updateProgress);

        playBtn.addEventListener("click", () => {
            resetOtherPlayers(audio);

            if (audio.paused) {
                audio.play()
                    .then(() => {
                        playBtn.classList.remove("is-paused");
                        playBtn.classList.add("is-playing");
                        playBtn.innerHTML = '<span class="tp-player-icon">❚❚</span>';
                    })
                    .catch((error) => {
                        console.warn("Audio playback failed:", error);
                    });
            } else {
                audio.pause();

                playBtn.classList.add("is-paused");
                playBtn.classList.remove("is-playing");
                playBtn.innerHTML = '<span class="tp-player-icon">▶</span>';
            }
        });

        audio.addEventListener("pause", () => {
        if (isSeekingPause) return;

        playBtn.classList.add("is-paused");
        playBtn.classList.remove("is-playing");
        playBtn.innerHTML = '<span class="tp-player-icon">▶</span>';
        });

        audio.addEventListener("ended", () => {
            playBtn.classList.add("is-paused");
            playBtn.classList.remove("is-playing");
            playBtn.innerHTML = '<span class="tp-player-icon">▶</span>';

            fill.style.width = "0%";
            curSpan.textContent = "0:00";
        });

        function seekFromEvent(event) {
            const rect = bar.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const ratio = Math.min(Math.max(x / rect.width, 0), 1);

            if (isFinite(audio.duration)) {
                audio.currentTime = audio.duration * ratio;
            }
        }

        let seeking = false;
        let wasPlaying = false;
        let isSeekingPause = false;

        bar.addEventListener("pointerdown", (event) => {
            event.preventDefault();

            seeking = true;
            wasPlaying = !audio.paused;

            if (wasPlaying) {
            audio.play()
                .then(() => {
                    isSeekingPause = false;

                    playBtn.classList.remove("is-paused");
                    playBtn.classList.add("is-playing");
                    playBtn.innerHTML = '<span class="tp-player-icon">❚❚</span>';
                })
                .catch((error) => {
                    isSeekingPause = false;
                    console.warn("Audio resume failed:", error);
                });
                } else {
                    isSeekingPause = false;
                }

            seekFromEvent(event);

            const handleMove = (moveEvent) => {
                if (!seeking) return;
                seekFromEvent(moveEvent);
            };

            const handleUp = (upEvent) => {
                seekFromEvent(upEvent);
                seeking = false;

                if (wasPlaying) {
                    audio.play().catch((error) => {
                        console.warn("Audio resume failed:", error);
                    });
                }

                document.removeEventListener("pointermove", handleMove);
                document.removeEventListener("pointerup", handleUp);
            };

            document.addEventListener("pointermove", handleMove);
            document.addEventListener("pointerup", handleUp);
        });

        if (audio.readyState >= 1) {
            updateDuration();
        }
    }

    const audios = document.querySelectorAll("audio[data-tp-player]");

    audios.forEach(setupPlayer);
}