import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppService } from '../config/app.service';
import { Contact } from '../models/contact.model';
import { Phone } from '../models/phone.model';
import { Email } from '../models/email.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css'],
  providers: [AppService, MatSnackBar]
})
export class ContactUpdateComponent implements OnInit {

  contact: Contact;

  newPhone: string ="";
  newEmail: string ="";
  phoneList: Phone[] =[];
  emailList: Email[] = [];

  constructor(private _snackBar: MatSnackBar,private appService: AppService, private router:Router, private activatedRoute:ActivatedRoute) { 
    console.log(this.router.getCurrentNavigation().extras.state)
    if(this.router.getCurrentNavigation().extras.state==undefined){
      console.log("go back");
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    //console.log(this.router.getCurrentNavigation().extras);
    console.log(history);
    
    this.contact = history.state;
    this.fetchPhone();
    this.fetchEmail();
  }

  
  destroy$: Subject<boolean> = new Subject<boolean>();

  phoneFormControl = new FormControl('',[
    Validators.minLength(10)
  ])
  phoneFormControlNew = new FormControl('',[
    Validators.minLength(10)
  ])
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.email
  ]);

  startDate = new Date(1990, 0, 1);

  trackByPn(index: any, item: any) {
    return item[index];
 }
 trackByEm(index: any, item: any) {
  return item[index];
}

  dateChange(event: any){
    this.contact.dob = event.getFullYear() + '-' + (event.getMonth() + 1) + '-' + event.getDate();
  }
  addPhone(){
    //let phoneItem : Phone = {phone:""};
    //phoneItem.phone=this.newPhone;
    //this.contact.phone.push(this.newPhone);
    this.appService.addPhoneToContact(this.contact.contactId,this.newPhone).pipe(takeUntil(this.destroy$)).subscribe((results: any) => {
      //this.users = contacts;
      this.fetchPhone();
      this._snackBar.open("Phone number added.",'' ,{
        duration: 2000,
      });
      this.newPhone="";
    });
    
  }
  addEmail(){
    //let emailItem : Email = {email: ""};
    //emailItem.email=this.newEmail;
    //this.contact.email.push(this.newEmail);
    this.appService.addEmailToContact(this.contact.contactId,this.newEmail).pipe(takeUntil(this.destroy$)).subscribe((results: any) => {
      //this.users = contacts;
      this.fetchEmail();
      this._snackBar.open("Email added.",'' ,{
        duration: 2000,
      });
      this.newEmail="";
    });

  }

  updateContact(){
    console.log(this.contact);
    this.appService.updateContact(this.contact).pipe(takeUntil(this.destroy$)).subscribe((result: any) => {
      //this.users = contacts;
      if(result==null){
        console.log("DID noT enter");
        this._snackBar.open("Unexpected error",'' ,{
          duration: 2000,
        });
      }else{
        this._snackBar.open("Contact updated successfully",'' ,{
          duration: 2000,
        });
        this.router.navigateByUrl('/');
      }
    });
  }

  updateEmailById(id:any, email:string){
    this.appService.updateEmailById(id, email).pipe(takeUntil(this.destroy$)).subscribe((results: any[]) => {
      //this.users = contacts;
      this.fetchEmail();
      this._snackBar.open("Email updated",'' ,{
        duration: 2000,
      });
    });
  }

  updatePhoneById(id:any, phone:string){
    this.appService.updatePhoneById(id, phone).pipe(takeUntil(this.destroy$)).subscribe((results: any[]) => {
      //this.users = contacts;
      this.fetchPhone();
      this._snackBar.open("Phone number updated",'' ,{
        duration: 2000,
      });
    });
  }


  
  fetchPhone(){
    this.appService.getPhoneDetails(this.contact.contactId.toString()).pipe(takeUntil(this.destroy$)).subscribe((results: any[]) => {
      //this.users = contacts;
      let phoneList : Phone[] = [];
      console.log(results);
      results.forEach(item=>{
        
        let tempPhone:Phone = {};
        tempPhone.id=item['id'];
        tempPhone.phone=item['phoneno'];
        phoneList.push(tempPhone);
      })
      this.phoneList = phoneList;
    });
  }

  fetchEmail(){
    this.appService.getEmailDetails(this.contact.contactId.toString()).pipe(takeUntil(this.destroy$)).subscribe((results: any[]) => {
      //this.users = contacts;
      let emailList : Email[] =[];
      console.log(results);
      results.forEach(item=>{
        let tempEmail:Email ={};
        tempEmail.id=item['id'];
        tempEmail.email=item['email'];
        emailList.push(tempEmail);
      })
      this.emailList = emailList;
    });
  }

  cancelUpdate(){
    this.router.navigateByUrl('/');
  }
}
