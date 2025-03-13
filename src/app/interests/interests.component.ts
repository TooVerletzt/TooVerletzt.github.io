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
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() as Interests })
        )
      )
    ).subscribe(data => {
      if (data.length > 0) {
        this.interestsList = data[0].interests;
      }
    });
  }
}

