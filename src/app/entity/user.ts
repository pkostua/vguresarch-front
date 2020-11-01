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
}


export enum Sex {
  BOY='Мальчик',
  GIRL='Девочка'

}
