import {FamilyMember, User} from './user';

export class Test {
  id:number
  text: string
  ansList: string[]
  ans:string | null
}

export class TestAns {
  id:number
  ans:string
}

export class SppChildrenTestResult{
  id: number
  date: Date
  sft: number // суверенность физического тела
  st: number //Суверенность территории
  smv: number //Суверенность мира вещщей
  user: User | null
  familyMember: FamilyMember | null
}


