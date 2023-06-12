// import { Component } from '@angular/core';
// import { ReadyToPayChangeResponse } from '@google-pay/button-angular';
// import { ConnectionsService } from 'src/app/services/connections/connections.service';
// import { StorageService } from 'src/app/services/storage/storage.service';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { GooglePayButtonModule } from '@google-pay/button-angular';

// //Component Code
// @Component({
//   selector: 'payment-root',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.scss'],
// })
// export class PaymentComponent {
//   amount = '100.00';
//   cum = 100.00;
//   buttonType = 'buy';
//   buttonColor = 'default';
//   buttonLocale = '';
//   existingPaymentMethodRequired = false;

//   constructor(private connections: ConnectionsService, private storage: StorageService) {}

//   paymentRequest = {
//     apiVersion: 2,
//     apiVersionMinor: 0,
//     allowedPaymentMethods: [
//       {
//         type: 'CARD',
//         parameters: {
//           allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
//           allowedCardNetworks: ['MASTERCARD', 'VISA'],
//         },
//         tokenizationSpecification: {
//           type: 'PAYMENT_GATEWAY',
//           parameters: {
//             gateway: 'example',
//             gatewayMerchantId: 'exampleGatewayMerchantId',
//           },
//         },
//       },
//     ],
//     merchantInfo: {
//       merchantId: '12345678901234567890',
//       merchantName: 'Demo Merchant',
//     },
//   };

//   onLoadPaymentData = (event: CustomEvent<google.payments.api.PaymentData>): void => {
//     console.log('load payment data', event.detail);
//   };

//   onError = (event: ErrorEvent): void => {
//     console.error('error', event.error);
//   };

//     onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = paymentData => {
//     console.log('payment authorized', paymentData);
//     this.connections.getData(this.storage.email, this.storage.userToken, "Premium Currency").then((val)=>{
//       let heh = JSON.parse((val as string))
//       heh =+ this.amount * this.cum
//     this.connections.setData(this.storage.email, this.storage.userToken, "PremiumCurrency", JSON.stringify(heh))
//     });
//     return {
//       transactionState: 'SUCCESS',
//     };
//   };

//   onReadyToPayChange = (event: CustomEvent<ReadyToPayChangeResponse>): void => {
//     console.log('ready to pay change', event.detail);
//   };

//   onClick = (event: Event): void => {
//     console.log('click');
//   };

//   onClickPreventDefault = (event: Event): void => {
//     console.log('prevent default');
//     event.preventDefault();
//   };
// }



// @NgModule({
//   declarations: [],
//   imports: [BrowserModule, FormsModule, GooglePayButtonModule],
//   providers: [],
//   bootstrap: [PaymentModule],
// })
// class PaymentModule {}