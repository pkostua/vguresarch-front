import {FamilyMember, User} from './user';

export class Test {
  id:number | string
  text: string
  ansList: string[]
  ans:string | null
}

export class TestAns {
  id:number | string
  ans:string
}

export class SppChildrenTestResult{
  id: number
  date: Date
  sft: number // суверенность физического тела
  st: number //Суверенность территории
  smv: number //Суверенность мира вещей
  sp: number //Суверенность привычек
  ss:number
  sts:number
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

  parent: FamilyMember
  child: FamilyMember


}

export const familyPosition = [
  {name:'BABY', title: "малыш", isAdult:false , isTarget: false},
  {name:'SADIK', title:"ходит в садик", isAdult:false, isTarget: false},
  {name:'FIRST_CLASS', title:"1 класс", isAdult:false, isTarget: true},
  {name:'SECOND_CLASS', title:"2 класс", isAdult:false, isTarget: true},
  {name:'THIRD_CLASS', title:"3 класс", isAdult:false, isTarget: true},
  {name:'FORTH_CLASS', title:"4 класс", isAdult:false, isTarget: true},
  {name:'FIVE_CLASS_AND_MORE', title:"5 класс и старше", isAdult:false, isTarget: false},
  {name:'STUDENT', title:"студент", isAdult:false, isTarget: false},
  {name:'MAMA', title:"мама", isAdult:true, isTarget: false},
  {name:'PAPA', title:"папа", isAdult:true, isTarget: false},
  {name:'GANNY', title:"бабушка", isAdult:true, isTarget: false},
  {name:'GRANDFATHER', title:"дедеушка", isAdult:true, isTarget: false},
  {name:'ANT', title:"тётя", isAdult:true, isTarget: false},
  {name:'ANCL', title:"дядя", isAdult:true, isTarget: false},
  {name:'OTHER', title:"другой родственник", isAdult:true, isTarget: false},
  {name:'BROTHER', title: "брат старше 18 лет", isAdult:true, isTarget: false},
  {name:'SISTER', title: "сестра старше 18 лет", isAdult:true, isTarget: false}]

export const positionTitle = (name:string) =>{
  if(!name) return null
  let find =  familyPosition.find(p=>p.name === name)
  if(!find) return null
  return find.title
}
