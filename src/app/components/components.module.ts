import { NgModule } from '@angular/core';

import { IonicModule }  from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ExpandableComponent } from './expandable/expandable.component';
import { MessageComponent }    from './message/message.component';

@NgModule({
	declarations: [
		ExpandableComponent,
		MessageComponent
	],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [
		ExpandableComponent,
		MessageComponent
	]
})
export class ComponentsModule {}
