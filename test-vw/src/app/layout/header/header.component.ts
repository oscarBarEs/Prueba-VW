import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../core/services/session.service';
import { searchMovies } from '../../data/api/movie-api';

import { FormsModule } from '@angular/forms'; // <-- Añade esto
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnInit{
  isDarkMode = true;
  searchTerm: string = '';
  searchResults: any[] = [];
  searching = false;
  token: string | null = null;

  constructor(private session: SessionService, private http: HttpClient, private router: Router) {}

async ngOnInit() {
  let theme = 'dark';
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  if (isBrowser && window.localStorage) {
    theme = localStorage.getItem('theme') || 'dark';
  }
  this.isDarkMode = theme === 'dark';
  if (isBrowser) {
    const html = document.documentElement;
    html.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light');
  }
  this.token = await this.session.getToken();
  if (!this.token) { return; }
}

toggleTheme() {
  this.isDarkMode = !this.isDarkMode;
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  if (isBrowser) {
    const html = document.documentElement;
    html.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light');
    if (window.localStorage) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }
}
  async onSearchInput() {
    if (!this.token || !this.searchTerm.trim()) {
      this.searchResults = [];
      return;
    }
    this.searching = true;
    this.searchResults = await searchMovies(this.http, this.token, this.searchTerm, '', '1');
    this.searching = false;
  }

  goToMovie(id: string) {
    this.searchResults = [];
    this.searchTerm = '';
    this.router.navigate(['/movie', id]);
  }
}