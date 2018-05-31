import { HomePagetest } from './hometest';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
declarations: [
    HomePagetest,
],
imports: [
    IonicPageModule.forChild(HomePagetest),
],
exports: [
    HomePagetest
]
})
export class HomePageModule {}
