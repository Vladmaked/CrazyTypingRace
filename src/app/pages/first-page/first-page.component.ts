import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {HtmlService} from '../../html.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  gameSettingsForm: FormGroup;
  isRendered = false;

  constructor(private htmlService: HtmlService, private fb: FormBuilder) {

  }
  ngOnInit() {
    this.gameSettingsForm = this.fb.group({
      category: null,
      theme: null
    });
  }

  onClickStart() {
    this.isRendered = true;
    this.htmlService.getCategory();
  }

  onCategorySelect(selectedCategoryValue) {
    this.htmlService.categoryOnService = selectedCategoryValue;
    this.htmlService.getTheme(selectedCategoryValue);
  }

  onThemeSelect(selectedThemeValue) {
    this.htmlService.themeOnService = selectedThemeValue;
    this.htmlService.getText(this.gameSettingsForm.value.category, selectedThemeValue);
  }
  onClickStartToPlay() {
    this.htmlService.textOnService = this.htmlService.text.body;
  }
}
