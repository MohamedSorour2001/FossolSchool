import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    region: string = '';
    stages: { id: string; name: string; selected: boolean }[] = [
      { id: 'high-school', name: 'المرحلة الثانوية', selected: false },
      { id: 'middle-school', name: 'المرحلة المتوسطة', selected: false },
      { id: 'elementary-school', name: 'المرحلة الابتدائية', selected: false },
    ];

    onRegionChange(event: any): void {
      this.region = event.target.value;
    }

    toggleStage(stageId: string): void {
      const stage = this.stages.find(stage => stage.id === stageId);
      if (stage) stage.selected = !stage.selected;
    }
  }

