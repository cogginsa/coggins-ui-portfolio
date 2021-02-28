import { Component, OnInit } from '@angular/core';
import {InProgressService} from 'src/app/sevices/in-progress.service'

@Component({
  selector: 'app-summary-component',
  templateUrl: './summary-component.component.html',
  styleUrls: ['./summary-component.component.scss']
})
export class SummaryComponentComponent implements OnInit {

  constructor(private inProgress: InProgressService) { }

  ngOnInit() {
  }

  
  scrollToCard(cardIndex) {
    let el = document.getElementsByTagName("app-large-card")[cardIndex]    
    el.scrollIntoView({behavior: "smooth"});
  }

}
