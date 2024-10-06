import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Character } from '@app/models';
import { GlobalStore } from '@app/store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent {
  character = input.required<Character>();
  readonly store = inject(GlobalStore);
  route = inject(ActivatedRoute);

  removeCharacter(id: number) {
    this.store.removeCharacter(id);
  }
}
