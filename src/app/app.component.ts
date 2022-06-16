import { Component, VERSION } from '@angular/core';

const i18nValues = {
  app: 'Angular [placeholder]',
  first: 'First!!!',
  second: 'Second!!!',
  project: {
    header: {
      form: {
        name: 'Name',
        description: 'Beschreibung',
      },
    },
  },
  page: {
    title: 'Herzlich Willkommen zu meiner Seite, yeah!!!',
    pageForm: {
      nameLabel: 'Name',
      weightLabel: 'Gewicht: [placeholder] kg (geschätzt)',
    },
  },
};

const i18nValuesEn = {
  app: 'Angular [placeholder]',
  appo: 'Angular appo [placeholder] appo',
  first: 'First!!!',
  second: 'Second!!!',
  project: {
    header: {
      form: {
        name: 'NameEn',
        description: 'BeschreibungEn',
      },
    },
  },
  page: {
    title: 'Herzlich Willkommen zu meiner Seite, yeah!!!En',
    pageForm: {
      nameLabel: 'NameEn',
      weightLabel: 'Gewicht: [placeholder] in kgEn',
    },
  },
};

const get = (obj, ...selectors) =>
  [...selectors].map((s) =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter((t) => t !== '')
      .reduce((prev, cur) => prev && prev[cur], obj)
  );

// DECORATOR
function i18n(
  key: string = '',
  devValue: string = '',
  placeholderValue?: string | number
) {
  return function (target: any, propertyKey: string) {
    let modifiedMessage: string = '';

    const getter = function () {
      return modifiedMessage;
    };

    const setter = function () {
      const keysa = Object.keys(i18nValues);
      console.log('KEYS ', keysa);

      // modifiedMessage = i18nValues[key] ?? devValue;
      getObjectKeys(i18nValues, key);
      const translationText = get(i18nValues, key)[0];

      if (typeof translationText === 'string') {
        modifiedMessage = translationText;
      } else {
        modifiedMessage = devValue;
      }

      if (placeholderValue) {
        modifiedMessage = placeholderReplacement(
          modifiedMessage,
          placeholderValue
        );
      }

      console.log('MODIFIED MSG ', modifiedMessage);
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}

const getI18nText = (
  key: string = '',
  devValue: string = '',
  placeholderValue?: string | number
): string => {
  let modifiedMessage: string = '';
  const keysa = Object.keys(i18nValues);
  console.log('KEYS ', keysa);

  // modifiedMessage = i18nValues[key] ?? devValue;
  getObjectKeys(i18nValues, key);
  const translationText = get(i18nValues, key)[0];

  if (typeof translationText === 'string') {
    modifiedMessage = translationText;
  } else {
    modifiedMessage = devValue;
  }

  if (placeholderValue) {
    modifiedMessage = placeholderReplacement(modifiedMessage, placeholderValue);
  }

  return modifiedMessage;
};

const objectKeys = [];
function getObjectKeys(obj, previousPath = '') {
  // Step 1- Go through all the keys of the object
  Object.keys(obj).forEach((key) => {
    // Get the current path and concat the previous path if necessary
    const currentPath = previousPath ? `${previousPath}.${key}` : key;
    // Step 2- If the value is a string, then add it to the keys array
    if (typeof obj[key] !== 'object') {
      objectKeys.push(currentPath);
    } else {
      objectKeys.push(currentPath);
      // Step 3- If the value is an object, then recursively call the function
      getObjectKeys(obj[key], currentPath);
    }
  });
}

const placeholderReplacement = (
  text: string,
  value: string | number
): string => {
  var re = `[placeholder]`;
  var newstr = text.replace(re, value.toString());
  console.log('>>> ', newstr);
  return newstr;
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @i18n('app', 'Framework name', VERSION.major)
  name: string = ''; // 'Angular ' + VERSION.major;

  @i18n('page.title', 'welcome to this page')
  pageTitle: string = '';

  @i18n('page.pageForm.nameLabel', 'name')
  nameLabel!: string;

  // @i18n('page.pageForm.weightLabel', 'description keep [placeholder:kg] kg', '')
  weightLabel!: string;

  ngOnInit() {
    this.setI18n();
  }

  setI18n() {
    // Change nameLabel
    this.weightLabel = getI18nText(
      'page.pageForm.weightLabel',
      'Gewicht: [placeholder] kg',
      100
    );
  }
}
