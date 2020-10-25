

export  interface Anketa {

  id: number
  date: Date
  ansList: AnketaQuestion[]

}

export interface AnketaQuestion{
  type: string
  ans: number
}
