import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "usertitlecase" })
export class TitleCasePipe implements PipeTransform {
    public transform(input: string): string {
        if (!input) {
            return "";
        } else {
            return input
                .replace(/\w\S*/g, txt => txt[0].toUpperCase() + txt.substr(1))
                .replace(/_/g, " ");
        }
    }
}
