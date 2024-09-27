import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full',
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./main-container/main-container.component').then(
        (m) => m.MainContainerComponent,
      ),
  },
];
