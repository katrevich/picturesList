import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ImagesProvider, ImageType, Image } from '../../providers/images/images';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  subset: ImageType | string = ''; 
  isAndroid: boolean = false;
  types = ImageType;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private action: ActionSheetController,
    public images: ImagesProvider,
  ) {
    
  }

  showActions(index: number) {
    const actionSheet = this.action.create({
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('index: ', index)
            this.images.removeItem(index);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

  filter(images: Image[]) {
    return images.filter(item => {
      if (!this.subset) return item;
      if (this.subset == item.type) return item;
    })
  }

}
