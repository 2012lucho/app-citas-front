import { NgModule } from '@angular/core';

import { IonicModule }  from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ExpandableComponent } from './expandable/expandable.component';
import { MessageComponent }    from './message/message.component';
import { GalleryComponent }    from './gallery/gallery.component';

@NgModule({
	declarations: [
		ExpandableComponent,
		MessageComponent,
		GalleryComponent
	],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [
		ExpandableComponent,
		MessageComponent,
		GalleryComponent
	]
})
export class ComponentsModule {}
