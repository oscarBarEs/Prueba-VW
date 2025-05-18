import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
// app.component.ts
import { SessionService } from './core/services/session.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private session: SessionService, private http: HttpClient) {}

  async ngOnInit() {
    await this.session.initSession();
  }
}