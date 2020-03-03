import { Component, OnInit } from '@angular/core';
// https://clarity.design/documentation/forms
// https://clarity.design/documentation/input

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  resetForm() {
    console.log("reset form");
  }

  submit() {
    alert("submit form");
  }

}
