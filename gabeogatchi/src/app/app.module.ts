import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextEntryComponent } from './components/forms/text-entry/text-entry.component';
import { SubmitButtonComponent } from './components/forms/submit-button/submit-button.component';
import { LoadingComponent } from './components/forms/loading/loading.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { StoreComponent } from './components/pages/store/store.component';
import { MinigamesComponent } from './components/pages/minigames/minigames.component';
import { BottomBarComponent } from './components/ui/bottom-bar/bottom-bar.component';
import { BattlepassComponent } from './components/pages/battlepass/battlepass.component';
import { InventoryComponent } from './components/pages/inventory/inventory.component';
import { Zoundfx } from 'ng-zzfx';

import { TetrisComponent } from './tetris/tetris.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { CreateAccountComponent } from './components/pages/create-account/create-account.component';
import { PetStatusComponent } from './components/ui/pet-status/pet-status.component';
import { PetDisplayComponent } from './components/ui/pet-display/pet-display.component';
import { PetButtonsComponent } from './components/ui/pet-buttons/pet-buttons.component';
// import { PaymentComponent } from './components/ui/payment/payment.component';
import { BoardComponent } from './tetris/board.component';
import { GachaComponent } from './components/pages/gacha/gacha.component';
import { CreatePetComponent } from './components/ui/create-pet/create-pet.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TextEntryComponent,
    SubmitButtonComponent,
    LoadingComponent,
    LoginComponent,
    HomeComponent,
    StoreComponent,
    MinigamesComponent,
    BottomBarComponent,
    BattlepassComponent,
    InventoryComponent,
    WelcomeComponent,
    CreateAccountComponent,
    PetStatusComponent,
    PetDisplayComponent,
    PetButtonsComponent,
    // PaymentComponent,
    TetrisComponent,
    GachaComponent,
    CreatePetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,
  //TetrisComponent
  ]
})
export class AppModule { }
export { Zoundfx };

