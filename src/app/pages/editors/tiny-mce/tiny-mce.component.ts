import { Component } from '@angular/core';

@Component({
  selector: 'ngx-tiny-mce-page',
  template: `
    <nb-card>
      <nb-card-header>
        Tiny MCE
      </nb-card-header>
      <nb-card-body>
      <editor
        [init]="{ plugins: 'link table' }"
      ></editor>
      </nb-card-body>
    </nb-card>
  `,
})
export class TinyMCEComponent {
}
