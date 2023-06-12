import { Component } from '@angular/core';
import { ConnectionsService } from 'src/app/services/connections/connections.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { item, pageState } from 'src/types';

@Component({
  selector: 'app-battlepass',
  templateUrl: './battlepass.component.html',
  styleUrls: ['./battlepass.component.scss']
})
export class BattlepassComponent {
  public pageState = pageState;
  public freeItems: item[] = [];
  public paidItems: item[] = [];
  public currentPageState: pageState = pageState.loading;
  public pageText: string = "Idle"

  public points: number = 0;

  constructor(private connections: ConnectionsService, private storage: StorageService){}

  ngOnInit(){

    this.freeItems = [
      {
        "id": "a1",
        "title": "Dog Toy",
        "subtitle": "How Fun!",
        "imgLink": "https://kmartau.mo.cloudinary.net/04bb6faa-349e-4c47-89f3-d5902a23f66f.jpg?tx=w_600,h_600",
        "cost": 10,
        "owned": false,
      },
      {
        "id": "a2",
        "title": "Bed",
        "subtitle": "Time for bed",
        "imgLink": "https://www.fancyhomes.com.au/wp/wp-content/uploads/2019/02/TANIKA-7.jpg",
        "cost": 20,
        "owned": false,
        "isPremium": true
      },
      {
        "id": "a3",
        "title": "Play Pit",
        "subtitle": "Weewoo",
        "imgLink": "https://davesonlinedeals.com.au/wp-content/uploads/2019/03/plum-large-octagonal-sandpit.jpg",
        "cost": 30,
        "owned": false,
      },
    ]
    this.paidItems = [
      {
        "id": "b1",
        "title": "Gacha Pull",
        "subtitle": "Gambling is profitable in the long term",
        "imgLink": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Gachapon.jpg/220px-Gachapon.jpg",
        "cost": 10,
        "owned": false,
      },
      {
        "id": "b2",
        "title": "Robot Toy",
        "subtitle": "He is in the rain",
        "imgLink": "https://pbs.twimg.com/media/EFTDraSU8AA98Dn.jpg:large",
        "cost": 20,
        "owned": false,
        "isPremium": true
      },
      {
        "id": "b3",
        "title": "Little Guy",
        "subtitle": "What a silly guy",
        "imgLink": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhQQERIWFRITFxoXGBYVGBcXGRgYGBkaGBkcFRUYHCggHRsmHRcdIjUhJS0rLi4yGSA1ODMvNyo5LisBCgoKDg0OGhAQGysmHyUyLy83LzUyLS8tNS0rKy8vLS0tNjgtLS8tLSstLS0tLS02NS0tLi0vLTUtLTUtLS0rLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABQYEBwECAwj/xAA9EAACAQIFAQUECAQFBQAAAAAAAQIDEQQFEiExQQYTUWGBByJxsRQVMkJSkaHBI3KS0WKC4fDxk6KywtL/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEAQUG/8QAKBEBAAICAQMDAwUBAAAAAAAAAAECAxEhBBIxEzJBInGhI1FhwfAz/9oADAMBAAIRAxEAPwDeIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABw3pV3skByCpZ17Rsvymbi63ezXMaC7zjo53UE/K55ZF7S8DnOJVLVOjOTtFV4xipPolOMpRu+ibVzupNrkDzr1o4ek5zkoxXMpNJL4tnocAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKV2t9ouGyHFRpQkqtWNVRrU4ptwhpbk1L7OtPT7rd9y6mpfbnS1YzBe7H3lWTlbfburXfNknJ2O1jcuSq2e+0LG5zXbVaWHpP7NKg7St/iqK0m/O6/lKxi8dWxS01atWa8Kk5z/wDJnmk4bq9rX2503tdnFSalH7bfx/5ZbpDbzDV0SOVZFic3f8CjOa/Fa0P65Wj6XJ2r7O8XQw7qTqYaEYq8nOrKKiurlLRZL1IzescTKcUtPiEdlHaGUM0oTxs6+IoUZRl3TqyavDeDUZvS7NJ22va17H0L2fzmnn+VQxNHV3c9Vta0v3ZOLuvimfO+C7Pxxlfu447Buo7qEY1ZNzn92MW4KLbe3PU3x2AxdLF9kqHcw7tQj3cqe94VIe7OMr731Ju73d79SMzE+He2Y8rCACIAAAAAAAAAAAAAAAAAAAAAAAAA6zmoLd2+J2AGuvbfgu+7NUqy5o1lf+WpFxf/AHaTYpXe2eVxzzL1hqkpxpyak9DSb0u6TbT2vZ+iOTeKRuUq07501D7M630fM8RWau4YfTFfilKcFGK820o+pLY/s1FYui8fjZ08VXmlH6NGlRpxnL7MV7uqd3sm7t2d/Eisjy36o7dVqC1S7n34JN3lGM6dRXivty7pyaX4ki2dr8ir9o8bgquFrQ+jwqwq1bydpqnJOm4Wi7tKdTa6W69KMlt33PG2mkapxzqUrh8yWSYPu8bXjqppWrStHvY3smor762Tir9H1ssLH43C9po6E1Wo4dOvVpvVBuUF/ChOE0npfvS3Vvdj0JaUI47PYytGSw0ZrU0npq1HCyi+klGDv4a4+IzWhKdaM4xUnplTlBtLvKcl70U3xJWum9uU7arrNtp1xwj+z+Lo9pMtqwnRgvo9epQlFJaVKk1aVOzdtmmmns+Gens9qywfazMcJKV1enWi+rcopSlL/E1ou+rTfUw+yGUU+ymVSw+Gp4io5zc2qsVG0nGMd6llDStN9nJ82vwTfZfI6uG7U1cXNxcalCMJNdarqSm0l+GMNEU3ykvM0YpjvnXhmyxPpxvyuQANLIAAAAAAAAAAAAAAAAAAAAABj4nEKm9LbTktn4GQR2Y05vfmPw3RDJMxHCeOIm2pYlWs50tMt2nszOePUKEXy3yvmRd9jAedUqWJSacop7uPHp4lOCmXJMxjjbRm9OkR3zpcTzq0o1V7yudqc1UpqSd00mn4p8HY0zHxLJEqtWyyjHNHX7qHfK8e80rXbi2rnjYj85+iZVh5YjEWpQutco94k3J2TqKnzd2V2i04/BuctUeeq/sQuZYGGZYGdCrHVConGS/3w09/Qw3rNbcvQx2i1eGRhcH3eGiqUEqdlpUEtNumlR2scug4yu4tPxszSGc+z3HZPXk8G6koveM6E9Dfhrgmt/NbeZKdieyucVsbGpjcbiqFCLu6axNRzqeVozajF9W9/BdVKK0mN7dyd9LREanf7f3+zbRLZXHThr+L/wBDDwuEeIld7R8fH4f3JeMdMbLhE8NJ33KM+SNdsOQAaWUAAAAAAAAAAAAAAAAAAAAAAABBdq8K55Y5U473Wq3Lj12XnYplNQjRbe8nsoq+3nJ/sjaBSO0mSPCVXVpq9N7tL7j/APn5HpdBmrH6c8b5ZuopM/UkuyucqrSVCo7SirQf4l0XxRZTVcEnNXdl48/l5kj9eYinT0Ks2vGyb/qauW9R0HdfdJ8oY+o1GrLtmWZ08tp3qS3fEVvJ/BfvwVrE9oJY6/d04xcVdarttLndNWfUg4U5Yqbk5X3WqUm2+G238FH5HOE99zgvvxaXxXvJetrepKnQ4q1+rmfwT1F5njhJT7S4eg9NSoozSTaV2t0nz6nStmk60O8pSUaaUZJ7Sb1q8V1V/LpYq+de/mc7riy+zp4ilw91wTdGThlim/vU4QWzV+re/NlHnzMvT9LijLM639/uvy9RkmkRtK5d2pq0Klqv8SPXZKS+FrJ/B/mWrAZpSzCP8Oab6xe0l6M1/Sw6qW34laXw8f0f6HhSqujVUotxkt01yjZl6PFl32cT+Gaua1fPLaYIvIM1WaYS72qR2kvk15P+5KHjXpNLTW3ltrMTG4AARdAAAAAAAAAAAAAAAAAAAAAHWbtE8nzvvsezV0cKCSArmY9mIV5aqb7tvlWvH0XT5GGuyUutWNvKLf7lv07WGhWNNeszVjUWVThpPw19neC+ra8aSm5PRd9Fa7srXfh8jBoNwrxa5TTXxv8A6GVneK+l5pUkuL6V8I7frz6mLho68RFc3a223387L8z2scW9OO7zpitMd3CMzbfNKt+k2uXL9Xu+CUbby+gumhtbt9d/hwtvIhMbPVi5/wA8uiX3n4EvR3yyk7WupK9kr2k+qd36pGLp/wDovy+1zC0pxUntffyXl6GbjcreEx7pOceNSe/HO6V2nZcHGS1FTxyT6pxXk3b/AI9TIzhKhi7raTSkmvxJtP8ANfqkXXz2jqIxfxv/AH2RjFHpep/LxybGfV+ZRkpXi3pla9mm/Pw59DYiZTOzuRPFTVaptC91HrL+0fmXJQSlcw9datsnHn5XYImK8uwAMK8AAAAAAAAAAAAAAAAAAAAAAAAOlZ6aMn4J/I7nWorwa8hA1hg6fe14rot2/CK3bfoeuGkqmPTeybb+75v7/u/me+ZYGpl+B7yUZU6XM03tFp2V3+HfrwRmCzWjSranWgrKXE4J8PjV8j6OclbVm0TDze2YmI0gJYlN30z3/wAD+aViey6aqZRB2s9Ulvovz10+9+ZQcOrwafSLf5Ft7O42nT7PqEqkYyVWT0ylBbNLe32vXgw9Pb9SGjJH0p5e7TpT6RdpfFSct/R/oWqnlUcyrxlP7MOi+9fi78Nv1KjlN8wrOFCSneynptNJPhyS44dvhsXrs1h3hsu0uEo+89p8tbK78OOCPXRq1b1tzG/yl09vpmkxxOvwlYrSrLg5APMaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB1qQVSm4ySaas0900+U14GhO2eFp5d2ir0qEdFJSSte++iEpJN7papceRv0+c8+xP0zOa1S99dWpL4XnK1v8ti7D5QuxIOXdtJvTezS4u79P8r/ACGHko11d2V0nxw+eduCQw1B/UMqi5eJpQX/AEqzIqe8H8C5B9G5Nk9HJMGqVCCjHl9XJ+MpPdszzzw1TvcPGXjFP81c9DGuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY+YYj6LgKlT8EJS/pTf7HzdJuyurWS+XPrz6n0B2zn3fZPFO9r0ai/qi1+5oCSb35JVzY8funTvo3v7Y2sWDoKp7P6kntpxsG34LutP/ALlZe6LDlueUY9iq+Du1XdaFVKS2snBW+K08PnVdXs7QE4NR2tfwfX16HJ63DXzKcdFmt8PovIKvf5Fh5/io03+cEzPNf+zbtlDMMNDBVId1UpxUKfSNSMVayu37yS+D5XgtgEK3reN1cvjtSe2wACSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiu1GUvPez9bCqeh1oadVtVt0+Lq/BrWl7IcTTo2+sIXVkl3N1bzeu/gbfBC+Ot/dC3HmvjjVZaaqeyjHN6fpOGlF7NuNROz5tFKzdul0S2G9j0I0Ep4+vKS6wjCCt/K9T/U2eCMYMcfCc9Vln5a+yv2V0suzOlXWMxEnSqRqKLcEm4SUkpWjw7bmwQCdaxXxCq+S1/dIACSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==",
        "cost": 30,
        "owned": false,
      },
    ]
    this.connections.getData(this.storage.email, this.storage.userToken, "battlePassScore").then((res)=>{
      if(res){
        this.points = parseInt(res)
      }
      this.checkClaimedItems().then(()=>{
        this.currentPageState = pageState.idle
      });
    })
  }

  checkClaimedItems(): Promise<void>{
    return new Promise((resolve, reject)=>{
      this.connections.getData(this.storage.email, this.storage.userToken, "items").then((res)=>{
        if(res){
          let claimedItems = JSON.parse(res);
          let claimedIDs: string[] = []
          claimedItems.forEach((item)=>{
            claimedIDs.push(item.id)
          });
          this.freeItems.forEach((item)=>{
            if(claimedIDs.includes(item.id)){
              item.owned = true
            }
          })
          this.paidItems.forEach((item)=>{
            if(claimedIDs.includes(item.id)){
              item.owned = true
            }
          })
          resolve();
        }
        reject();
      })
    });
  }

  verifyClaim(item: item){
    if(item.cost > this.points){
      this.currentPageState = pageState.error;
      this.pageText = "You don't have enough points to claim " + item.title;
      return
    }
    if(item.owned){
      this.currentPageState = pageState.error;
      this.pageText = "You have already claimed " + item.title;
      return
    }
    else{
      item.owned = true
      this.currentPageState = pageState.loading;
      this.connections.getData(this.storage.email, this.storage.userToken, "items").then((res)=>{
        console.log(res)
        if(res){
          let items = JSON.parse(res)
          items.push(item);
          this.connections.setData(this.storage.email, this.storage.userToken, "items", JSON.stringify(items)).then(()=>{
            console.log(items)
            this.checkClaimedItems().then(()=>{
              this.currentPageState = pageState.success;
              this.pageText = "Claim Successfull, You can see your item in the inventory"
            })
          })
        }else{
          this.currentPageState = pageState.error;
          this.pageText= res
        }
      })
    }
    
  }
}
