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
  admin: boolean = false;
  roomCount?: number
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
  hasSppAdult: boolean
  deleted?: boolean
  birthOrder?: number
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
  sppChildrenTestList: SppChildrenTestResult[],
  sppAdultTestList: SppAdultTestResult[],
  roomTestList: RoomTestModel[]
  anketaList:Anketa[]

}
