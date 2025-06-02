import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../common/material.module';
import { TabsDefinition } from '../../core/models/tabs.model';

@Component({
    selector: 'isp-tab',
    templateUrl: './isp-tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
          CommonModule,
          ReactiveFormsModule,
          MaterialModule
    ],
    styleUrls: ['./isp-tab.component.scss'],
})
export class IspTabComponent implements OnInit {
    @Input() tabsDefinition: TabsDefinition[] = [];
    selected = new FormControl(0);

    constructor() {}

    ngOnInit(): void {}

    onTabChange(event: MatTabChangeEvent) {}
}
