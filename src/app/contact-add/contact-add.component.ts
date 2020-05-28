import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppService } from '../config/app.service';
import { Contact } from '../models/contact.model';
import { Phone } from '../models/phone.model';
import { Email } from '../models/email.model';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
  providers: [AppService]
})
export class ContactAddComponent implements OnInit {

  phoneList: string[] = [];
  emailList: string[] = [];
  newPhone: string ="";
  newEmail: string ="";
  newName: string ;
  newDOB: string ;

  contactItem: Contact = {};

  constructor(private appService: AppService, private router: Router) { }

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
    //let phoneItem : Phone = {phone:""};
    //phoneItem.phone=this.newPhone;
    this.phoneList.push(this.newPhone);
    this.newPhone="";
  }

  addEmail(){
    //let emailItem : Email = {email: ""};
    //emailItem.email=this.newEmail;
    this.emailList.push(this.newEmail);
    this.newEmail="";
  }

  addContact(){
    this.contactItem.name = this.newName;
    this.contactItem.dob = this.newDOB;
    this.contactItem.phone = this.phoneList;
    this.contactItem.email = this.emailList;
    console.log(this.contactItem);
    this.appService.addContact(this.contactItem).pipe(takeUntil(this.destroy$)).subscribe((result: any) => {
      //this.users = contacts;
      if(result==null){
        console.log("DID noT enter");
      }else{
        this.router.navigateByUrl('/');
      }
    });
      
  }


}
