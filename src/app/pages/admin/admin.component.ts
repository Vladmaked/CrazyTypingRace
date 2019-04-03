import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  createNewTextForm: FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.createNewTextForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      category: new FormControl(),
      theme: new FormControl(),
      body: new FormControl()
    });
  }

  ngOnInit() {
  }

  onSubmit(  ) {
    console.log(this.createNewTextForm.value);
  }
}
