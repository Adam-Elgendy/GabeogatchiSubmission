import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { ConnectionsService } from '../connections/connections.service';
import { item } from 'src/types';
@Injectable({
  providedIn: 'root'
})




export class GachaService {
  private checkRecentValues(arr: any[], n: number, value: any): boolean {
    if(arr.length > n){
      return (arr.slice(-n).includes(value)|| arr.slice(-n).includes(value));
    }else{
      return true;
    }
  }

  private randoItemByCategory(table: item[], rarity: number): item{
    const filteredArr = table.filter(item => item.rarity === rarity.toString());
    const randomElement = filteredArr[Math.floor(Math.random() * filteredArr.length)];
    return randomElement
  }

  private generateRandomItem(table:  any[]): Promise<item> {
    return new Promise<item>((resolve, reject)=>{
      const token = this.ls.userToken
      const email = this.ls.email
      const random = Math.random();
      //righs probabilities
      const recentPulls = this.mongo.getData(email, token,"previousGachaPulls").then((physix)=>{
        let array = JSON.parse(physix)
        if(!this.checkRecentValues(array,89,5)){
          resolve(this.randoItemByCategory(table,5));
        }else if(!this.checkRecentValues(array,9,4) || !this.checkRecentValues(array,9,5)){
          if(random < 0.005){
            resolve(this.randoItemByCategory(table,5));
          }else{
            resolve(this.randoItemByCategory(table,4));
          }
        }else if(!this.checkRecentValues(array,14,3)){
          if(random < 0.005){
            resolve(this.randoItemByCategory(table,5));
          }else if(random < 0.05){
            resolve(this.randoItemByCategory(table,4));
          }else{
            resolve(this.randoItemByCategory(table,3));
          }
        }else if(!this.checkRecentValues(array,75,5)){
            if(random < .25){
              resolve(this.randoItemByCategory(table,5));
            }else if(random< .3){
              resolve(this.randoItemByCategory(table,4));
            }else if(random < .5){
              resolve(this.randoItemByCategory(table,3));
            }else if(random < .8){
              resolve(this.randoItemByCategory(table,2));
            }else{
              resolve(this.randoItemByCategory(table,1));
            }
          }else{
            if(random < .005){
              resolve(this.randoItemByCategory(table,5));
            }else if(random< .055){
              resolve(this.randoItemByCategory(table,4));
            }else if(random < .255){
              resolve(this.randoItemByCategory(table,3));
            }else if(random < .555){
              resolve(this.randoItemByCategory(table,2));
            }else{
              resolve(this.randoItemByCategory(table,1));
            }
          }
      })
    return table[0];
    });
  }

  private givePlayerItem(item: item){
    const token = this.ls.userToken
    const email = this.ls.email
    let userArr = this.mongo.getData(email, token,"items").then((val) =>{
     let valArr = JSON.parse(val)
     valArr.push(item)
     valArr = JSON.stringify(valArr)
     this.mongo.setData(email, token,"items",valArr)
    })
    let otherUserArr = this.mongo.getData(email, token,"previousGachaPulls").then((val) =>{
      let valArr = JSON.parse(val)
      valArr.push(item.rarity)
      valArr = JSON.stringify(valArr)
      this.mongo.setData(email, token,"previousGachaPulls",valArr)
     })
     return item.title
  }

  public pullOnBanner(): Promise<item>{
    return new Promise<item>((resolve, reject)=>{
      this.generateRandomItem(itemTable).then((item)=>{
        this.givePlayerItem(item);
        resolve(item)
      })

    });
  }





  constructor(private ls: StorageService, private mongo: ConnectionsService) { }
}


const itemTable: item[] = [
  { 
    id: "gachaPull",
    title: 'Special Pet Type B',
    subtitle: "",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "5" 
  },
  { 
    id: "gachaPull",
    title:'Special Pet Type C ',
    subtitle: "",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity:"5",
  },
  { 
    id: "gachaPull",
    title: 'Very Premium Food 1',
    subtitle: "Food: 20",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Very Premium Food 2',
    subtitle: "Food: 20",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Very Premium Cleaning Product 1',
    subtitle: "Cleaning: 20",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Very Premium Cleaning Product 2',
    subtitle: "Cleaning: 20",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Premium Food 1 but a lot',
    subtitle: "Food: 20",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Premium Food 2 but a lot',
    subtitle: "Food: 20",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Special Costume 1',
    subtitle: "",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Special Costume 2', 
    subtitle: "",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Special Costume 3',
    subtitle: "",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Special Costume 4',
    subtitle: "",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Premium Cleaning Product 3 but a lot',
    subtitle: "Cleaning: 20",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Premium Cleaning Product 4 but a lot',
    subtitle: "Cleaning: 20",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "4" },
  { 
    id: "gachaPull",
    title: 'Premium Food 1',
    subtitle: "Food: 15",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "3" 
  },
  { 
    id: "gachaPull",
    title: 'Premium Food 2',
    subtitle: "Food: 15",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "3"
  },
  { 
    id: "gachaPull",
    title: 'Premium Food 3',
    subtitle: "Food: 15",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "3" 
  },
  { 
    id: "gachaPull",
    title: 'Premium Food 4',
    subtitle: "Food: 15",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "3" 
  },
  { 
    id: "gachaPull",
    title: 'Premium Cleaning Product 1',
    subtitle: "Cleaning: 15",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "3" },
  { 
    id: "gachaPull",
    title: 'Premium Cleaning Product 2',
    subtitle: "Cleaning: 15",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "3" },
  { 
    id: "gachaPull",
    title: 'Premium Cleaning Product 3',
    subtitle: "Cleaning: 15",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "3" },
  { 
    id: "gachaPull",
    title: 'Premium Cleaning Product 4',
    subtitle: "Cleaning: 15",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity: "3" },
  { 
    id: "gachaPull",
    title:'Quality Food 1',
    subtitle: "Food: 10",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity :"2"},
  { 
    id: "gachaPull",
    title:'Quality Food 2',
    subtitle: "Food: 10",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity :"2"},
  { 
    id: "gachaPull",
    title:'Quality Food 3',
    subtitle: "Food: 10",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity :"2"},
  { 
    id: "gachaPull",
    title:'Quality Food 4',
    subtitle: "Food: 10",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity :"2"},
  { 
    id: "gachaPull",
    title:'Quality Food 5',
    subtitle: "Food: 10",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity :"2"},
  { 
    id: "gachaPull",
    title:'Cleaning Product',
    subtitle: "Cleaning: 10",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity :"2"},
  { 
    id: "gachaPull",
    title:'Cleaning Product',
    subtitle: "Cleaning: 10",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity :"2"
  },
  { 
    id: "gachaPull",
    title:'Low Quality Food',
    subtitle: "Food: 5",
    imgLink: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/200px-Question_Block_Artwork_-_Super_Mario_3D_World.png",
    cost: 0,
    owned: false,
    rarity :"1"
  },
  
];

