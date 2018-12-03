import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  host: {
    "[class.app-navbar]": "true",
    role: "navbar"
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
