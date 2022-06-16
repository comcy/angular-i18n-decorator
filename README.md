# angular-ivy-cqyegq

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-cqyegq)

## Documentation

Getting translation texts.
In general there are two possibilities:

1. Using **`i18n`-decorator** and **`i18n`-parameters**
2. Simple method and and **`i18n`-parameters**

```ts

...

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  @i18n('key.to.text.in.file', 'fallback text value', 'optional placeholder')
  name!: string;

  descriptionLabel!: string;

  constructor() { ... }



  ...
}
```

Or you can change values without using any **`i18n`-decorator**

```ts
  setI18n() {
    this.descriptionLabel = getI18nText(
      'page.pageForm.weightLabel',
      'Gewicht: [placeholder] kg',
      100
    );
  }
```
