import { Component, OnInit } from '@angular/core';
import {FamilyMember, FamilyMemberDto, User} from '../../entity/user';
import {MainService} from '../../main.service';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../info-dialog/info-dialog.component';
import {Router} from '@angular/router';

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
      this.items = ans.filter(m => m.sppChildrenTestListChild.length || m.anketaList.length
        || m.roomTestList.length || m.sppAdultTestListChild.length || m.sppAdultTestListParent.length);
      this.items.forEach(a =>
        a.mamaSppAdult = a.sppAdultTestListChild.find(i => i.parent.familyPosition === 'MAMA')
      );
    });
  }

  gotoRoomTest(c: FamilyMember) {
    this.mainService.getRoomTestAdminData(c.id).subscribe((ans)=>{
      this.mainService.adminRoomTestData = ans
      this.router.navigate(['room-test']);
    })

  }

  showAnketaDialog(u: User) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: `<h3>${u.account ? ('<a href="'+u.account.profileUrl+'" target="_blank">'+u.account.imageUrl+'</a>') : u.tmpUserId}</h3>
        <table>
            <thead>
                <tr>
                    <th>имя</th><th>должность</th><th>возраст</th><th>пол</th>
                </tr>
                ${u.familyMembers.map(m => this.memberSting(m)).join("")}
            </thead>
        </table>
`
    })
  }

  memberSting(m:FamilyMember): string{
    return `<tr><td>${m.name}</td><td>${m.familyPosition}</td><td>${m.age}</td><td>${m.sex}</td></tr>`
  }

}
