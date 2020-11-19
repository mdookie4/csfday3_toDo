import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateCheckValidator } from '../directives/dateCheck.directive';

@Component({
  selector: 'app-taskmgr',
  templateUrl: './taskmgr.component.html',
  styleUrls: ['./taskmgr.component.css']
})
export class TaskmgrComponent implements OnInit {

  taskForm : FormGroup;
  taskArray: FormArray;


  constructor(private fb: FormBuilder) { };

  ngOnInit(): void {
    this.taskArray = this.fb.array([])
    this.taskForm = this.fb.group ({
      taskList: this.taskArray,
      taskDescription: this.fb.control(''),
      priority: this.fb.control(''),
      dueDate: this.fb.control('', [Validators.required, dateCheckValidator])
    })
  }

  addTask() {
    console.log(this.taskForm);
    const taskGroup = this.fb.group({
      taskDescription: this.taskForm.value.taskDescription,
      priority: this.taskForm.value.priority,
      dueDate: this.taskForm.value.dueDate.toString()
    })
    this.taskArray.push(taskGroup);
    console.log(this.taskArray.value);
  }

  get diagnostic() {
    return JSON.stringify(this.taskForm.value);
  }

}
