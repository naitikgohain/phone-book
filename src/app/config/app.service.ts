import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Contact } from '../models/contact.model';

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
  
  }