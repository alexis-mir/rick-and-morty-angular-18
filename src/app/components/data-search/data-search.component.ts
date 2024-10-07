import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-data-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './data-search.component.html',
  styleUrl: './data-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSearchComponent {
  searchControl = new FormControl('');
  @Output() search = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        const searchValue = value && value.length >= 3 ? value : undefined;
        this.search.emit(searchValue);
      });
  }
}
