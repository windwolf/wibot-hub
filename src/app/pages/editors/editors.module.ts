import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { CKEditorModule } from 'ng2-ckeditor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ThemeModule } from '../../@theme/theme.module';

import { EditorsRoutingModule, routedComponents } from './editors-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    EditorsRoutingModule,
    CKEditorModule,
    EditorModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class EditorsModule { }
