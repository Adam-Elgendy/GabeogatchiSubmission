import { Injectable } from '@angular/core';
import { ConnectionsService } from '../connections/connections.service';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class GameTokensService {

  constructor(private mongo: ConnectionsService, private storage: StorageService) { }


  private updateMinigameTokens(){
    const userID = this.storage.userToken
    const userEmail = this.storage.email
    this.mongo.getData(userEmail, userID,"Minigame Tokens").then((val)=>{
      var tokenCount = JSON.parse((val as string))
      if(tokenCount == null){
        tokenCount = 8
        var timeSinceLastUpdate = Date.now()
        this.mongo.setData(userEmail, userID,"Minigame Tokens", JSON.stringify(tokenCount))
        this.mongo.setData(userEmail, userID,"Tokens last updated", JSON.stringify(timeSinceLastUpdate))
      }else{
        this.mongo.getData(userEmail, userID,"Tokens last updated").then((val2)=>{
         var timeSinceLastUpdate = JSON.parse((val2 as string))
         var deltaTime = Date.now() - timeSinceLastUpdate
         if( deltaTime>= 1200000){
          var tokensEarned = [Math.floor(deltaTime / 1200000),(deltaTime / 1200000) % 1]
          tokenCount += tokensEarned[0]
          if(tokenCount > 8){
            tokenCount = 8
          }else if(tokenCount < 0){
            tokenCount = 0
          }
          if(tokenCount != 8){
            timeSinceLastUpdate = (Date.now() - tokensEarned[1]*1200000)
          }else{
            timeSinceLastUpdate = Date.now()
          }
          this.mongo.setData(userEmail, userID,"Minigame Tokens", JSON.stringify(tokenCount))
          this.mongo.setData(userEmail, userID,"Tokens last updated", JSON.stringify(timeSinceLastUpdate))
         }
        })
      }
    })
  }
  public async spendTokens(): Promise<boolean>{
    
    const userID = this.storage.userToken
    const userEmail = this.storage.email
    var tokens:any = await this.mongo.getData(userEmail, userID,"Minigame Tokens")

      tokens = parseInt(JSON.parse(tokens))
      if (tokens > 0){
        tokens - 1
        this.mongo.setData(userEmail, userID,"Minigame Tokens", JSON.stringify(tokens))
        this.updateMinigameTokens()
        return true
      }
      else{
        this.updateMinigameTokens()
        return false
      }
  }

  public generateUser(){
    const userID = this.storage.userToken
    const userEmail = this.storage.email
    this.mongo.setData(userEmail, userID,"Minigame Tokens", JSON.stringify(8))
    this.mongo.setData(userEmail, userID,"Tokens last updated", JSON.stringify(Date.now))
  }

}
