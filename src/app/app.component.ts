import {Component, OnInit} from '@angular/core';
import {MainService} from './main.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loading: boolean = false;
  constructor(public mainService: MainService, private router: Router) {

  }

  ngOnInit(): void {
    this.mainService.getAuthUser().subscribe(ans=>{
      this.mainService.user = ans;
      this.loading = false;
      this.mainService.user.tmpUserId = null
      if(this.mainService.user.familyMembers.length == 0)
          this.router.navigate(['first'])
      else this.router.navigate(['testRouter'])
    },()=>{
      this.mainService.getTmpUser().subscribe((ans)=>{
        if(ans){
          this.mainService.user = ans
        }
      },()=>{},()=>{
        this.router.navigate(['login'])
        this.loading = false
      })
    })
  }
}
