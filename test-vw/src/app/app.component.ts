import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-vw';

  constructor(private http: HttpClient) {}

  getImdbData() {
    const url = 'https://imdb236.p.rapidapi.com/api/imdb/top250-movies';
    const headers = new HttpHeaders({
      'x-rapidapi-key': 'd04abcadacmsh0cafe8734fabf71p140b6bjsn55e53eacb038',
      'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    });

    this.http.get(url, { headers }).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }
}