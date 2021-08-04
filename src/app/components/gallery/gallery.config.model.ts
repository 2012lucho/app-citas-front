import { ImageDataModel }     from './image.data.model';

export class GalleryConfigModel {
  public actions:any       = { create:false, delete:false };
  public service:any       = null;
  public imageData:Array<ImageDataModel> = [];
}
