const Store = require('electron-store');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class MusicData extends Store {
    constructor(settings) {
        super(settings);
        this.tracks = this.get('tracks') || [];
    }

    saveTracks() {
        this.set('tracks', this.tracks);
        return this;
    }

    getTracks() {
        return this.get('tracks') || [];
    }

    addTracks(tracks) {
        const tracksWithProps = tracks.map( track => {
            return {
                id: uuidv4(),
                path: track,
                name: path.basename(track)
            }
        }).filter( track => {
            const currentTracks = this.getTracks().map(track => track.path);
            return currentTracks.indexOf(track.path) < 0;
        });
        this.tracks = [ ...this.tracks, ...tracksWithProps ];
        return this.saveTracks();
    }

    deleteTrack(id) {
        this.tracks = this.tracks.filter(track => track.id !== id);
        this.saveTracks();
    }
}

module.exports = MusicData;