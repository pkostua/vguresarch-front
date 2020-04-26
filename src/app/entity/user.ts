export class User {
  id: number;
  firstName: string;
  lastName: string;
  familyPosition: keyof typeof FamilyPosition;
  age: number;
  familyMembers: FamilyMember[];
  account: UserAccount;
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
  name: string;
  age:number;
  sex: keyof typeof Sex
}

export enum FamilyPosition {
  PARENT='PARENT',
  CHILD='CHILD'

}

export enum Sex {
  BOY='Мальчик',
  GIRL='Девочка'

}
