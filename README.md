# ngx-stars

Simple stars rating component for Angular >= 2

[Demo can be found here](https://hughjdavey.github.io/ngx-stars)

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  + [Inputs](#inputs)
  + [Changing star rating at runtime](#changing-star-rating-at-runtime)
  + [How to use custom icons](#how-to-use-custom-icons)
  + [Outputs](#outputs)
- [Examples](#examples)
  + [readonly, 5 stars, none filled](#readonly-5-stars-none-filled)
  + [readonly, 10 stars, none filled](#readonly-10-stars-none-filled)
  + [readonly, 10 stars, 7.5 filled](#readonly-10-stars-75-filled)
  + [readonly, custom size, custom color, custom padding](#readonly-custom-size-custom-color-custom-padding)
  + [readonly, custom icons](#readonly-custom-icons)
  + [editable, 5 stars, none filled](#editable-5-stars-none-filled)
  + [editable, output function](#editable-output-function)
  + [editable, animation, 100 animation speed](#editable-animation-100-animation-speed)
  + [editable, animation, custom animation speed](#editable-animation-custom-animation-speed)
  + [editable, whole stars only](#editable-whole-stars-only)
- [Using ngx-stars from source](#using-ngx-stars-from-source)
  + [Installing and running from source](#installing-and-running-from-source)
  + [Editing from source](#editing-from-source)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

### Installation

* `npm install --save ngx-stars`
* Edit your app.module file:

``` typescript
...
import { NgxStarsModule } from 'ngx-stars';

@NgModule({
  ...
  imports: [
    ...
    NgxStarsModule
  ],
  ...
})
```

### Usage

##### Inputs

* `maxStars` [integer] - number of stars (defaults to 5)
* `initialStars` [float] - number of prefilled stars (defaults to 0) _see next section for how to change rating at runtime_
* `readonly` [boolean] - whether to allow editing the number of filled stars (defaults to false)
* `size` [integer 1-5] - relative size of stars (defaults to 1)
* `color` [string] - hexcode or colorname for star color (defaults to 'crimson')
* `animation` [boolean] - whether to animate the stars until first user interaction (defaults to false)
* `animationSpeed` [integer] - speed of animation in ms (defaults to 100)
* `customPadding` [string] - custom `padding-right` between stars, e.g. '10px' (defaults to `0.$size`rem e.g. 0.2rem with size=2)
* `wholeStars` [boolean] - if this is true only whole star numbers are able to be selected (defaults to false)
* `customStarIcons` [object of form `{ empty: string, half: string, full: string }`] - [CSS URLs](https://developer.mozilla.org/en-US/docs/Web/CSS/url) to alternative image files to use instead of the default stars

##### Changing star rating at runtime

The component has a `setRating(rating: number)` method you can use to update the stars rating at runtime.
Simply get the component in your component using `@ViewChild`, then you can set and reset rating whenever you like:

```typescript
export class MyComponent {

  @ViewChild(NgxStarsComponent)
  starsComponent: NgxStarsComponent;

  ...

  // when you want to update the stars in code
  this.starsComponent.setRating(0);
}
```

##### How to use custom icons

If you want to use the default (Font Awesome 5) star icons, there's no need to use this param, but if you want to use other icons do the following:

* Find 3 SVG files that you want to use, one for 'empty', one for 'half' and one for 'full'
* Include the files in a part of your application that will be accessible when running, e.g. the `src/assets` folder
* Alternatively the images can be hosted elsewhere on the internet
* For each file you will need its CSS [url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url)
* Create an object that contains all 3 urls and adheres to the `{ empty: string, half: string, full: string }` format
* Pass the object into the `ngx-stars` instance. The example below assumes `src/assets` contains `heart-empty.svg`, `heart-half.svg` and `heart-full.svg`

```
// src/app/app.component.ts
heartIcons = {
    empty: '../assets/heart-empty.svg',
    half: '../assets/heart-half.svg',
    full: '../assets/heart-full.svg',
}

// src/app/app.component.html
<ngx-stars [readonly]="false" [size]="4" [initialStars]="2.5" [customStarIcons]="heartIcons"></ngx-stars>
```

##### Outputs

* `ratingOutput` - provides the current rating as a float every time user changes it

```html
<div style="display: flex; align-items: center;">
  <ngx-stars [readonly]="false" [size]="4" [maxStars]="5" (ratingOutput)="onRatingSet($event)"></ngx-stars>
  <span style="font-weight: bold; font-size: 20px">Rating is {{ ratingDisplay }} out of 5</span>
</div>
```

```typescript
export class MyComponent {

  ratingDisplay: number;
  
  onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
  }
}
```

### Examples

##### readonly, 5 stars, none filled
```html
<ngx-stars [readonly]="true"></ngx-stars>
```

##### readonly, 10 stars, none filled
```html
<ngx-stars [readonly]="true" [maxStars]="10"></ngx-stars>
```

##### readonly, 10 stars, 7.5 filled
```html
<ngx-stars [readonly]="true" [maxStars]="10" [initialStars]="7.5"></ngx-stars>
```

##### readonly, custom size, custom color, custom padding
```html
<ngx-stars [readonly]="true" [color]="'dodgerblue'" [size]="2"></ngx-stars>
<ngx-stars [readonly]="true" [color]="'#FF0000'" [size]="5"></ngx-stars>
<ngx-stars [readonly]="true" [customPadding]="'1rem'" [size]="2"></ngx-stars>
```

##### readonly, custom icons
```typescript
export class MyComponent {
  ...
  heartUrls = {
    empty: '../assets/heart-empty.svg',
    half: '../assets/heart-half.svg',
    full: '../assets/heart-full.svg',
  };
  ...
}
```
```html
<ngx-stars [readonly]="true" [customStarIcons]="heartUrls"></ngx-stars>
```

##### editable, 5 stars, none filled
```html
<ngx-stars></ngx-stars>
```

##### editable, output function
```typescript
export class MyComponent {
  ...
  onRatingSet(rating: number): void {
    console.warn(`User set rating to ${rating}`);
  }
  ...
}
```
```html
<ngx-stars (ratingOutput)="onRatingSet($event)"></ngx-stars>
```

##### editable, animation, 100 animation speed
```html
<ngx-stars [animation]="true"></ngx-stars>
```

##### editable, animation, custom animation speed
```html
<ngx-stars [animation]="true" [animationSpeed]="200"></ngx-stars>
```

##### editable, whole stars only
```html
<ngx-stars [wholeStars]="true"></ngx-stars>
```

### Using ngx-stars from source

If you wish to develop locally and make changes to `ngx-stars`, you will need to use it from source
rather than via `npm install`. Because the project is an Angular library it cannot run on its own and
it will need to be wrapped within a normal Angular project. You could [create a new one](https://angular.io/cli/new)
or use an existing one you have locally. Let us assume this 'wrapper' project is called `ngx-stars-testbed`.

##### Installing and running from source

* Make a directory `/projects` at the top level of your project (same level as `src`)
* Change to that `projects/` directory and add `ngx-stars` as a (git submodule)[https://git-scm.com/book/en/v2/Git-Tools-Submodules]
* Initialize and update the submodule
* (optional) Commit the changes to `ngx-stars-testbed`
```shell
mdkir -p /path/to/ngx-stars-testbed/projects
cd /path/to/ngx-stars-testbed/projects
git submodule add https://github.com/hughjdavey/ngx-stars.git ./ngx-stars
git submodule init
git submodule update
git add .
git commit -m 'Add ngx-stars as a submodule'
```
* Add `NgxStarsComponent` (not `NgxStarsModule`) to your app module
```typescript
...
import { NgxStarsComponent } from '../../projects/ngx-stars/src/lib/ngx-stars.component';

@NgModule({
  declarations: [
    AppComponent,
    NgxStarsComponent,
  ],
  ...
  export class AppModule { }
```

##### Editing from source

Now that you have added `ngx-stars` as a submodule and imported it in your app module,
you should be able to use it in your wrapper project as if you had installed it via `npm install`.
The difference now is that you will be able to edit the source code files under
`<YOUR-APP>/projects/ngx-stars`. You can treat that path as a separate git repository, making changes and committing
there instead of the wrapper project.
