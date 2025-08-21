import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, Header, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}
