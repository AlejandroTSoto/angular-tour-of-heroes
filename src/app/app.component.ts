import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//cambiar el titulo de la pagina y en el .html se llama a esta variable
export class AppComponent {
  title = 'Tour of Heroes';
}
