import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../common/material.module';
import { IspFormErrorComponent } from '../isp-form-error/isp-form-error.component';

@Component({
    selector: 'isp-expander',
    templateUrl: './isp-expander.component.html',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./isp-expander.component.scss'],
})
export class IspExpanderComponent implements OnInit {
    @Input() data!: string[];
    @Output() isExpaned: EventEmitter<boolean> = new EventEmitter<boolean>();
    expanded: boolean = false;

    constructor() {}

    ngOnInit(): void {
        // console.log('IspExpanderComponent [this.data]', this.data);
    }

    setExpanderState(): void {
        this.expanded = !this.expanded;
        this.isExpaned.emit(this.expanded);
    }
}
