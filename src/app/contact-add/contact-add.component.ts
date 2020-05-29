import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppService } from '../config/app.service';
import { Contact } from '../models/contact.model';
import { Phone } from '../models/phone.model';
import { Email } from '../models/email.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
  providers: [AppService, MatSnackBar]
})
export class ContactAddComponent implements OnInit {

  phoneList: string[] = [];
  emailList: string[] = [];
  newPhone: string ="";
  newEmail: string ="";
  newName: string ;
  newDOB: string ;

  contactItem: Contact = {};

  constructor(private _snackBar: MatSnackBar,private appService: AppService, private router: Router) { }

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
  }

  phoneFormControl = new FormControl('',[
    Validators.minLength(10)
  ])
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.email
  ]);
 
  startDate = new Date(1990, 0, 1);

  dateChange(event: any){
    this.newDOB = event.getFullYear() + '-' + (event.getMonth() + 1) + '-' + event.getDate();
  }
  addPhone(){
    this.phoneList.push(this.newPhone);
    this.newPhone="";
  }

  addEmail(){
    this.emailList.push(this.newEmail);
    this.newEmail="";
  }

  addContact(){
    this.contactItem.name = this.newName;
    this.contactItem.dob = this.newDOB;
    this.contactItem.phone = this.phoneList;
    this.contactItem.email = this.emailList;
    //console.log(this.contactItem);
    this.appService.checkUniquePhone(this.contactItem.phone).pipe(takeUntil(this.destroy$)).subscribe((result1: any) => {
      //this.users = contacts;
      console.log(result1);
      if(result1=="BAD"){
        
          this._snackBar.open("Mobile number already exists");
          this.router.navigateByUrl('/');
      }else{
        this.appService.addContact(this.contactItem).pipe(takeUntil(this.destroy$)).subscribe((result: any) => {
          
            this._snackBar.open("Contact added successfully");
            this.router.navigateByUrl('/');

        });
      }
    });
    
      
  }

  cancelUpdate(){
    this.router.navigateByUrl('/');
  }


}
