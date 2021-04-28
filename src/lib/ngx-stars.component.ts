import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-stars',
  templateUrl: './ngx-stars.component.html',
  styleUrls: [ './ngx-stars.component.css' ],
})
export class NgxStarsComponent implements OnInit, OnDestroy {

  @Input()
  maxStars: number = 5;

  @Input()
  initialStars: number = 0;

  @Input()
  readonly: boolean;

  @Input()
  size: number;

  @Input()
  color: string;

  @Input()
  animation: boolean;

  @Input()
  animationSpeed: number = 100;

  @Input()
  customPadding: string;

  @Input()
  wholeStars: boolean = false;

  @Input()
  customStarIcons: { empty: string, half: string, full: string };

  @Output()
  ratingOutput: EventEmitter<number> = new EventEmitter();

  rating: number;
  editableStars: EditableStar[];
  animationInterval: any;
  animationRunning: boolean;

  private customCssClasses: HTMLStyleElement[];
  private customClassIdentifier = Math.random().toString(36).substring(2);

  ngOnInit(): void {
    this.setupStarImages();
    this.editableStars = Array.from(new Array(this.maxStars)).map((elem, index) => new EditableStar(index));
    this.setRating(this.initialStars);

    if (this.animation) {
      this.animationInterval = setInterval(this.starAnimation.bind(this), this.animationSpeed);
    }
  }

  ngOnDestroy(): void {
    // remove the three custom classes we created if custom image urls were provided
    if (this.customCssClasses) {
      this.customCssClasses.forEach(style => {
        if (style && style.parentNode) {
          style.parentNode.removeChild(style);
        }
      });
    }
  }

  private setupStarImages() {
    if (this.customStarIcons) {
      this.customCssClasses = [];
      Object.keys(this.customStarIcons).map(key => key as StarType).forEach(starType => {
        const classname = this.getStarClass(starType);
        this.createCssClass(classname, starType);
      });
    }
  }

  private createCssClass(classname: string, starType: StarType) {
    const clazz = document.createElement('style');
    clazz.type = 'text/css';
    clazz.innerHTML = `.${classname} {
      -webkit-mask-image: url(${this.customStarIcons[starType]});
      mask-image: url(${this.customStarIcons[starType]});
    }`;
    document.getElementsByTagName('head')[0].appendChild(clazz);
    this.customCssClasses.push(clazz);
  }

  starPadding(): { [p: string]: string } {
    return { 'margin-right': this.customPadding || `0.${this.safeSize()}rem` };
  }

  starColorAndSize(): { [p: string]: string } {
    return Object.assign({}, this.starColor(), this.starSize());
  }

  private starColor(): { [p: string]: string } {
    return { 'background-color': this.color || 'crimson' };
  }

  starSize(): { [p: string]: string } {
    return {
      height: `${15 * this.safeSize()}px`,
      width: `${16 * this.safeSize()}px`,
    };
  }

  private safeSize = () => (Number.isInteger(this.size) && this.size > 0 && this.size < 6) ? this.size : 1;

  starAnimation(): void {
    this.animationRunning = true;
    if (this.rating < this.maxStars) {
      this.setRating(this.rating += 0.5);
    }
    else {
      this.setRating(0);
    }
  }

  cancelStarAnimation(): void {
    if (this.animationRunning) {
      clearInterval(this.animationInterval);
      this.rating = 0;
      this.animationRunning = false;
    }
  }

  setRating(rating: number) {
    this.rating = Math.round(rating * 2) / 2;
    this.onStarsUnhover();
  }

  onStarHover(event: MouseEvent, clickedStar: EditableStar): void {
    this.cancelStarAnimation();

    const clickedInFirstHalf = this.clickedInFirstHalf(event);

    // fill in either a half or whole star depending on where user clicked
    clickedStar.classname = (!this.wholeStars && clickedInFirstHalf) ? this.getStarClass('half') : this.getStarClass('full');

    // fill in all stars in previous positions and clear all in later ones
    this.editableStars.forEach(star => {
      if (star.position > clickedStar.position) {
        star.classname = this.getStarClass('empty');
      }
      else if (star.position < clickedStar.position) {
        star.classname = this.getStarClass('full');
      }
    });
  }

  onStarClick(event: MouseEvent, clickedStar: EditableStar): void {
    this.cancelStarAnimation();

    // lock in current rating
    const clickedInFirstHalf = this.clickedInFirstHalf(event);
    this.rating = clickedStar.position + ((!this.wholeStars && clickedInFirstHalf) ? 0.5 : 1);
    this.ratingOutput.emit(this.rating);
  }

  // hidden star to left of first star lets user click there to set to 0
  onZeroStarClick(): void {
    this.setRating(0);
    this.ratingOutput.emit(this.rating);
  }

  onZeroStarHover(): void {
    // clear all stars
    this.editableStars.forEach(star => star.classname = this.getStarClass('empty'));
  }

  onStarsUnhover() {
    // when user stops hovering we want to make stars reflect the last rating applied by clicking
    this.editableStars.forEach(star => {
      const starNumber = star.position + 1;
      if (this.rating >= starNumber) {
        star.classname = this.getStarClass('full');
      }
      else if (this.rating > starNumber - 1 && this.rating < starNumber) {
        star.classname = this.getStarClass('half');
      }
      else {
        star.classname = this.getStarClass('empty');
      }
    });
  }

  private clickedInFirstHalf(event: MouseEvent): boolean {
    const starIcon = event.target as HTMLElement;
    return event.pageX < starIcon.getBoundingClientRect().left + starIcon.offsetWidth / 2;
  }

  noop(): void {}

  private getStarClass(starType: StarType) {
    if (this.customCssClasses) {
      return `ngx-stars-star-${starType}-${this.customClassIdentifier}`;
    }
    return `star-${starType}`;
  }

  // this and the aria-labels and role in the html inspired by https://stackoverflow.com/q/55966205
  getAriaLabel(): string {
    return `Rating: ${this.rating} out of ${this.maxStars} stars ${this.readonly ? '' : '. Can be edited.'}`;
  }
}

export type StarType = 'empty' | 'half' | 'full';

export class EditableStar {
  position: number;
  classname: string;

  constructor(position: number) {
    this.position = position;
  }
}
