import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { getMovieInfo } from '../../data/api/movie-api';
import { SessionService } from '../../core/services/session.service';
import { RouterModule } from '@angular/router';
import { MoviePosterComponent } from '../movie-poster/movie-poster.component';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MoviePosterComponent]
})
export class MovieGridComponent implements OnInit, OnChanges {
  @Input() movieIds: string[] = [];
  postersWithTitles: { id: string, url: string, title: string }[] = [];
  token: string | null = null;
  loading = false;

  constructor(private http: HttpClient, private session: SessionService) {}

// MovieGridComponent
async ngOnInit() {
  this.token = await this.session.getTokenAsync();
  if (this.movieIds.length > 0 && this.token) {
    await this.loadPosters();
  }
}


  async ngOnChanges(changes: SimpleChanges) {
    if (changes['movieIds'] && this.movieIds.length > 0) {
      if (this.token) {
        await this.loadPosters();
      }
    }
  }

  getSlug(title: string): string {
    return title.replace(/\s+/g, '-').toLowerCase();
  }

  private async loadPosters() {
    this.loading = true;
    const posters: { id: string, url: string, title: string }[] = [];

    for (const id of this.movieIds.slice(0, 10)) {
      try {
        const data = await getMovieInfo(this.http, this.token!, id);
        if (data?.poster_path) {
          posters.push({
            id,
            url: 'https://image.tmdb.org/t/p/w500' + data.poster_path,
            title: data.title
          });
        }
      } catch (e) {
        console.error('Error fetching movie', id, e);
      }
    }

    this.postersWithTitles = posters;
    this.loading = false;
  }
}
