import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-stars',
  templateUrl: './ngx-stars.component.html',
  styleUrls: [ './ngx-stars.component.css' ],
})
export class NgxStarsComponent implements OnInit {

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

  @Output()
  ratingOutput: EventEmitter<number> = new EventEmitter();

  rating: number;
  editableStars: EditableStar[];
  animationInterval: any;
  animationRunning: boolean;

  ngOnInit(): void {
    this.editableStars = Array.from(new Array(this.maxStars)).map((elem, index) => new EditableStar(index));
    this.setRating(this.initialStars);

    if (this.animation) {
      this.animationInterval = setInterval(this.starAnimation.bind(this), this.animationSpeed);
    }
  }

  starColorAndPadding(): Object {
    return Object.assign({}, this.starColor(), this.starPadding());
  }

  private starColor(): Object {
    return { color: this.color || 'crimson' };
  }

  private starPadding(): Object {
    let padding = '0.5rem';
    if (Number.isInteger(this.size) || this.size > 0 || this.size < 6) {
      padding = `0.${this.size}rem`;
    }

    return { 'margin-right': this.customPadding || padding };
  }

  starSize(): string {
    if (!Number.isInteger(this.size) || this.size < 2 || this.size > 5) {
      return '';
    }
    return `fa-${this.size}x`;
  }

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
    clickedStar.classname = (!this.wholeStars && clickedInFirstHalf) ? 'fa-star-half-o' : 'fa-star';

    // fill in all stars in previous positions and clear all in later ones
    this.editableStars.forEach(star => {
      if (star.position > clickedStar.position) {
        star.classname = 'fa-star-o';
      }
      else if (star.position < clickedStar.position) {
        star.classname = 'fa-star';
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
    this.editableStars.forEach(star => star.classname = 'fa-star-o');
  }

  onStarsUnhover() {
    // when user stops hovering we want to make stars reflect the last rating applied by clicking
    this.editableStars.forEach(star => {
      const starNumber = star.position + 1;
      if (this.rating >= starNumber) {
        star.classname = 'fa-star';
      }
      else if (this.rating > starNumber - 1 && this.rating < starNumber) {
        star.classname = 'fa-star-half-o';
      }
      else {
        star.classname = 'fa-star-o';
      }
    });
  }

  private clickedInFirstHalf(event: MouseEvent): boolean {
    const starIcon = event.target as HTMLElement;
    return event.pageX < starIcon.getBoundingClientRect().left + starIcon.offsetWidth / 2;
  }

  noop(): void {}
}

export class EditableStar {
  position: number;
  classname: string;

  constructor(position: number) {
    this.position = position;
    this.classname = 'fa-star-o';
  }
}
