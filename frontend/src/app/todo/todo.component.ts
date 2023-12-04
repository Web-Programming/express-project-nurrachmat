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
    this.refreshData();
  }

  //insert data
  addTodo(){
    this.dataService.saveTodo(this.textTodo)
    .subscribe((response) => { 
        console.log(response);
        this.refreshData();
       });
  }

  //delete data
  deleteTodo(id: String){
    this.dataService.deleteTodo(id)
    .subscribe((response) => { 
        this.refreshData();
      });
  }

  refreshData(){
    this.dataService.getListTodo()
    .subscribe((response) => { this.todos = response; });
  }
  
}
