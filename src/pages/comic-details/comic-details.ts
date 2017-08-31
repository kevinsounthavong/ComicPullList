import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ComicDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comic-details',
  templateUrl: 'comic-details.html',
})
export class ComicDetailsPage {
  selectedItem: any;
  list: Comic[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    //this.list = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComicDetailsPage');

    this.storage.get('pull-list').then((data)=>{
      if (data != null)
        {
          this.list = data;

          for (var comic of this.list)
            {
              console.log("Comic",comic)
            }
        }
      else{
        this.list = [];
      }
    });
  }

  addToPullList(){
    this.list.push(this.selectedItem);
    
    //this.storage.set('pull-list', JSON.stringify(this.selectedItem));
    this.storage.set('pull-list', this.list);
  }

}

interface Comic {
  publisher: string,
  title: string, 
  price: string, 
  description: string, 
  creators: string, 
  release_date: string, 
  diamond_id: string,
  cover_url?: string
}
