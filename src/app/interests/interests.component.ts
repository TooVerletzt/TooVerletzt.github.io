import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent {
  interestsList: string[] = [];

  constructor(public interestsService: InterestsService) {
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.doc.data() as Interests;
          return { id: c.payload.doc.id, ...data };
        })
      )
    ).subscribe(data => {
      if (data.length > 0) {
        const rawInterests = data[0].interests;

        if (typeof rawInterests === 'string') {
          this.interestsList = rawInterests.split(',').map(item => item.trim());
        } else if (Array.isArray(rawInterests)) {
          this.interestsList = rawInterests;
        } else {
          console.warn("Formato de 'interests' inesperado:", rawInterests);
          this.interestsList = [];
        }
      }
    });
  }
}

