import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {HtmlService} from '../../html.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  gameSettingsForm: FormGroup;
  isRenderedStart = true;
  isRenderedSet = false;
  isRenderedTimer = true;
  isConnected = false;
  dataParsed: any;
  idInterval: any;
  socketClientID: any;
  obj: any;
  timer: any;
  startTimerTitle = 'Waiting for an opponent...';

  private socket$: any;

  constructor(private htmlService: HtmlService, private fb: FormBuilder, private router: Router) {

  }
  ngOnInit() {
    this.gameSettingsForm = this.fb.group({
      category: null,
      theme: null
    });
  }

  onClickStart() {
    this.isRenderedStart = false;
    this.isRenderedSet = true;
    this.htmlService.getCategory();
  }

  onCategorySelect(selectedCategoryValue) {
    this.htmlService.categoryOnService = selectedCategoryValue;
    this.htmlService.getTheme(selectedCategoryValue);
  }

  onThemeSelect(selectedThemeValue, selectedThemeId) {
    this.htmlService.themeOnService = selectedThemeValue;
    this.htmlService.IDtheme = selectedThemeId;
    this.htmlService.getText(this.gameSettingsForm.value.category, selectedThemeValue);
  }

  waiting() {
    this.timer = 30;
    this.idInterval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.idInterval);
        this.router.navigate(['game']);
      }
    }, 1000);
  }

  createSocket() {
    this.socket$ = new WebSocket('wss://crazy-typing-race-backend.herokuapp.com:443');
    this.htmlService.socketOnService = this.socket$;
    this.socket$.onmessage = ({data}) => {
      try {
        this.dataParsed = JSON.parse(data);
        this.htmlService.dataParsedOnService = this.dataParsed;
      } catch (err) {
        console.error(err);
      }
      if (this.socketClientID === undefined) {
        this.socketClientID = this.dataParsed.ID;
        this.obj = {connect: true,  IDtheme: this.htmlService.IDtheme, ID: this.socketClientID};
        this.socket$.send(JSON.stringify(this.obj, null, 1, ));
        this.htmlService.myIDOnService = this.socketClientID;
      }
      this.waitGame();
    };
  }

  waitGame() {
    if (this.dataParsed.wait) {
      this.isConnected = true;
      this.waiting();
    }

    if (this.dataParsed.text) {
      this.htmlService.textOnService = this.dataParsed.text;
    }

    if (this.dataParsed.connected) {
      if (this.idInterval && this.dataParsed.timeout === 1) {
        this.socket$.send(JSON.stringify({text: this.htmlService.textOnService, game: true, ID: this.socketClientID}));
      }

      if (this.dataParsed.timeout === 10) {
        this.htmlService.isOnline = true;
        clearInterval(this.idInterval);
        this.startTimerTitle = 'Start in:';
        this.isConnected = true;
      }

      this.timer = this.dataParsed.timeout;

      if (this.timer === 0) {
        this.router.navigate(['game']);
        this.idInterval = undefined;
      }
    }
  }

  onClickStartSinglePlayerGame() {
    clearInterval(this.idInterval);
    this.htmlService.isOnline = false;
    this.socket$.send(JSON.stringify({IDtheme: this.htmlService.IDtheme, disconnect: true}));
    this.router.navigate(['game']);
    this.idInterval = undefined;
  }

  onClickStartToPlay() {
    this.htmlService.textOnService = this.htmlService.text.body;
    this.isRenderedSet = false;
    this.isRenderedStart = false;
    this.createSocket();
  }
}
