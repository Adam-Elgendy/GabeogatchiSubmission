import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { StoreComponent } from './components/pages/store/store.component';
import { BattlepassComponent } from './components/pages/battlepass/battlepass.component';
import { MinigamesComponent } from './components/pages/minigames/minigames.component';
import { InventoryComponent } from './components/pages/inventory/inventory.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { CreateAccountComponent } from './components/pages/create-account/create-account.component';
import { GachaComponent } from './components/pages/gacha/gacha.component';

const routes: Routes = [
  {
    "path": "",
    "component": HomeComponent
  },
  {
    "path": "welcome",
    "component": WelcomeComponent
  },
  {
    "path": "create",
    "component": CreateAccountComponent
  },
  {
    "path": "login",
    "component": LoginComponent
  },
  {
    "path": "store",
    "component": StoreComponent
  },
  {
    "path": "battlepass",
    "component": BattlepassComponent
  },
  {
    "path": "inventory",
    "component": InventoryComponent
  },
  {
    "path": "games",
    "component": MinigamesComponent
  },
  {
    "path": "gacha",
    "component": GachaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
