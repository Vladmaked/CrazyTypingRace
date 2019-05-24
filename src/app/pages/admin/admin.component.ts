import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HtmlService} from '../../html.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  categoryAdditionForm: FormGroup;
  themeAdditionForm: FormGroup;
  textAdditionForm: FormGroup;

  constructor( private fb: FormBuilder, private htmlService: HtmlService) {}

  ngOnInit() {
    this.textAdditionForm = this.fb.group({
      category: null,
      theme: null,
      body: null
    });

    this.categoryAdditionForm = this.fb.group({
      category: null
    });

    this.themeAdditionForm = this.fb.group({
      category: null,
      theme: null
    });
  }


  onSubmitCategory() {
    this.htmlService.postCategory(this.categoryAdditionForm.value);
  }

  onSubmitTheme() {
    this.htmlService.postTheme(this.themeAdditionForm.value);
  }

  onSubmitText() {
    console.log(this.textAdditionForm.value);
    this.htmlService.postText(this.textAdditionForm.value);
  }
}
