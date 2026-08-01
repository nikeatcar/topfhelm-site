class AudioPlayer {

    constructor() {

        this.audio = document.getElementById("audio");

        if (!this.audio) {
            throw new Error("Audio element not found");
        }

        this.audio.preload = "metadata";

    }

    load(src) {

        if (this.audio.src !== src) {
            this.audio.src = src;
            this.audio.load();
        }

    }

    play() {

        return this.audio.play();

    }

    pause() {

        this.audio.pause();

    }

    stop() {

        this.audio.pause();
        this.audio.currentTime = 0;

    }

    seek(seconds) {

        this.audio.currentTime = Number(seconds);

    }

    setVolume(volume) {

        this.audio.volume = Number(volume);

    }

    getVolume() {

        return this.audio.volume;

    }

    isPlaying() {

        return !this.audio.paused && !this.audio.ended;

    }

    getCurrentTime() {

        return this.audio.currentTime;

    }

    getDuration() {

        return this.audio.duration || 0;

    }

    on(event, callback) {

        this.audio.addEventListener(event, callback);

    }

}

window.AudioPlayer = AudioPlayer;