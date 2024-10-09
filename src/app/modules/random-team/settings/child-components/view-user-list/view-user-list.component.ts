import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingPanelService } from 'src/app/services/loading-panel.service';
import { FirebaseConstants } from 'src/constants/constants';

const firebaseCollection = FirebaseConstants.collection;
const docId = FirebaseConstants.docId;
const usersCollection = FirebaseConstants.usersCollection;

@Component({
  selector: 'app-view-user-list',
  templateUrl: './view-user-list.component.html',
  styleUrls: ['./view-user-list.component.scss']
})
export class ViewUserListComponent implements OnInit, OnDestroy {
  columnsMapping: any = [];
  userList: any = [];
  docSub: any;
  collSub: any;
user: any;
  constructor(private afs: AngularFirestore, private loadingpanelService: LoadingPanelService,) { }

  ngOnDestroy(): void {
    this.docSub.complete();
    this.collSub.complete();
  }

  ngOnInit(): void {
    this.docSub = this.afs.collection(firebaseCollection).doc(docId).get().subscribe({
      next: (data: any) => {
        this.columnsMapping = data.data().columnsMapping;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    this.collSub = this.afs.collection(usersCollection).valueChanges().subscribe({
      next: (data: any) => {
        this.userList = data;
        this.userList.sort((a: any, b: any) => {
          return a.team - b.team;
        });
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  HideInfo(mssv: any) {
    setTimeout(async () => {
      await this.afs.collection(usersCollection).doc(mssv).set({ isVisible: false, timeStamp: new Date() }, { merge: true }).then(
        (value) => {
          this.loadingpanelService.hideLoadingPanel();
        }
      );
    });
  }

  ShowInfo(mssv: any) {
    setTimeout(async () => {
      await this.afs.collection(usersCollection).doc(mssv).set({ isVisible: true, timeStamp: new Date() }, { merge: true }).then(
        (value) => {
          this.loadingpanelService.hideLoadingPanel();
        }
      );
    });
  }

  HideInfoAll(userList : any) {
    userList.forEach((user : any) => {
    setTimeout(async () => {
      await this.afs.collection(usersCollection).doc(user.mssv).set({ isVisible: false, timeStamp: new Date() }, { merge: true }).then(
        (value) => {
          this.loadingpanelService.hideLoadingPanel();
        }
      );
    });
  });
  }
  ShowInfoAll(userList : any) {
    userList.forEach((user : any) => {
    setTimeout(async () => {
      await this.afs.collection(usersCollection).doc(user.mssv).set({ isVisible: true, timeStamp: new Date() }, { merge: true }).then(
        (value) => {
          this.loadingpanelService.hideLoadingPanel();
        }
      );
    });
  });
  }
  


}
