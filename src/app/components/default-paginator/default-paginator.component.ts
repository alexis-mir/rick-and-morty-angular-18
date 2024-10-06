import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { GlobalStore } from '@app/store';

export const PAGE_SIZE = 20;

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './default-paginator.component.html',
  styleUrl: './default-paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  readonly store = inject(GlobalStore);
  readonly pageSize = PAGE_SIZE;
  length = this.store.pageInfo.length;
  pageIndex = this.store.pageInfo.pageIndex;
  @Output() handlePageEvent = new EventEmitter<PageEvent>();
}
