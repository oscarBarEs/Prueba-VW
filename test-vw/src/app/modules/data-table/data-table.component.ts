import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../core/services/session.service';
import { discoverMovies,getGenresMap } from '../../data/api/movie-api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements OnInit {
  movies: any[] = [];
  genresMap: { [id: number]: string } = {};
  currentSort: string = 'popularity.desc';
  token: string | null = null;
  currentPage = "1";
  currenntPageNumber = 1;

  constructor(private http: HttpClient, private session: SessionService) {}
  async ngOnInit() {
    this.token = await this.session.getToken();
    if (!this.token) {return};
    this.genresMap = await getGenresMap(this.http, this.token);

    this.movies =  await discoverMovies(this.http, this.token, this.currentPage, 'popularity.desc');
    console.log(this.movies);
}
  async orderBy(sort: string) {
    this.currentSort = sort;

    if (!this.token) return;
    this.movies = await discoverMovies(this.http, this.token, this.currentPage, sort);
  }

  async toggleSort(field: string) {
  let direction = 'desc';
  if (this.currentSort.startsWith(field)) {
    direction = this.currentSort.endsWith('.desc') ? 'asc' : 'desc';
  }
  this.currentSort = `${field}.${direction}`;
  const token = this.session.getToken();
    this.currentPage = "1";
    this.currenntPageNumber = 1;
  if (!this.token) return;
  this.movies = await discoverMovies(this.http, this.token, this.currentPage, this.currentSort);
}
  async changePage(page: number) {
    if (page < 1) return;
    this.currentPage = page.toString();
    this.currenntPageNumber = page;
    if (!this.token) return;
    this.movies = await discoverMovies(this.http, this.token, this.currentPage.toString(), this.currentSort);
  }
}