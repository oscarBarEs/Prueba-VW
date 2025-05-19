import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isDarkMode = true;

toggleTheme() {
  this.isDarkMode = !this.isDarkMode;
  const html = document.documentElement;
  html.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light');
  localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
}

ngOnInit() {
  const theme = localStorage.getItem('theme');
  this.isDarkMode = theme === 'dark';
  const html = document.documentElement;
  html.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light');
}

}