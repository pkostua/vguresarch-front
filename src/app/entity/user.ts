import {SppAdultTestResult, SppChildrenTestResult} from './test';
import {Anketa} from './anketa';
import {RoomTestModel} from './roomTest';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  familyPosition: string;
  age: number;
  familyMembers: FamilyMember[];
  account: UserAccount | null;
  tmpUserId: string | null
  tempUser: boolean = false;
  admin: boolean = false
}

export class UserAccount {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  profileUrl: string;
  imageUrl: string;
}

export class FamilyMember {
  id: number;
  name: string;
  age:number;
  sex: (keyof typeof Sex) | null
  familyPosition: string
  hasAnketa: boolean
  hasRoom: boolean
  hasSppChildren: boolean
  sppAdultList: number[]
  deleted?: boolean
}


export enum Sex {
  BOY='Мальчик',
  GIRL='Девочка'

}

export interface FamilyMemberDto {
  name: string,
  age: number,
  sex: string
  familyPosition: string
  user: User
  sppChildrenTestListChild: SppChildrenTestResult[],
  sppAdultTestListParent: SppAdultTestResult[],
  sppAdultTestListChild: SppAdultTestResult[],
  roomTestList: RoomTestModel[]
  anketaList:Anketa[]
  mamaSppAdult:SppAdultTestResult

}
