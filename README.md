# ngx-stars

Simple stars rating component for Angular >= 2

[Demo can be found here](https://hughjdavey.github.io/hughjdavey.github.io/ngx-stars)

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
