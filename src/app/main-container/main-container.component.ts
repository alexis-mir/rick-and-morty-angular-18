import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalStore } from '@app/store';
import { CharacterCardComponent } from './components';
import { RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { PaginatorComponent } from '@app/components';
import { PageEvent } from '@angular/material/paginator';
import { DataSearchComponent } from '@app/components/data-search/data-search.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    CharacterCardComponent,
    RouterLink,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    PaginatorComponent,
    DataSearchComponent,
    MatIconModule,
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainerComponent {
  readonly store = inject(GlobalStore);

  handlePageEvent(e: PageEvent) {
    this.store.getAllCharacters(e.pageIndex, this.store.pageInfo().filter);
  }

  onSearch(query: string) {
    this.store.getAllCharacters(0, query);
  }
}
