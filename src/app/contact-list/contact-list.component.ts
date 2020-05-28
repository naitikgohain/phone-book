import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppService } from '../config/app.service';
import { Contact } from '../models/contact.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [AppService]
})
export class ContactListComponent implements OnInit {

  searchValue = '';

  constructor(private appService: AppService) { }

  destroy$: Subject<boolean> = new Subject<boolean>();

  contactList: Contact[] = [];

  /*contactItem : Contact = {
        contactId:1,
        name: "STing",
        dob: "asdas",
        phone: ["sadsad"],
        email: ["sadsad"]
  }*/
  
  ngOnInit(): void {
    
    this.appService.getContacts("1","4").pipe(takeUntil(this.destroy$)).subscribe((contacts: any[]) => {
      //this.users = contacts;
      console.log(contacts);
      var tempItem: Contact[] =[];
      
      contacts.forEach(contact => {
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
        console.log(contactItem);
      });
      this.contactList = tempItem;
      
    });
  }

  viewAddContact():void {
  }

  searchContact(){
    console.log(this.searchValue);
  }

}
