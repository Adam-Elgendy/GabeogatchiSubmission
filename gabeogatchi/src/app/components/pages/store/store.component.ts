import { Component } from '@angular/core';
import { ConnectionsService } from 'src/app/services/connections/connections.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { item, pageState } from 'src/types';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  public storeItems: item[] = [];
  public funds: number;

  public pageState = pageState;
  public currentPageState: pageState = pageState.loading;
  public pageText: string = "Idle"


  constructor(private connections: ConnectionsService, private storage: StorageService){}

  ngOnInit(){
    this.connections.getData(this.storage.email, this.storage.userToken, "funds").then((res)=>{
      if(res){
        this.funds = parseInt(res);
      }
      this.currentPageState = pageState.idle
    })
    this.storeItems = [
        {
          "id": "b1",
          "title": "Gacha Pull",
          "subtitle": "Gambling is profitable in the long term",
          "imgLink": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Gachapon.jpg/220px-Gachapon.jpg",
          "cost": 10,
          "owned": false,
          "rarity": "1"
        },
        {
          "id": "b2",
          "title": "Premium Food",
          "subtitle": "Its very Tasty",
          "imgLink": "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/chineseroastedpork-01.jpg?itok=yo9kJSGq",
          "cost": 40,
          "owned": false,
          "rarity": "4"
        },
        {
          "id": "b3",
          "title": "Standard Food",
          "subtitle": "Its Alright",
          "imgLink": "https://images.happycow.net/venues/1024/18/68/hcmp186858_764524.jpeg",
          "cost": 30,
          "owned": false,
          "rarity": "3"
        },
        {
          "id": "b3",
          "title": "Bad Food",
          "subtitle": "Its only value is its nutrients",
          "imgLink": "https://media.cnn.com/api/v1/images/stellar/prod/190321132023-fishfingers-1.jpg?q=w_5333,h_3000,x_0,y_0,c_fill",
          "cost": 10,
          "owned": false,
          "rarity": "1"
        },
        {
          "id": "b3",
          "title": "Cleaning Product",
          "subtitle": "Gets rid of the gunk",
          "imgLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJVN-BjIontLWtp9N-vEV0WvdDtYKY5HMnbQ&usqp=CAU",
          "cost": 10,
          "owned": false,
          "rarity": "1"
        },
    ]
  }

  buyItem(item: item){
    if(item.cost > this.funds){
      this.currentPageState = pageState.error;
      this.pageText = "You can't afford this item :("
      return
    }
    this.currentPageState = pageState.loading;
    this.funds = this.funds - item.cost
    this.connections.getData(this.storage.email, this.storage.userToken, "items").then((res)=>{
      console.log(res)
      if(res){
        let items = JSON.parse(res)
        items.push(item);
        this.connections.setData(this.storage.email, this.storage.userToken, "items", JSON.stringify(items)).then(()=>{
          console.log(items)
          this.connections.setData(this.storage.email, this.storage.userToken, "funds", JSON.stringify(this.funds)).then(()=>{
            this.currentPageState = pageState.success;
            this.pageText = "Purchase Successful, You can find this item in your inventory"
          });
        })
      }else{
        this.currentPageState = pageState.error;
        this.pageText= res
      }
    })
  }
}
