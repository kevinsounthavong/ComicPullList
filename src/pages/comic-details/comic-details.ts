import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the ComicDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comic-details',
  templateUrl: 'comic_details_card.html',
})
export class ComicDetailsPage {
  selectedItem: any;
  list: Comic[];
  added: boolean;
  isSeries: boolean;
  bookmarks: Comic[];

  constructor(public ngZone: NgZone, public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    //console.log('indexof returned',this.selectedItem.title.indexOf('#') );
    console.log("Comic-Details.ts Constructor called!");
  }

  //Fired when a page is created for the first time
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComicDetailsPage');

    //Create the loading popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Comic...'
    });

    //Show the pop up
    loadingPopup.present();

    //returns -1 if it cannot find # symbol. Means it is NOT an ongoing comic series, but rather a TPB or something
    //Means you cannot bookmark it
    
    if(this.selectedItem.title.indexOf('#')=== -1)
    {
        //this.isSeries = false;
        this.selectedItem.isASeries = false;
    }
    else
    {
        //this.isSeries = true;
        this.selectedItem.isASeries = true;
    }

    console.log('this.selectedItem.isASeries = ', this.selectedItem.isASeries)
    
    //Retrieve pull list
    let pull_list_retrieve = this.storage.get('pull-list').then((data)=>{
      if (data != null)
        {
          this.list = data;

          for (var comic of this.list)
            {
              if(this.selectedItem.title === comic.title)
                {
                  console.log("TITLE SAVED IN PULL LIST ALREADY", comic.title);
                  this.selectedItem.added = true;
                }
            }
        }
      else{
        this.list = [];
      }
    });

    //Retrieve Bookmarks
    let bookmark_retrieve=this.storage.get('bookmarks').then((data)=>{
      if(data != null && data.length > 0)
      {
        this.bookmarks = data;
        //Find # symbol
        var poundIndex = this.selectedItem.title.indexOf('#');

        for (var title of this.bookmarks)
        {
          console.log('Tile in bookmarks',title);
          console.log('selected Item Title',this.selectedItem.title.slice(0,poundIndex).trim())
          
          if (title.series === this.selectedItem.title.slice(0,poundIndex).trim())
          {
            console.log("SERIES ALREADY BOOKMARKED", title);
            this.ngZone.run(()=>{
              this.selectedItem.bookmarked = true;
            })
            break;            
          }
          else {
            console.log('Title does not match yet...continuing');
            this.ngZone.run(()=>{
              this.selectedItem.bookmarked = false;
            })
            continue;
          }
        }
      }
      else{
        console.log('Bookmarks Array is EMPTY');
        this.bookmarks = [];

        this.ngZone.run(()=>{
          this.selectedItem.bookmarked = false;
        })
      }
    });

    Promise.all([
      pull_list_retrieve,
      bookmark_retrieve
    ]).then((data)=>{
      loadingPopup.dismiss();
      console.log("this.selectedItem.bookmarked = ",this.selectedItem.bookmarked)
    });
  }


  ionViewDidEnter(){
    console.log('ionViewDidEnter loaded of Comic-Details')
    //Create the loading popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Comic...'
    });

    //Show the pop up
    loadingPopup.present();

    //returns -1 if it cannot find # symbol. Means it is NOT an ongoing comic series, but rather a TPB or something
    //Means you cannot bookmark it
    
    if(this.selectedItem.title.indexOf('#')=== -1)
    {
        //this.isSeries = false;
        this.selectedItem.isASeries = false;
    }
    else
    {
        //this.isSeries = true;
        this.selectedItem.isASeries = true;
    }

    console.log('this.selectedItem.isASeries = ', this.selectedItem.isASeries)

    //Retrieve Bookmarks
    let bookmark_retrieve=this.storage.get('bookmarks').then((data)=>{
      if(data != null && data.length > 0)
      {
        this.bookmarks = data;
        //Find # symbol
        var poundIndex = this.selectedItem.title.indexOf('#');

        for (var title of this.bookmarks)
        {
          console.log('Tile in bookmarks',title);
          console.log('selected Item Title',this.selectedItem.title.slice(0,poundIndex).trim())
          
          if (title.series === this.selectedItem.title.slice(0,poundIndex).trim())
          {
            console.log("SERIES ALREADY BOOKMARKED", title);
            this.ngZone.run(()=>{
              this.selectedItem.bookmarked = true;
            })
            break;            
          }
          else {
            console.log('Title does not match yet...continuing');
            this.ngZone.run(()=>{
              this.selectedItem.bookmarked = false;
            })
            continue;
          }
        }
      }
      else{
        console.log('Bookmarks Array is EMPTY');
        this.bookmarks = [];

        this.ngZone.run(()=>{
          this.selectedItem.bookmarked = false;
        })
      }
    });
    /* OLD
    //Retrieve Bookmarks
    let bookmark_retrieve=this.storage.get('bookmarks').then((data)=>{
      console.log('Performing bookmark_retrieve!', data);
      if(data != null && data.length > 0)
      {
        this.bookmarks = data;
        //Find # symbol
        var poundIndex = this.selectedItem.title.indexOf('#');

        if(poundIndex === -1)
          return;

        for (var title of this.bookmarks)
        {
          console.log('Tile in bookmarks',title);
          console.log('selected Item Title',this.selectedItem.title.slice(0,poundIndex).trim())
          
          if (title.series === this.selectedItem.title.slice(0,poundIndex).trim())
          {
            console.log("SERIES ALREADY BOOKMARKED", title);
            this.ngZone.run(()=>{
              this.selectedItem.bookmarked = true;
              //this.isSeries = !this.selectedItem.bookmarked;
              this.selectedItem.isASeries = !this.selectedItem.bookmarked;
            })
            break;
          }
          else{
            console.log('Title does not match yet...continuing');
            continue;
            
            this.ngZone.run(()=>{
              this.selectedItem.bookmarked = false; 
              //this.isSeries = !this.selectedItem.bookmarked;
              this.selectedItem.isASeries = !this.selectedItem.bookmarked;
            })           
          }
        }
      }
      else{
        console.log('Else Block of didEnter')
        this.bookmarks = [];
        
        this.ngZone.run(()=>{
          this.selectedItem.bookmarked = false;
          this.isSeries = !this.selectedItem.bookmarked;
        })
      }
    });
*/
    Promise.all([
      bookmark_retrieve
    ]).then((data)=>{
      console.log('ionViewDidEnter data = ',data);
      loadingPopup.dismiss();
      console.log("this.selectedItem.bookmarked = ",this.selectedItem.bookmarked)
      
    });
  }

  addToPullList(item){
   // this.selectedItem.added = false;

   // this.added = this.selectedItem.added;
    //this.added = true;
    this.selectedItem.disabled = true;
    item.added = true;
    this.list.push(item);
    //this.list.push(this.selectedItem);
    
    this.storage.set('pull-list', this.list);
  }

  bookmark(item) {
    console.log("CLICKED BOOKMARK");

    let poundIndex = item.title.indexOf('#');

    //We found the # sign, so it's an ongoing series
    if (poundIndex !== -1)
    {
      let seriesTitle: string = item.title.slice(0,poundIndex);
      item.series = seriesTitle.trim();
      item.disabled = true;
      item.bookmarked = true;
      //item.isASeries = !item.bookmarked;
      item.seriesID = seriesTitle.replace(/ /g, "").replace("&","").trim();
      
      this.bookmarks.push(item);
      //save to Storage
      this.storage.set('bookmarks', this.bookmarks);

      console.log('Bookmarks Array Saved: ',this.bookmarks);
    }
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
  cover_url?: string,
  added?: boolean,
  bookmarked?: boolean,
  series?: string,
  seriesID?:string,
  isASeries?:boolean
}
