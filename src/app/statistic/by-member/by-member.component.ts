import { Component, OnInit } from '@angular/core';
import {FamilyMember, FamilyMemberDto, User} from '../../entity/user';
import {MainService} from '../../main.service';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../info-dialog/info-dialog.component';
import {Router} from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-by-member',
  templateUrl: './by-member.component.html',
  styleUrls: ['./by-member.component.css']
})
export class ByMemberComponent implements OnInit {

  constructor( public mainService: MainService, public dialog: MatDialog,  private router: Router) { }

  items: FamilyMemberDto[] = [];

  ngOnInit(): void {
    this.mainService.statisticByMember().subscribe((ans) => {
      this.items = ans.filter(a=>a.user && a.name)
    });
  }

  gotoRoomTest(c: FamilyMemberDto) {
    //this.mainService.getRoomTestAdminData(c.id).subscribe((ans)=>{
      this.mainService.adminRoomTestData = c.roomTestList[0].items
      this.router.navigate(['room-test']);
   // })

  }

  d(date:any){
    return moment(date).format("DD.MM.YY HH:mm")
  }

  showAnketaDialog(u: User) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: `<h3>${u.account ? ('<a href="'+u.account.profileUrl+'" target="_blank">'+u.account.imageUrl+'</a>') : u.tmpUserId}</h3>
        <h3>Комнат: ${u.roomCount}</h3>
        <table>
            <thead>
                <tr>
                    <th>имя</th><th>должность</th><th>возраст</th><th>пол</th><th>порядок рождения</th>
                </tr>
                ${u.familyMembers.map(m => this.memberSting(m)).join("")}
            </thead>
        </table>
`
    })
  }

  memberSting(m:FamilyMember): string{
    return `<tr><td>${m.name}</td><td>${m.familyPosition}</td><td>${m.age}</td><td>${m.sex}</td><td>${m.birthOrder}</td></tr>`
  }

}
