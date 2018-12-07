import { NgModule } from "@angular/core";
import { BcIconComponent, UncheckIconDirective} from "./icon.component";

@NgModule({
  declarations: [BcIconComponent, UncheckIconDirective],
  exports: [BcIconComponent, UncheckIconDirective]
})
export class IconModule {}
