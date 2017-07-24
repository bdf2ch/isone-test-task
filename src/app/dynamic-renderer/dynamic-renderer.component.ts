import { Component, Input } from '@angular/core';


@Component({
    templateUrl: './dynamic-renderer.component.html'
})
export class DynamicRendererComponent {
    @Input() url: string;
};
