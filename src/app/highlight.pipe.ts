import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, tags: string[] | undefined): string {
    if (!tags || !value) {
      return value;
    }
    for (const tag of tags) {
      value = value.replace(tag, `<mark>${tag}</mark>`);
    }
    return value;
  }

}
