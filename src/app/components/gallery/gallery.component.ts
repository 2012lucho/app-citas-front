import { Component, OnInit, ViewChild,  ElementRef, Input} from '@angular/core';
import { IonSlides } from '@ionic/angular';

import { ImageDataModel }     from './image.data.model';
import { GalleryConfigModel } from './gallery.config.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() imageData: Array<ImageDataModel> = [];
  @Input() config:GalleryConfigModel        = new GalleryConfigModel();
  @ViewChild('slides', {read: ElementRef, static:false}) slides: IonSlides;

  public slideOpts:any = {
    initialSlide: 1,
    speed: 400
  };
  public actualIndex:number = 0;

  constructor() {}

  ngOnInit(): void {
  }

  onSlideChanged( slide: IonSlides ){
    slide.getActiveIndex().then((index: number) => {
      this.actualIndex = index +1;
    });
  }

  uploadPhoto(){
    if ( this.config.actions.create ){

    }
  }
}
