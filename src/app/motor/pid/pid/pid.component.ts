import { MotorCommService } from '../../service/motor.comm.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PidValue } from '../../service/model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PidType } from '../../service/model';

@Component({
    selector: 'ngx-pid',
    styleUrls: ['./pid.component.scss'],
    templateUrl: './pid.component.html',
})
export class PidComponent {
    PidType: typeof PidType = PidType;
    @Input() type: PidType;

    pidFromGroup: FormGroup;

    constructor(private commService: MotorCommService) {
        const fb = new FormBuilder();
        this.pidFromGroup = fb.group<PidValue>({
            p: null,
            i: null,
            d: null,
        });
    };

    save(): void {
        this.commService.setPid(this.type, this.pidFromGroup.value);
    };

    load(): void {
        this.commService.getPid(this.type)
            .then((pid) => { this.pidFromGroup.setValue(pid); });
    }
}
