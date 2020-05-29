import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppService } from '../config/app.service';
import { Contact } from '../models/contact.model';
import { Router } from '@angular/router'
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [AppService]
})
export class ContactListComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  searchValue = '';
  pageIndex:number = 0;
    pageSize:number = 4;
    lowValue:number = 0;
    highValue:number = 4;      

  constructor(private appService: AppService, private router: Router) { }

  destroy$: Subject<boolean> = new Subject<boolean>();

  date : Date
  contactList: Contact[] = [];

  /*contactItem : Contact = {
        contactId:1,
        name: "STing",
        dob: "asdas",
        phone: ["sadsad"],
        email: ["sadsad"]
  }*/
  
  ngOnInit(): void {
    this.updateList();
    
  }

  viewAddContact():void {
  }

  updateList(){
    this.appService.getContacts("1","4").pipe(takeUntil(this.destroy$)).subscribe((contacts: any[]) => {
      //this.users = contacts;
      console.log(contacts);

      var tempItem: Contact[] =[];
      
      contacts.forEach(contact => {
        let contactItem : Contact = {};
        contactItem.contactId = contact['contact_id'];
        contactItem.name = contact['name'];
        
        let date = new Date(contact['dob']);
        //console.log(date.getDate()); 
        contactItem.dob = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        let phoneList = contact['mobile'].split(","); 
        let emailList = contact['emails'].split(",");
        contactItem.phone = []
        phoneList.forEach(phone => {
          contactItem.phone.push(phone);
        });
        contactItem.email = []
        emailList.forEach(email => {
          contactItem.email.push(email);
        })
        tempItem.push(contactItem);
        console.log(contactItem);
      });
      this.contactList = tempItem;
      
    });
  }


  searchContact(){
    console.log(this.searchValue);
    this.appService.searchContact(this.searchValue).pipe(takeUntil(this.destroy$)).subscribe((results: any[]) => {
      //console.log(results);
      
      
      var tempItem: Contact[] =[];
      
      results.forEach(contact => {
        let contactItem : Contact = {};
        contactItem.contactId = contact['contact_id'];
        contactItem.name = contact['name'];
        contactItem.dob = contact['dob'];
        let phoneList = contact['mobile'].split(","); 
        let emailList = contact['emails'].split(",");
        contactItem.phone = []
        phoneList.forEach(phone => {
          contactItem.phone.push(phone);
        });
        contactItem.email = []
        emailList.forEach(email => {
          contactItem.email.push(email);
        })
        tempItem.push(contactItem);
        //console.log(contactItem);
      });
      this.paginator.firstPage();
      this.pageIndex=0;
      this.lowValue=0;
      this.highValue=4;
      this.contactList = tempItem;


    });
  }

  getPaginatorData(event){
    console.log(event);
    if(event.pageIndex === this.pageIndex + 1){
       this.lowValue = this.lowValue + this.pageSize;
       this.highValue =  this.highValue + this.pageSize;
      }
   else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
     }   
      this.pageIndex = event.pageIndex;
}

  editContact(item:Contact){
    this.router.navigateByUrl('/update', { state: item });
  }

  deleteContact(id:any){
    this.appService.deleteContact(id).pipe(takeUntil(this.destroy$)).subscribe((results: any) => {
      //this.users = contacts;
      this.updateList();
    });
  }

}
