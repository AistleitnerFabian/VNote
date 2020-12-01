import {
  AfterContentChecked, AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ViewRef
} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit, AfterViewInit {

  URLPath = 'vnote/';
  isTop = true;
  routeSubscription: Subscription;
  isRedirect = true;

  @ViewChild('aboutsection') about;
  @ViewChild('appsection') app;
  @ViewChild('infosection') info;
  @ViewChild('homesection') home;


  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.checkPathParam();
  }


  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.scrollY === 0) {
      this.isTop = true;
    } else {
      this.isTop = false;
    }
    this.checkSection(window.scrollY);
  }

  checkPathParam(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      if (this.isRedirect) {
        if (params.page !== null && params.page !== undefined && params.bid !== '') {
          switch (params.page) {
            case 'app':
              this.scrollTo(this.app);
              break;
            case 'about':
              this.scrollTo(this.about);
              break;
            case 'info':
              this.scrollTo(this.info);
              break;
            default:
              this.scrollTo(this.home);
              break;
          }
        }
      } else {
        this.isRedirect = true;
      }
    });
  }

  scrollTo(path): void {
    const y = path.nativeElement.offsetTop;
    console.log(y);
    window.scrollTo({behavior: 'smooth', left: 0, top: y});
  }


  isActive(route): boolean {
    return '/' + this.URLPath + route === this.router.url;
  }

  private checkSection(scrollY): void {
    const puffer = this.app.nativeElement.offsetTop * 0.2;
    const counts = [
      this.home.nativeElement.offsetTop + puffer,
      this.app.nativeElement.offsetTop + puffer,
      this.about.nativeElement.offsetTop + puffer,
      this.info.nativeElement.offsetTop + puffer];
    const goal = scrollY;

    const routes = [
      'home',
      'app',
      'about',
      'info'
    ];

    const closest = counts.reduce((prev, curr) => {
      return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
    const routeIndex = counts.findIndex((count) => {
      return count === closest;
    });
    if (!this.isActive(routes[routeIndex])) {
      this.isRedirect = false;
      this.router.navigate([this.URLPath + routes[routeIndex]]);
    }
  }
}
