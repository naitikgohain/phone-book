import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Contact } from '../models/contact.model';

/*
This file hosts all the client side API endpoints
*/

@Injectable()
  export class AppService {
  
    constructor(private http: HttpClient) { }
  
    rootURL = '/api';
  

    getContacts(page: string,offset: string){
        return this.http.get(this.rootURL + '/contacts', {
          params:{page: page, offset:offset}
        });
    }
  
    addContact(contact: Contact) {
      return this.http.post(this.rootURL+ "/contacts", contact);
    }

    searchContact(query: string){
      return this.http.get(this.rootURL + '/search', {
        params:{q: query}
      });
    }

    updateContact(contact: Contact){
      return this.http.put(this.rootURL + '/updateContact', contact);
    }

    updatePhoneById(id:any, phone:string){
      return this.http.put(this.rootURL + '/updatePhone', {
        id: id, phone: phone
      })
    }

    updateEmailById(id:any, email:string){
      return this.http.put(this.rootURL + '/updateEmail', {
        id: id, email: email
      })
    }

    getPhoneDetails(query:string){
      return this.http.get(this.rootURL + '/phoneDetails', {
        params:{contactId: query+""}
      })
    }
    getEmailDetails(query:string){
      return this.http.get(this.rootURL + '/emailDetails', {
        params:{contactId: query}
      })
    }


    addPhoneToContact(contactId:any, phone:string){
      return this.http.post(this.rootURL + '/addPhone', {
        id: contactId, phone: phone}
      )
    }
    addEmailToContact(contactId:any, email:string){
      return this.http.post(this.rootURL + '/addEmail', {
        id: contactId, email: email
      })
    }

    deleteContact(contactId:any){
      return this.http.delete(this.rootURL + '/deleteContact',{
        params:{q:contactId}
      })
    }
    checkUniquePhone(phone:any){
      return this.http.post(this.rootURL +'/checkUniquePhone',{
        q:phone
      })
    }


  
  }