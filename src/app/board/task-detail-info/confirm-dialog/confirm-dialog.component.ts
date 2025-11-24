import { Component } from '@angular/core';
import { ConfirmService } from '../confirm.service';
import { ButtonPrimaryComponent } from '../../../customComponents/button-primary/button-primary.component';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css'],
    standalone: true,
    imports: [ButtonPrimaryComponent]
})
export class ConfirmDialogComponent {
  constructor(public confirmService: ConfirmService) {}
}
