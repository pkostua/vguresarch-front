

export  interface Anketa {

  id: number
  date: Date
  ansList: AnketaQuestion[]
  ball: number
  smv: number
  sft: number
  st: number
  ss: number
  sp: number
  sts: number

}

export interface AnketaQuestion{
  type: string
  ans: string
}
