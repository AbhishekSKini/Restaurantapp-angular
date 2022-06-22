import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restuarant-dash',
  templateUrl: './restuarant-dash.component.html',
  styleUrls: ['./restuarant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {

  formValue!: FormGroup;
  restaurantModelObj :RestaurantData = new RestaurantData;
  allRestaurantData: any;
  enableUpdate=false;
  enableAdd=true;
 term = '';
 // searchTerm = '';
  allResttData=[];

  constructor(private formBuilder: FormBuilder , private api :ApiService) {

  }

  ngOnInit(): void {
 
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    });
    this.getRest();
    
  }
addResto(){
  this.formValue.reset();
  this.enableUpdate=false;
  this.enableAdd=true;
}

addRest(){
  this.restaurantModelObj.name=this.formValue.value.name;
  this.restaurantModelObj.email=this.formValue.value.email;
  this.restaurantModelObj.address=this.formValue.value.address;
  this.restaurantModelObj.services=this.formValue.value.services;
  this.restaurantModelObj.mobile=this.formValue.value.mobile;
 
  this.api.postRestuarant(this.restaurantModelObj).subscribe(res=>{
    console.log(res)
    alert("Restuarant Records added")
    this.formValue.reset();
    this.getRest();
  },
  err=>{
    alert("some error")
  })
  
}

enableDisable(){
  this.enableUpdate=true;
  this.enableAdd=false;
}

getRest(){
  this.api.getRestuarant().subscribe(res=>{
    this.allRestaurantData = res;
  })
}

editRest(data:any){
  this.restaurantModelObj.id=data.id;
  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['address'].setValue(data.address);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['services'].setValue(data.services);
}

updateRest(){
  this.restaurantModelObj.name=this.formValue.value.name;
  this.restaurantModelObj.email=this.formValue.value.email;
  this.restaurantModelObj.address=this.formValue.value.address;
  this.restaurantModelObj.services=this.formValue.value.services;
  this.restaurantModelObj.mobile=this.formValue.value.mobile;
  this.api.updateRestuarant(this.restaurantModelObj.id,this.restaurantModelObj).subscribe(res=>{
    console.log(res)
    alert("Restuarant Records updated")
    this.formValue.reset();
    this.getRest();
   
  },
  err=>{
    alert("some error")
  })
}

delRest(data:any){
  console.log(data);
  this.api.deleteRestuarant(data.id).subscribe(res=>{
    alert("Record deleted");
    this.getRest();
  })
}

search(value: string): void {
  this.allResttData = this.allRestaurantData.filter((val:any) =>
    val.name.toLowerCase().includes(value)
  );
  console.log(this.allResttData);
  
}
}
