

export  interface Anketa {

  id: number
  date: Date
  ansList: AnketaQuestion[]
  ball: number

}

export interface AnketaQuestion{
  type: string
  ans: string
}
