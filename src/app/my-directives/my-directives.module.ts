import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable/draggable.directive';
import { MoveableDirective } from './moveable/moveable.directive';

@NgModule({
  declarations: [DraggableDirective, MoveableDirective],
  imports: [
    CommonModule
  ],
  exports: [DraggableDirective, MoveableDirective]
})
export class MyDirectivesModule { }
