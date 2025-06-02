import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'isp-label',
    templateUrl: './isp-label.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./isp-label.component.scss'],
})
export class IspLabelComponent implements OnInit {
    @Input() label!: string;
    @Input() for!: string;
    @Input() asALink: boolean = false;
    @Input() url!: string;

    constructor() {}

    ngOnInit(): void {}
}
