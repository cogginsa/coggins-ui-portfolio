import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-component',
  templateUrl: './summary-component.component.html',
  styleUrls: ['./summary-component.component.scss']
})
export class SummaryComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
  scrollToCard(cardIndex) {
    let el = document.getElementsByTagName("app-large-card")[cardIndex]    
    el.scrollIntoView({behavior: "smooth"});
  }

}
