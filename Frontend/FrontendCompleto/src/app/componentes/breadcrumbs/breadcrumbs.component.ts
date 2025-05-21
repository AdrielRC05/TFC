import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: false,
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnInit{
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
    });
  }

  private buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    children.forEach(child => {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      let label = child.snapshot.data['breadcrumb'];
      if (label) {
        // Añadir el parámetro dinámico en el label si existe
        if (child.snapshot.params['id']) {
          label = label.replace('Edición Detalle', `Edición ${child.snapshot.params['id']}`);
        }
        if (child.snapshot.params['edicionId']) {
          label = label.replace('Subidas de Edición', `Subidas de Edición ${child.snapshot.params['edicionId']}`);
        }
        if (child.snapshot.params['pilotoId']) {
          label = label.replace('Rallys Piloto', `Rallys Piloto ${child.snapshot.params['pilotoId']}`);
        }
        if (child.snapshot.params['id'] && url.includes('rallys')) {
          label = label.replace('Pilotos Rally', `Pilotos Rally ${child.snapshot.params['id']}`);
        }
        breadcrumbs.push({ label, url });
      }

      return this.buildBreadcrumb(child, url, breadcrumbs);
    });

    return breadcrumbs;
  }
}
