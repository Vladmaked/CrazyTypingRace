import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  createNewTextForm: FormGroup;
  constructor() { }

  createNewGetForm() {
    return new FormGroup({
      category: new FormControl(),
      theme: new FormControl()
    });
  }
  ngOnInit() {
  }

  onClick() {
  	document.getElementById('form').style.display = 'flex';
  }

  onSubmit() {
    console.log(this.createNewTextForm.value);
  }
}
