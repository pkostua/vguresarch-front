import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {FamilyMember, FamilyPosition, User} from './entity/user';
import {SppAdultTestResult, SppChildrenTestResult, Test, TestAns} from './entity/test';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private  httpClient: HttpClient) { }
  url = environment.apiUrl;

  user: User ={
    id: 0,
    firstName: 'аноним',
    lastName: 'аноним',
    familyPosition: FamilyPosition.PARENT,
    age: null,
    familyMembers:[],
    tempUser: true,
    account:{
      id:'',
      displayName:'аноним',
      firstName: 'аноним',
      lastName: 'аноним',
      email:'',
      userName: '',
      profileUrl: '',
      imageUrl: ''
    }
  };

  currentChild: FamilyMember | null = null

  getAuthUser() {
    return this.httpClient.get<User>(this.url + 'user/getUser')
  }
  updateUser(user: User) {
    return this.httpClient.post<any>(this.url + 'user/updateUser', user)
  }

  getSppChildrenData() {
    return this.httpClient.get<Test[]>(this.url + 'sppChildren')
  }

  postSppChildrenData(data: TestAns[], name: string, age: number, sex: string) {
    let url = this.url + 'sppChildren?name='+name+'&age='+age+'&sex='+sex
    return this.httpClient.post<SppChildrenTestResult>(url,{data:data})
  }

  getSppAdultData() {
    return this.httpClient.get<Test[]>(this.url + 'sppAdult')
  }

  postSppAdultData(data: TestAns[], name: string | null, age: number | null) {
    let url = this.url + 'sppAdult'
      if(name && age){
        url += '?name='+name+'&age='+age
      }
    return this.httpClient.post<SppAdultTestResult>(url,{data:data})
  }
}
