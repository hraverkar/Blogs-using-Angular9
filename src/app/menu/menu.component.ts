import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public isUserLogin : boolean = false;
  constructor(private dataService : DataService, private router : Router,
    private _snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public dataSnackBar: any) { }

  ngOnInit(): void {
  }

  logout() {
    this.dataService.logout()
    .then(result => {
      this.router.navigate(['/login']);
      this._snackBar.open("User logged out", null, this.dataSnackBar.duration)
    })
    .catch(err => {
      console.log('err', err.message);
      this._snackBar.open("Some error occured", null,this.dataSnackBar.duration)

    })
  }
}
