import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMsg: string;
  constructor(private dataService: DataService, private router:Router,
    private _snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public dataSnackBar: any) { }

  ngOnInit(){}

 onLogin(from:NgForm){
   let data= from.value;
   this.dataService.login(data.email,data.password).then((result) => {
     this.errorMsg=null;
    this._snackBar.open("User Succesfully Loged in", null, this.dataSnackBar.duration)
     this.router.navigate(['/upload']);
   }).catch((err) => {
     this.errorMsg = err.message;
     this._snackBar.open("Email or Password invalid", null, this.dataSnackBar.duration)
   });
 }
}
