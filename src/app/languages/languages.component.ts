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
      map((changes: any[]) =>
        changes.map((c: any) => {
          const data = c.payload.doc.data() as Languages;
          return { id: c.payload.doc.id, ...data };
        })
      )
    ).subscribe((data: any[]) => {
      if (data.length > 0) {
        const langsRaw = data[0].languages;
    
        if (typeof langsRaw === 'string') {
          const langs: string = langsRaw;
          this.languagesList = langs.split(',').map((item: string) => item.trim());
        } else if (Array.isArray(langsRaw)) {
          this.languagesList = langsRaw.map((item: string) => item.trim());
        } else {
          console.warn("Formato de 'languages' inesperado:", langsRaw);
          this.languagesList = [];
        }
      }
    });
  }

}