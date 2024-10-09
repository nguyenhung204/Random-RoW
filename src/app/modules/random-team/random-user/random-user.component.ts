import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingPanelService } from 'src/app/services/loading-panel.service';
import * as confetti from "canvas-confetti";
import { FirebaseConstants } from 'src/constants/constants';

const firebaseCollection = FirebaseConstants.collection;
const docId = FirebaseConstants.docId;
const usersCollection = FirebaseConstants.usersCollection;

@Component({
  selector: 'app-random-user',
  templateUrl: './random-user.component.html',
  styleUrls: ['./random-user.component.scss']
})
export class RandomUserComponent implements OnInit, OnDestroy {

  sub: any;
  docSub: any;
  user: any = {};
  mssv = "";
  errorMessage = "";
  teamOptions: any = [];
  renderer2: Renderer2 | undefined;
  elementRef: any;
  constructor(private loadingpanelService: LoadingPanelService, private afs: AngularFirestore) { }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.complete();
    }
    if (this.docSub) {
      this.docSub.complete();
    }
  }

  ngOnInit(): void {
    this.loadingpanelService.hideLoadingPanel();
    this.docSub = this.afs.doc(`${firebaseCollection}/${docId}`).get().subscribe({
      next: (doc: any) => {
        this.teamOptions = doc.data().teams;
      }
    });
  }

  checkInfo() {
    this.loadingpanelService.showLoadingPanel();
    this.sub = this.afs.collection(usersCollection).doc(this.mssv).valueChanges().subscribe({
      next: (data: any) => {
        this.loadingpanelService.hideLoadingPanel();
        if (!data) {
          this.errorMessage = "Không tìm thấy thông tin của bạn, hãy liên hệ với ban tổ chức nhé";
        } else {
          this.user = data;
        }
      },
      error: (error: any) => {
        this.loadingpanelService.hideLoadingPanel();
        this.errorMessage = "Không tìm thấy thông tin của bạn, hãy liên hệ với ban tổ chức nhé";
      }
    });
  }
  getTeam(id: number) {
    const team = this.teamOptions.find((t: any) => t.id === id);
    return team ? team.name : id + "";
  }

  randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  createSnow() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var skew = 1;
    const canvas = this.renderer2?.createElement('canvas');
    this.renderer2?.appendChild(this.elementRef.nativeElement, canvas);
    const snowConfetti = confetti.create(canvas, {
      resize: true // will fit all screen sizes
    });
    this.frame(snowConfetti, canvas, duration, animationEnd, skew)
  }

  frame(snowConfetti: any, canvas: HTMLElement, duration: number, animationEnd: number, skew: number) {

    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(500, 700 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);
    snowConfetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: (Math.random() * skew) - 0.2
      },
      colors: ['#b72329'],
      shapes: ['circle'],
      gravity: this.randomInRange(0.4, 0.6),
      scalar: this.randomInRange(0.4, 1),
      drift: this.randomInRange(-0.4, 0.4)
    });

    if (timeLeft > 0) {
      requestAnimationFrame(() => this.frame(snowConfetti, canvas, duration, animationEnd, skew));
    }
  }

  surprise(): void {
    const canvas = this.renderer2?.createElement('canvas');
    this.renderer2?.appendChild(this.elementRef.nativeElement, canvas);
    const sufConfetti = confetti.create(canvas, {
      resize: true // will fit all screen sizes
    });
    sufConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  async randomTeam() {
    this.loadingpanelService.showLoadingPanel();
    setTimeout(async () => {
      await this.afs.collection(usersCollection).doc(this.user.mssv).set({ isVisible: true, timeStamp: new Date() }, { merge: true }).then(
        (value) => {
          this.loadingpanelService.hideLoadingPanel();
          this.surprise();
          this.createSnow();
        }
      );
    }, 2000);
  }
}
