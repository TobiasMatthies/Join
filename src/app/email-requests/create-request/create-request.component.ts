import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonPrimaryComponent } from '../../customComponents/button-primary/button-primary.component';
import { HeaderComponent } from '../../headers/header/header.component';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-create-request',
  imports: [HeaderComponent, RouterModule, ButtonPrimaryComponent],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css',
})
export class CreateRequestComponent implements OnInit {
  daykey = {};
  dailyQuota = 0;

  constructor(private dataStorage: DataStorageService) {}

  async ngOnInit(): Promise<void> {
    this.createDayKey();
    let endpoint = 'quotas/' + this.daykey['dayKey'] + '.json';

    this.dailyQuota = await this.dataStorage.getItem(endpoint);
  }

  createDayKey() {
    const now = new Date();
    const dayKey = now.toISOString().slice(0, 10);
    const SYSTEM_LIMIT = 10;
    this.daykey = { dayKey, SYSTEM_LIMIT };
  }
}
