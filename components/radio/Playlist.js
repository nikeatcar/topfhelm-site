class Playlist {

    constructor() {

        this.tracks = [];
        this.current = 0;

    }

    setTracks(tracks) {

        this.tracks = tracks || [];
        this.current = 0;

    }

    setCurrent(index) {

        if (this.tracks.length === 0) return;

        this.current = Math.max(
            0,
            Math.min(index, this.tracks.length - 1)
        );

    }

    getCurrent() {

        if (this.tracks.length === 0)
            return null;

        return this.tracks[this.current];

    }

    hasNext() {

        return this.current < this.tracks.length - 1;

    }

    hasPrev() {

        return this.current > 0;

    }

    isLast() {

        return this.current === this.tracks.length - 1;

    }

    next() {

        if (this.tracks.length === 0)
            return null;

        this.current++;

        if (this.current >= this.tracks.length)
            this.current = 0;

        return this.getCurrent();

    }

    prev() {

        if (this.tracks.length === 0)
            return null;

        this.current--;

        if (this.current < 0)
            this.current = this.tracks.length - 1;

        return this.getCurrent();

    }

    size() {

        return this.tracks.length;

    }

}

window.playlist = new Playlist();