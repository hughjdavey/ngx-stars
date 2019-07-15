# ngx-stars

Simple stars rating component for Angular >= 2

[Demo can be found here](https://hughjdavey.github.io/ngx-stars)

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

##### `@Input()` options:

* `maxStars` [integer] - number of stars (defaults to 5)
* `initialStars` [float] - number of prefilled stars (defaults to 0)
* `readonly` [boolean] - whether to allow editing the number of filled stars (defaults to false)
* `size` [integer 1-5] - relative size of stars (defaults to 1)
* `color` [string] - hexcode or colorname for star color (defaults to 'crimson')
* `animation` [boolean] - whether to animate the stars until first user interaction (defaults to false)
* `animationSpeed` [integer] - speed of animation in ms (defaults to 100)
* `customPadding` [string] - custom `padding-right` between stars, e.g. '10px' (defaults to `0.$size`rem e.g. 0.2rem with size=2)
* `wholeStars` [boolean] - if this is true only whole star numbers are able to be selected (defaults to false)
* `customStarIcons` [object of form `{ empty: string, half: string, full: string }`] - [CSS URLs](https://developer.mozilla.org/en-US/docs/Web/CSS/url) to alternative image files to use instead of the default stars
  
###### How to use `customStarIcons`

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

##### `@Output()` options:

* `ratingOutput` - provides the current rating as a float every time user changes it

### Examples

##### readonly, 5 stars, none filled
* `<ngx-stars [readonly]="true"></ngx-stars>`

##### readonly, 10 stars, none filled
* `<ngx-stars [readonly]="true" [maxStars]="10"></ngx-stars>`

##### readonly, 10 stars, 7.5 filled
* `<ngx-stars [readonly]="true" [maxStars]="10" [initialStars]="7.5"></ngx-stars>`

##### readonly, custom size, custom color
* `<ngx-stars [readonly]="true" [color]="'dodgerblue'" [size]="2"></ngx-stars>`
* `<ngx-stars [readonly]="true" [color]="'#FF0000'" [size]="5"></ngx-stars>`

##### editable, 5 stars, none filled
* `<ngx-stars></ngx-stars>`

##### editable, output function
* `<ngx-stars (ratingOutput)="onRatingSet($event)"></ngx-stars>`

##### editable, animation, 100 animation speed
* `<ngx-stars [animation]="true"></ngx-stars>`

##### editable, animation, custom animation speed
* `<ngx-stars [animation]="true" [animationSpeed]="200"></ngx-stars>`
