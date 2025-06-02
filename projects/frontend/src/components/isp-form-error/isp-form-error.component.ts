import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'isp-form-error',
    templateUrl: './isp-form-error.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./isp-form-error.component.scss'],
})
export class IspFormErrorComponent implements OnInit {
    @Input() form!: FormGroup;
    @Input() controlName!: string;
    @Input() title!: string;

    constructor() {}

    ngOnInit(): void {}
}
