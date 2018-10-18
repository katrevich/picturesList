import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController, AlertController, normalizeURL, NavController, ActionSheetController, Platform } from 'ionic-angular';
import { ImageType, ImagesProvider } from '../../providers/images/images';
import { FilePath } from '@ionic-native/file-path';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  image: string = '';
  image2: string = '';
  imageUrl: string = '';
  type: ImageType;

  options: CameraOptions;

  constructor( 
    public navCtrl: NavController, 
    private action: ActionSheetController,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private images: ImagesProvider,
    private alert: AlertController,
    private platform: Platform,
    private filePath: FilePath,
  ) {
    this.options = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
  }  

  getPhoto(from: ImageType) {
    const options = {
      ...this.options,
      sourceType: from === ImageType.CAMERA ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    setTimeout(() => loader.present(), 100);
    this.camera.getPicture(options).then((imageData: string) => {
      if (this.platform.is('android') && from === ImageType.GALLERY) {
        this.filePath.resolveNativePath(imageData).then((filePath) => {
          this.image = normalizeURL(filePath);
          this.imageUrl = filePath;
          this.type = from;
        }).catch(e => {
          console.log(e);
        })
      } else {
        this.image = normalizeURL(imageData);
        this.imageUrl = imageData;
        this.type = from;
      }
      loader.dismiss();
    }).catch(() => {
      loader.dismiss(); 
    })
  }

  showActions() { 
    const actionSheet = this.action.create({
      buttons: [
        {
          text: 'Camera',
          handler: () => this.getPhoto(ImageType.CAMERA)
        },{
          text: 'Gallery',
          handler: () => this.getPhoto(ImageType.GALLERY)
        },{
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

  clearPhoto() { 
    this.image = '';
  }

  async savePhoto() {
    try {
      await this.images.saveImage(this.imageUrl, this.type);
      this.clearPhoto();
      const alert = this.alert.create({
        title: 'Success!',
        subTitle: 'Your picture is saved',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.navCtrl.parent.select(1);
          }
        }]
      });
      alert.present();
    } catch (e) {
      console.log(e);
      this.clearPhoto();
    }
  }
}
