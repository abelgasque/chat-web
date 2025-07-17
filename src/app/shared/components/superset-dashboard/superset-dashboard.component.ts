import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { embedDashboard } from '@superset-ui/embedded-sdk';

@Component({
  selector: 'app-superset-dashboard',
  templateUrl: './superset-dashboard.component.html',
})
export class SupersetDashboardComponent implements OnInit {
  @ViewChild('supersetContainer', { static: true }) mountPoint!: ElementRef;

  @Input() id!: string;
  @Input() url!: string;
  @Input() token!: string;

  constructor() { }

  ngOnInit(): void {
    this.embedSupersetDashboard();
  }

  private async embedSupersetDashboard(): Promise<void> {
    try {
      const mountEl = this.mountPoint.nativeElement;

      await embedDashboard({
        id: this.id,
        supersetDomain: this.url,
        mountPoint: mountEl,
        fetchGuestToken: async () => {
          return this.token;
        },
        dashboardUiConfig: {
          hideTitle: true,
          filters: {
            expanded: true
          },
          urlParams: { }
        },
        iframeSandboxExtras: ['allow-top-navigation', 'allow-popups-to-escape-sandbox'],
        referrerPolicy: 'same-origin',
      });
    } catch (err) {
      console.error('Erro ao buscar token ou embutir dashboard:', err);
    }
  }
}