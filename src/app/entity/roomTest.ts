import {FamilyMember} from './user';

export interface RoomItemModel{
  id: number
  name: string
  img: string
  square: number
  owner: FamilyMember | null
  positionX: number | null
  positionY: number | null
  initX: number | null,
  initY: number | null
  rotate: number
  zedIndex: number
  type: string
}

export interface RoomTestModel {
  date: any
  myObjectCount: number
  myAliveCount: number
  collectiveObjectCount: number
  collectiveAliveCount: number
  otherObjectCount: number
  otherAliveCount: number
  mySquare: number
  collectiveSquare: number
  otherSquare: number
  items: RoomItemModel[]
}
