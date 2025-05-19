import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../core/services/session.service';
import { discoverMovies,getGenresMap,searchMovies } from '../../data/api/movie-api';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- Añade esto

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements OnInit {
  movies: any[] = [];
  genresMap: { [id: number]: string } = {};
  currentSort: string = 'popularity.desc';
  token: string | null = null;
  currentPage = "1";
  currenntPageNumber = 1;
  searchByYear: string = '';
  voteAverageGte: string = '';
  voteAverageLte: string = '';

  loading = false;

  constructor(private http: HttpClient, private session: SessionService) {}
  async ngOnInit() {
        this.loading = true;

    this.token = await this.session.getToken();
    if (!this.token) {return};
    this.genresMap = await getGenresMap(this.http, this.token);

    this.movies = await discoverMovies(
      this.http,
      this.token,
      this.currentPage,
      this.currentSort,
      this.voteAverageGte,
      this.voteAverageLte,
      this.searchByYear
    );
    console.log(this.movies);
    this.loading = false;

}
  async orderBy(sort: string) {
    this.currentSort = sort;

    if (!this.token) return;
    this.loading = true;
    this.movies = await discoverMovies(
      this.http,
      this.token,
      this.currentPage,
      this.currentSort,
      this.voteAverageGte,
      this.voteAverageLte,
      this.searchByYear
    );
    
    this.loading = false;
  }

async toggleSort(field: string) {
  // Ciclo: popular.desc -> field.asc -> field.desc -> popular.desc ...
  if (this.currentSort === 'popularity.desc') {
    this.currentSort = `${field}.asc`;
  } else if (this.currentSort === `${field}.asc`) {
    this.currentSort = `${field}.desc`;
  } else if (this.currentSort === `${field}.desc`) {
    this.currentSort = 'popularity.desc';
  } else {
    this.currentSort = `${field}.asc`;
  }
  this.currentPage = "1";
  this.currenntPageNumber = 1;
  if (!this.token) return;
  this.loading = true;
    this.movies = await discoverMovies(
      this.http,
      this.token,
      this.currentPage,
      this.currentSort,
      this.voteAverageGte,
      this.voteAverageLte,
      this.searchByYear
    );
    this.loading = false;
}
  async changePage(page: number) {
    if (page < 1) return;
    this.currentPage = page.toString();
    this.currenntPageNumber = page;
    if (!this.token) return;
    
    this.loading = true;

    this.movies = await discoverMovies(
      this.http,
      this.token,
      this.currentPage,
      this.currentSort,
      this.voteAverageGte,
      this.voteAverageLte,
      this.searchByYear
    );
        
    this.loading = false;
  }

    async onSearch(event: Event) {
      event.preventDefault();
      if (!this.token) return;
      this.currentPage = "1";
      this.currenntPageNumber = 1;
          this.loading = true;


    this.movies = await discoverMovies(
      this.http,
      this.token,
      this.currentPage,
      this.currentSort,
      this.voteAverageGte,
      this.voteAverageLte,
      this.searchByYear
    );
          
          this.loading = false;

    }

  async onSearchInput() {
  if (!this.token) return;
    this.loading = true;
    this.movies = await discoverMovies(
      this.http,
      this.token,
      this.currentPage,
      this.currentSort,
      this.voteAverageGte,
      this.voteAverageLte,
      this.searchByYear
    );
        this.loading = false;

}
}