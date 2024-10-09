import { Component, OnInit } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseConstants } from 'src/constants/constants';

const firebaseCollection = FirebaseConstants.collection;
const docId = FirebaseConstants.docId;
const usersCollection = FirebaseConstants.usersCollection;

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  formData: any = {
    sheets: "1w0FZ_t3mD0M5PFCB6zwJf4rgCDNmv6C4v68KMEK9I5I",
    sheetName: "Race",
    totalTeams: "20",
    name: "Họ Tên",
    mssv: "MSSV",
    defaultTeam: "Team",
    moreInfo: `[{"field":"donvi","column":"Khoa"},{"field":"chiadoi","column":"Chia đội"}]`
  };
  columnsMapping: any = [];
  userList: any = [];
  constructor(private googleSheetsDbService: GoogleSheetsDbService, private afs: AngularFirestore) { }

  ngOnInit(): void {
  }

  async resetTeams() {
    this.userList.forEach(async (user: any) => {
      await this.afs.collection(usersCollection).doc(user.mssv).set({ isVisible: false, timeStamp: null }, { merge: true }).then(
        (value) => { }
      );
    });
  }

  async clearAllData() {
    this.userList.forEach(async (user: any) => {
      setTimeout(async () => {
        await this.afs.collection(usersCollection).doc(user.mssv).set({ isVisible: true, timeStamp: new Date() }, { merge: true }).then(
          (value) => {

          }
        );
      }, 1000);
    });
  }

  previewList() {
    this.googleSheetsDbService.get<any>(this.formData.sheets, this.formData.sheetName, this.getColumnMappings())
      .subscribe({
        next: (list: any) => {
          this.userList = list.filter((item: any) => item.chiadoi == "x");
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  async saveAllList() {
    const data = this.randomTeam();
    data.forEach(async (item: any, index: number) => {
      if (item.team) {
        item.team = parseInt(item.team);
      }
      const splitName = item.name.split(" ");
      const shortName = splitName.slice(-2).join(" ");
      item.shortName = shortName;
      console.log("Start " + index);
      item.isVisible = false;
      await this.afs.collection(usersCollection).doc(item.mssv).set(item, { merge: true });
      console.log("End " + index);
    });
  }

  async createTeams() {
    this.getColumnMappings();
    const xtnObj: any = {
      numberOfTeams: this.formData.totalTeams,
      teams: [],
      columnsMapping: this.columnsMapping
    }
    for (let i = 1; i <= this.formData.totalTeams; i++) {
      xtnObj.teams.push({ id: i, name: "Nhóm " + i });
    }
    await this.afs.collection(firebaseCollection).doc(docId).set(xtnObj);
    alert("Đã khởi tạo danh sách nhóm");
  }
  private randomTeam() {
    let tempData = [...this.userList];
    let result: any = [];
    const personsPerTeam = Math.floor(this.userList.length / this.formData.totalTeams);
    const teamCheck: any = [];
    for (let i = 1; i <= this.formData.totalTeams; i++) {
      teamCheck[i] = personsPerTeam;
    }

    const teamDefault = tempData.filter((item: any) => item.team > 0);
    teamDefault.forEach((item: any) => {
      result.push(item);
      teamCheck[item.team]--;
      const index = tempData.findIndex((user: any) => user.mssv == item.mssv);
      tempData.splice(index, 1);
    });

    for (let i = 1; i <= this.formData.totalTeams; i++) {
      for (let j = 0; j < teamCheck[i]; j++) {
        const index = Math.floor(Math.random() * tempData.length);
        if (tempData.length > 0) {
          tempData[index].team = i;
          result.push(tempData[index]);
          tempData.splice(index, 1);
        }
      }
    }

    result = result.concat(tempData);
    result.sort((u1: any, u2: any) => {
      if (!u1.team) {
        u1.team = -1;
      }
      if (!u2.team) {
        u1.team = -1;
      }
      return u1.team - u2.team;
    });
    return result;
  }
  private getColumnMappings() {
    this.columnsMapping = [];
    const result: any = {};
    result.STT = "STT";
    if (this.formData.name) {
      result.name = this.formData.name;
    }
    result.team = "Team";
    if (this.formData.phoneNumber) {
      result.phoneNumber = this.formData.phoneNumber;
    }
    if (this.formData.mssv) {
      result.mssv = this.formData.mssv;
    }
    if (this.formData.email) {
      result.email = this.formData.email;
    }
    if (this.formData.birthday) {
      result.birthday = this.formData.birthday;
    }
    if (this.formData.className) {
      result.className = this.formData.className;
    }
    if (this.formData.moreInfo) {
      const moreInfo = JSON.parse(this.formData.moreInfo);
      moreInfo.forEach((item: any) => {
        result[item.field] = item.column;
      });
    }

    for (const key in result) {
      this.columnsMapping.push({ key: key, column: result[key] });
    }

    return result;
  }
}
