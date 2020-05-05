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
  smv: number //Суверенность мира вещей
  sp: number //Суверенность привычек
  user: User | null
  familyMember: FamilyMember | null
}

export class SppAdultTestResult{
  id: number
  date: Date
   gpl: number// (7) гиперпротекция
   gmin: number// (8) гипопротекция
   ypl: number// (8) потворствование
   ymin: number// (4) игнорирование потребностей
   tpl: number// (4) чрезмерность требований-обязанностей
   tmin: number// (4) недостаточность требований-обязанностей
   zpl: number// (4) чрезмерность требований-запретов
   zmin: number// (3) недостаточность требований-запретов
   cpl: number// (4) чрезмерность санкций
   smin: number// (4) минимальность санкций
   n: number// (5) неустойчивость стиля воспитания
   rrc: number// (6) расширение сферы родительских чувств
   pdk: number// (4) предпочтение в подростке детских качеств
   vn: number // (5) воспитательная неуверенность родителя
   fy: number// (6) фобия утраты ребенка
   nrc: number// (7) неразвитость родительских чувств
   pnk: number// (4) проекция на ребёнка собственных нежелаемых качеств
   vk: number// (4) внесение конфликта между супругами в сферу воспитания
   pzk: number// (4) предпочтение женских качеств
   pmk: number// (4) предпочтение мужских качеств

  user: User | null


}


