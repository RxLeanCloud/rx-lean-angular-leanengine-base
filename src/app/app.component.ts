import { Component, OnInit } from '@angular/core';
import { RxAVObject, RxAVQuery, RxAVLiveQuery } from 'rx-lean-js-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  doing: Array<RxAVObject> = [];
  done: Array<RxAVObject> = [];
  ngOnInit(): void {

    let doingQuery = new RxAVQuery('TodoLiveQuery');
    doingQuery.equalTo('tag', 'LiveQuery_demo');
    doingQuery.equalTo('state', 'doing');

    doingQuery.find().subscribe(data => {
      data.forEach(todo => {
        this.doing.push(todo);
      });
    });

    let doneQuery = new RxAVQuery('TodoLiveQuery');
    doneQuery.equalTo('tag', 'LiveQuery_demo');
    doneQuery.equalTo('state', 'done');

    doneQuery.find().subscribe(data => {
      data.forEach(todo => {
        this.done.push(todo);
      });
    });

    let doingSubscription = doingQuery.subscribe();
    let doneSubscription = doneQuery.subscribe();

    doingSubscription.flatMap(subs => {
      subs.on.subscribe(pushData => {
        if (pushData.scope == 'create' || pushData.scope == 'enter') {
          this.doing.push(pushData.object);
        } else if (pushData.scope == 'leave' || pushData.scope == 'delete') {
          this.unassign(this.doing, pushData.object, 'doing');
        }
      });
      return doneSubscription;
    }).subscribe(subs => {
      subs.on.subscribe(pushData => {
        if (pushData.scope == 'create' || pushData.scope == 'enter') {
          this.done.push(pushData.object);
        } else if (pushData.scope == 'leave' || pushData.scope == 'delete') {
          this.unassign(this.done, pushData.object, 'doing');
        }
      });
    });
  }

  checked(todo: RxAVObject) {
    todo.set('state', 'done');
    todo.save().subscribe(success => {

    });
  }
  unchecked(todo: RxAVObject) {
    todo.set('state', 'doing');
    todo.save().subscribe(success => {

    });
  }

  private unassign(todos: Array<RxAVObject>, todo: RxAVObject, state: string) {
    let tempTodo = todos.find(item => item.objectId == todo.objectId);
    if (tempTodo) {
      let index = todos.indexOf(tempTodo);
      if (index > -1) {
        todos.splice(index, 1);
      }
    }
  }
  title = '';

  add() {
    let todo = new RxAVObject('TodoLiveQuery');
    todo.set('tag', 'LiveQuery_demo');
    todo.set('title', this.title);
    todo.set('state', 'doing');
    todo.save().subscribe(saved => {

      console.log('saved', saved);
      this.title = '';
    });
  }
}