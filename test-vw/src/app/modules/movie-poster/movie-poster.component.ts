import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-movie-poster',
    templateUrl:'./movie-poster.component.html', 
    styleUrls: ['./movie-poster.component.css'],
    imports: [RouterModule],
})
export class MoviePosterComponent {
    @Input() id: string = '';
    @Input() posterUrl: string = '';
    @Input() title: string = '';

    
}