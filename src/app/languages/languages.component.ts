import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent {
  languagesList: string[] = [];

  constructor(public languagesService: LanguagesService) {
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() as Languages })
        )
      )
    ).subscribe(data => {
      if (data.length > 0) {
        this.languagesList = data[0].languages;
      }
    });
  }
}

