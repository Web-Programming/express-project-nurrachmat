import { Component } from '@angular/core';
import { DataService } from '../data.service';

//buat class model
export class Todo {
  '_id': string;
  'text': string;
  'tanggal': Date;
  'status': number; 
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  //todos = ['Mancing', 'Ngoding', 'Sleeping'];
  todos : any;
  constructor(private dataService: DataService) { }
  textTodo = "";
  ngOnInit() {
    this.dataService.getListTodo().subscribe(
    (response) => { this.todos = response; },
    (error) => { console.log(error); });
  }

  addTodo(){
    this.dataService.saveTodo(this.textTodo).subscribe(
      (response) => { 
        this.refreshData();
       },
      (error) => { console.log(error); });
  }

  refreshData(){
    this.dataService.getListTodo().subscribe(
    (response) => { this.todos = response; },
    (error) => { console.log(error); });
  }
  
}
