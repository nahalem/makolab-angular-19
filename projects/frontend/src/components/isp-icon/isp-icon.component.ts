import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { Size } from './sizes.enum';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MaterialModule } from '../../common/material.module';

@Component({
    selector: 'isp-icon',
    templateUrl: './isp-icon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
      CommonModule,
      MaterialModule,
      RouterOutlet,
      RouterModule,
      ReactiveFormsModule
    ],
    styleUrls: ['./isp-icon.component.scss'],
})
export class IspIconComponent implements OnInit {
    @Input() iconName!: string;
    @Input() toolTip!: string;
    @Input() color: string = 'rgb(0,98,73)';
    @Input() disabled: boolean = false;
    @Input() isSvgIcon: boolean = false;
    @Input() url!: string;
    @Input() newWindow: boolean = true;
    @Input() size: Size = Size.MEDIUM;
    @Output() onIconClick: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {}

    onClick(): void {
        this.onIconClick.emit(true);
    }
}
