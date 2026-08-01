class RadioManager {

    constructor() {
        this.player = null;
    }

    async init() {

        this.player = new AudioPlayer();

        this.player.setVolume(0.5);

        this.bindUI();

        await this.loadRandomAlbum();
        try {
    await this.player.play();
} catch (e) {
    console.log(e);
}

    }

    async loadRandomAlbum() {

        const { folder, data: album } =
            await RadioLoader.loadRandomAlbum();

       playlist.setTracks(

    album.tracks.map(track => ({

        title: track.title,
        album: album.title,

        cover:
            `https://cdn.topfhelm.com/audio/albums/${folder}/${album.cover}`,

        audio:
            `https://cdn.topfhelm.com/audio/albums/${folder}/${track.file}`,

        links: {
            shop: album.links.shop,
            bandcamp: album.links.bandcamp,
            spotify: album.links.spotify
        }

    }))

);

        playlist.setCurrent(
            Math.floor(Math.random() * playlist.size())
        );

        this.loadTrack(
            playlist.getCurrent()
        );

    }

    updateRangeFill(slider, percent) {

        slider.style.background =
            `linear-gradient(to right,
            #b89958 0%,
            #b89958 ${percent}%,
            #3d3220 ${percent}%,
            #3d3220 100%)`;

    }

    loadTrack(track) {

    if (!track) return;

    this.player.load(track.audio);

    document.getElementById("radio-track").textContent =
        track.title;

    document.getElementById("radio-album").textContent =
        track.album;

    document.getElementById("radio-cover").src =
        track.cover;

    const shop = document.getElementById("shop-link");
    const bandcamp = document.getElementById("bandcamp-link");
    const spotify = document.getElementById("spotify-link");

    if (shop) {
        shop.href = track.links.shop;
    }

    if (bandcamp) {
        bandcamp.href = track.links.bandcamp;
    }

    if (spotify) {
    spotify.href = track.links.spotify;
    }

    if ("mediaSession" in navigator) {

        navigator.mediaSession.metadata =
            new MediaMetadata({

                title: track.title,
                artist: "TopfHelm",
                album: track.album,

                artwork: [{
                    src: track.cover
                }]

            });

    }

}

    bindUI() {

        const playBtn = document.getElementById("play-btn");
        const nextBtn = document.getElementById("next-btn");
        const prevBtn = document.getElementById("prev-btn");

        const progress = document.getElementById("progress");
        const currentTime = document.getElementById("current-time");
        const duration = document.getElementById("duration");

        const volume = document.getElementById("volume");

        let isSeeking = false;

        this.updateRangeFill(volume, 50);

        playBtn.addEventListener("click", async () => {

            if (this.player.isPlaying()) {

                this.player.pause();

            } else {

                try {
                    await this.player.play();
                } catch (e) {
                    console.log(e);
                }

            }

        });

        nextBtn.addEventListener("click", () => this.next());

        prevBtn.addEventListener("click", () => this.prev());

        volume.addEventListener("input", () => {

            this.player.setVolume(volume.value);

            this.updateRangeFill(
                volume,
                volume.value * 100
            );

        });

        this.player.on("play", () => {

            playBtn.textContent = "⏸";

        });

        this.player.on("pause", () => {

            playBtn.textContent = "▶";

        });

        this.player.on("ended", async () => {

            await this.loadRandomAlbum();

            try {
                await this.player.play();
            } catch (e) {
                console.log(e);
            }

        });

        this.player.on("loadedmetadata", () => {

            progress.max = this.player.getDuration();

            duration.textContent = this.formatTime(
                this.player.getDuration()
            );

        });

       this.player.on("timeupdate", () => {

                if (!isSeeking) {
                    progress.value = this.player.getCurrentTime();
                }

                currentTime.textContent = this.formatTime(
                    this.player.getCurrentTime()
                );

                const percent =
                    progress.max > 0
                        ? progress.value / progress.max * 100
                        : 0;

                this.updateRangeFill(
                    progress,
                    percent
                );

            });

        if ("mediaSession" in navigator) {

    navigator.mediaSession.setActionHandler(
        "play",
        () => this.player.play()
    );

    navigator.mediaSession.setActionHandler(
        "pause",
        () => this.player.pause()
    );

    navigator.mediaSession.setActionHandler(
        "nexttrack",
        () => this.next()
    );

    navigator.mediaSession.setActionHandler(
        "previoustrack",
        () => this.prev()
    );

}

      progress.addEventListener("pointerdown", () => {
    isSeeking = true;
});

progress.addEventListener("pointerup", async () => {

    isSeeking = false;

    await this.player.seek(Number(progress.value));

});

progress.addEventListener("input", () => {

    const percent =
        progress.max > 0
            ? progress.value / progress.max * 100
            : 0;

    this.updateRangeFill(progress, percent);

});

    }

    formatTime(seconds) {

        seconds = Math.floor(seconds);

        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;

        return `${min}:${sec.toString().padStart(2, "0")}`;

    }

    async next() {

    await this.loadRandomAlbum();

    try {
        await this.player.play();
    } catch (e) {
        console.log(e);
    }

}

async prev() {

    if (this.player.getCurrentTime() > 3) {

        this.player.seek(0);
        return;

    }

    this.loadTrack(
        playlist.prev()
    );

    try {
        await this.player.play();
    } catch (e) {
        console.log(e);
    }

}

}

window.radioManager = new RadioManager();