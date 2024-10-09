import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingPanelService } from 'src/app/services/loading-panel.service';
import { FirebaseConstants } from 'src/constants/constants';

const firebaseCollection = FirebaseConstants.collection;
const docId = FirebaseConstants.docId;
const usersCollection = FirebaseConstants.usersCollection;

@Component({
  selector: 'app-main-dash-board',
  templateUrl: './main-dash-board.component.html',
  styleUrls: ['./main-dash-board.component.scss']
})
export class MainDashBoardComponent implements OnInit {
  teams: any = [];
  userList: any = [];
  docSub: any;
  collSub: any;
  group: any = [];
  constructor(private afs: AngularFirestore, private loadingPanelSvc: LoadingPanelService) { }

  ngOnDestroy(): void {
    this.docSub.complete();
    this.collSub.complete();
  }

  ngOnInit(): void {
    this.loadingPanelSvc.hideLoadingPanel();
    this.docSub = this.afs.collection(firebaseCollection).doc(docId).get().subscribe({
      next: (data: any) => {
        this.teams = data.data().teams;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    this.collSub = this.afs.collection(usersCollection).valueChanges().subscribe({
      next: (data: any) => {
        data.sort((a: any, b: any) => {
          return a.team - b.team;
        });
        this.userList = data;

      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  groupUsersByTeam() {
  }
}
