import { Component, OnInit } from '@angular/core';
import {FamilyMemberDto} from '../../entity/user';
import {MainService} from '../../main.service';

@Component({
  selector: 'app-by-member',
  templateUrl: './by-member.component.html',
  styleUrls: ['./by-member.component.css']
})
export class ByMemberComponent implements OnInit {

  constructor( public mainService:MainService) { }

  items:FamilyMemberDto[] = []

  ngOnInit(): void {
    this.mainService.statisticByMember().subscribe((ans)=>{
      this.items = ans.filter(m=>m.sppChildrenTestListChild.length || m.anketaList.length || m.roomTestList.length|| m.sppAdultTestListChild.length || m.sppAdultTestListParent.length)
      this.items.forEach(a=>
        a.mamaSppAdult =a.sppAdultTestListChild.find(i=>i.parent.familyPosition == "MAMA")
      )

    })
  }

}
