﻿import { Component, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Component({
    selector: 'all-music',
    templateUrl: './all-music.component.html',
    styleUrls: ['./all-music.component.css']
})

export class AllMusicComponent {
    public tracks: Track[] = [];
    public totalTracks: number = 0;
    public p: number = 1;
    public pageSize: number = 10;
    public pageSizes: number[] = [10, 20, 30, 40, 50];
    public totalPages: number = 0;
    private url: string;
    private http: Http;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl;
        this.http = http;
        this.getTracks();

        http.get(baseUrl + 'api/MusicLibrary/CountAllTracks').subscribe(result => {
            this.totalTracks = result.json() as number;
            this.totalPages = Math.floor(this.totalTracks / this.pageSize) + 1;
        }, error => console.error(error));

    }

    public newPage(page: number) {
        this.p = page;
        this.getTracks();
    }

    public changePageSize(size: number) {
        this.p = 1; // reset to first page
        this.pageSize = size;
        this.getTracks();
    }

    private getTracks() {
        var search = new URLSearchParams();
        search.set('pageNum', this.p.toString()); // Add URL query param
        search.set('pageSize', this.pageSize.toString()); // Add URL query param
        this.http.get(this.url + 'api/MusicLibrary/AllTracks', { search: search }).subscribe(result => {
            this.tracks = result.json() as Track[];
        }, error => console.error(error));
    }
}

interface Track {
    trackId: number;
    album: string;
    albumArtist: string | null;
    artist: string;
    year: number | null;
    title: string;
    trackNum: number | null;
}