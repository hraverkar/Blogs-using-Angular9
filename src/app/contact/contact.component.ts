import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DataService } from '../services/data.service';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ContactComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  name:string;
  contact:string;
  email:string;
  address:string;

  constructor(private _formBuilder: FormBuilder, private dataServices: DataService
    ,private _snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public dataSnackBar: any) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      second1Ctrl:['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  form3(){
    let id = uuidv4();
    this.email = this.secondFormGroup.value.second1Ctrl;
    this.contact = this.secondFormGroup.value.secondCtrl;
    this.name = this.firstFormGroup.value.firstCtrl;
    this.address = this.thirdFormGroup.value.thirdCtrl;
    console.log(this.thirdFormGroup.value);
    this.dataServices.addUserInfo(id,this.name,this.contact, this.email,this.address).then((result)=>{
      this._snackBar.open("User Added into database", null, this.dataSnackBar.duration);
    })
    .catch(err=>{
      this._snackBar.open("User information not added", null,this.dataSnackBar.duration);
      console.log('register user data (firestore)', err.message);
    }).finally(()=>
      //this.reset()
      console.log("Harshal raveerkar")
      );
    }

  reset(): void {
    this.name=null;
    this.contact = null;
    this.email = null;
    this.address = null;
    this.firstFormGroup=null;
    this.thirdFormGroup =null;
    this.thirdFormGroup = null;
  }
}
