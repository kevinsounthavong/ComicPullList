import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ViewNotificationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-notifications',
  templateUrl: 'view-notifications.html',
})
export class ViewNotificationsPage {
  notifications: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    //this.notifications = navParams.get('item');

    //console.log('retrieved notifcations inside view',this.notifications);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewNotificationsPage');

    this.storage.get('notifications').then((data)=>{
      if(data != null) {
        this.notifications = data;

        this.notifications.forEach((arrayItem)=>{
          let text = arrayItem.text;
          let r_index = text.indexOf('r'); //finds the r in the word for
          let exclaim_index = text.indexOf('!');

          let series = text.substring(r_index+1,exclaim_index).trim();

          console.log('series in notify',series);

          arrayItem.series = series;
        });
      }
    });
  }

}