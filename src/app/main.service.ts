import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {FamilyMember, FamilyMemberDto, User} from './entity/user';
import {familyPosition, SppAdultTestResult, SppChildrenTestResult, Test, TestAns} from './entity/test';
import {Anketa, AnketaQuestion} from './entity/anketa';
import {RoomItemModel} from './entity/roomTest';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private  httpClient: HttpClient) { }
  url = environment.apiUrl;
  private savedTmpUserId: string = localStorage.getItem('tmpUserId')

  user: User ={
    id: 0,
    firstName: 'аноним',
    lastName: 'аноним',
    familyPosition: 'MAMA',
    age: null,
    familyMembers:[],
    tempUser: true,
    tmpUserId: this.savedTmpUserId?this.savedTmpUserId:new Date().getTime().toString(),
    account:null,
    admin: false
  };

  adminRoomTestData:  RoomItemModel[] = null

  get children(){
    return this.user.familyMembers.filter(m=>{
      const find = familyPosition.find(p=>p.name === m.familyPosition)
      return find && !find.isAdult && !m.deleted
    });
  }

  get targetChildren(){
    return this.user.familyMembers.filter(m=>{
      const find = familyPosition.find(p=>p.name === m.familyPosition)
      return find && find.isTarget && !m.deleted
    });
  }
  get adults() {
    return this.user.familyMembers.filter(m=>{
      const find = familyPosition.find(p=>p.name === m.familyPosition)
      return find && find.isAdult && !m.deleted
    })
  }

  currentChild: FamilyMember | null = null

  currentAdult: FamilyMember | null = null

  getAuthUser() {
    return this.httpClient.get<User>(this.url + 'user/getUser')
  }

  getTmpUser() {
    return this.httpClient.get<User>(this.url + 'user/getTmpUser?tmpUserId='+this.user.tmpUserId)
  }

  updateUser(user: User) {
    return this.httpClient.post<User>(this.url + 'user/updateUser', user)
  }

  updateTmpUser(user: User) {
    localStorage.setItem("tmpUserId", user.tmpUserId)
    return this.httpClient.post<User>(this.url + 'user/updateUser?tmpUserId='+user.tmpUserId, user)
  }

  getSppChildrenData() {
    return this.httpClient.get<Test[]>(this.url + 'sppChildren')
  }

  postSppChildrenData(data: TestAns[]) {
    let url = this.url + 'sppChildren?pre=0'
    if(this.user.tmpUserId) url+='&tmpUserId='+this.user.tmpUserId
    if(this.currentAdult) url += '&parentId='+this.currentAdult.id
    if(this.currentChild) url += '&childId='+this.currentChild.id
    return this.httpClient.post<SppChildrenTestResult>(url,{data:data})
  }

  getSppChildrenTestData() {
    let url = this.url + 'sppChildren/data?pre=0'
    if(this.user.tmpUserId) url+='&tmpUserId='+this.user.tmpUserId
    if(this.currentAdult) url += '&parentId='+this.currentAdult.id
    if(this.currentChild) url += '&childId='+this.currentChild.id
    return this.httpClient.get<{data:TestAns[]}>(url)
  }

  getSppAdultData() {
    return this.httpClient.get<Test[]>(this.url + 'sppAdult')
  }

  postSppAdultData(data: TestAns[]) {
    let url = this.url + 'sppAdult?pre=0'
    if(this.user.tmpUserId) url+='&tmpUserId='+this.user.tmpUserId
    if(this.currentAdult) url += '&parentId='+this.currentAdult.id
    if(this.currentChild) url += '&childId='+this.currentChild.id
    return this.httpClient.post<SppAdultTestResult>(url,{data:data})
  }

  getSppAdultTestData() {
    let url = this.url + 'sppAdult/data?pre=0'
    if(this.user.tmpUserId) url+='&tmpUserId='+this.user.tmpUserId
    if(this.currentAdult) url += '&parentId='+this.currentAdult.id
    if(this.currentChild) url += '&childId='+this.currentChild.id
    return this.httpClient.get<{data:TestAns[]}>(url)
  }

  getAnketaData() {
    return this.httpClient.get<Test[]>(this.url + 'anketa')
  }

  postAnketaData(data: TestAns[]) {
    let url = this.url + 'anketa?pre=0'
    if(this.user.tmpUserId) url+='&tmpUserId='+this.user.tmpUserId
    if(this.currentAdult) url += '&parentId='+this.currentAdult.id
    if(this.currentChild) url += '&childId='+this.currentChild.id
    return this.httpClient.post<Anketa>(url,{data:data})
  }
  getAnketaTestData() {
    let url = this.url + 'anketa/data?pre=0'
    if(this.user.tmpUserId) url+='&tmpUserId='+this.user.tmpUserId
    if(this.currentAdult) url += '&parentId='+this.currentAdult.id
    if(this.currentChild) url += '&childId='+this.currentChild.id
    return this.httpClient.get<AnketaQuestion[]>(url)
  }

  postRoomData(data: RoomItemModel[]) {
    let url = this.url + 'room?pre=0'
    if(this.user.tmpUserId) url+='&tmpUserId='+this.user.tmpUserId
    if(this.currentAdult) url += '&memberId='+this.currentAdult.id
    else if(this.currentChild) url += '&memberId='+this.currentChild.id
    return this.httpClient.post<any>(url,{data:data})
  }
  getRoomTestData() {
    let url = this.url + 'room/data?pre=0'
    if(this.user.tmpUserId) url+='&tmpUserId='+this.user.tmpUserId
    if(this.currentAdult) url += '&memberId='+this.currentAdult.id
    else if(this.currentChild) url += '&memberId='+this.currentChild.id
    return this.httpClient.get<RoomItemModel[]>(url)
  }

  getRoomTestAdminData(memberId: number) {
    let url = this.url + 'room/data?memberId='+memberId
    return this.httpClient.get<RoomItemModel[]>(url)
  }

  statisticByMember() {
    return this.httpClient.get<FamilyMemberDto[]>(this.url + 'admin/byMember?tmpUserId='+this.user.tmpUserId)
  }
}
