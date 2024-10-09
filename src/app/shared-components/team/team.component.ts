import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input() team: any = {};
  @Input() set users(value: any) {
    if (value) {
      const temp = value.filter((u: any) => u.team === this.team.id && u.isVisible && u.timeStamp);
      temp.sort((t1: any, t2: any) => {
        return  t1.timeStamp.seconds - t2.timeStamp.seconds;
      });
      const alpha = temp.length - this._users.length;
      this._users = temp;
      for (let i = 0; i < alpha; i++) {
        setTimeout(() => {
          this.displayedNumber++;
        }, Math.floor(Math.random() * 1000 + 100));
      }
      
    }
  }
  _users: any = [];
  displayedNumber = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
