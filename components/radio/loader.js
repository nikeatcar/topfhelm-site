class RadioLoader {

    static CDN = "https://cdn.topfhelm.com/audio/albums";

    static async init() {

        // Зарезервировано для будущей инициализации.
        // Пока ничего делать не нужно.

    }

    static async loadAlbums() {

        const response = await fetch(`${this.CDN}/albums.json`);

        if (!response.ok) {
            throw new Error(`Cannot load albums: ${response.status}`);
        }

        return await response.json();

    }

    static async loadAlbum(folder) {

        const response = await fetch(`${this.CDN}/${folder}/info.json`);

        if (!response.ok) {
            throw new Error(`Cannot load album "${folder}": ${response.status}`);
        }

        return await response.json();

    }

    static async loadRandomAlbum() {

        const albums = await this.loadAlbums();

        const enabled = albums.filter(album => album.enabled);

        if (enabled.length === 0) {
            throw new Error("No enabled albums found.");
        }

        const random =
            enabled[Math.floor(Math.random() * enabled.length)];

        return {
            folder: random.folder,
            data: await this.loadAlbum(random.folder)
        };

    }

}

window.RadioLoader = RadioLoader;