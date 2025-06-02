import { delay } from 'rxjs/operators';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../common/material.module';

@Component({
    selector: 'app-isp-button',
    templateUrl: './isp-button.component.html',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./isp-button.component.scss'],
})
export class IspButtonComponent implements OnInit {
    @Input() label!: string;
    @Input() icon!: string;
    @Input() toolTip!: string;
    @Input() cssClass: string = 'icon-display';
    @Input() disabled: boolean = true;
    @Input() isButtonIcon: boolean = false;
    @Input() includesIcon: boolean = false;
    @Input() backgroundColor: string = 'bosch-violet';
    @Output() onButtonClick: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    onClick(): void {
        of([])
            .pipe(delay(400))
            .subscribe(res => {
                this.onButtonClick.emit(true);
            });
    }
}
