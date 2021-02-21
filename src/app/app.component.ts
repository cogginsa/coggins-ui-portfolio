import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){}
  isBannerAtTop = true;

  @ViewChild('banner') componentDiv: ElementRef;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const element = this.componentDiv.nativeElement;
    const viewportOffset = element.getBoundingClientRect();
    const top = viewportOffset.top;
    
    if (top < -200) {
      this.isBannerAtTop = false;
    } else this.isBannerAtTop = true;
    
  }
  title = 'portfolio-of-ui';

  scrollToFirstCard() {
    let el = document.getElementsByTagName("app-large-card")[0]    
    el.scrollIntoView({behavior: "smooth"});
  }

}