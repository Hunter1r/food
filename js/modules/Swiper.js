class Swiper {
    constructor(slidesLine, clickArea, width, curr){
        this.container = slidesLine;
        this.clickArea = clickArea;
        this.startPosition = 0;
        this.slideIndex = 0;
        this.scrollValue = +width.slice(0,width.length-2);
        this.count = slidesLine.children.length;
        this.slides = slidesLine.children;
        this.offset = 0;
        this.moving = this.moving.bind(this);
        this.endMoving = this.endMoving.bind(this);
        this.arrIndicators = [];
        this.direction = "";
        this.curr = curr;
    }
    initHandler(){
        this.clickArea.addEventListener('mousedown', (e)=>{
            if (e.target.matches('.left')) {
                this.direction = "right";
            } else {
                this.direction = "left";
            }
            this.startPosition = e.clientX;
            document.body.addEventListener('mousemove',this.moving);
            document.body.addEventListener('mouseup',this.endMoving);
        });
    }
    changeStateIndicators(slides, curr, arrIndicators){
        if (slides.length < 10) {
            curr.textContent = `0${this.slideIndex + 1}`;
        } else {
            curr.textContent = `${this.slideIndex + 1}`;
        }
        arrIndicators.forEach(item => item.style.opacity = '.5');
        arrIndicators[this.slideIndex].style.opacity = 1;
    }
    moving(e){
        e.preventDefault();
        let nextPosition = e.clientX;
        let shift = this.startPosition - nextPosition + this.offset;
        this.container.style.transform = `translateX(${-shift}px)`;
    }
    endMoving(e){
        document.body.removeEventListener('mousemove',this.moving);
        document.body.removeEventListener('mouseup',this.endMoving);
        this.container.classList.add('animate');
        let endPosition = e.clientX;
        let moveDirection = this.startPosition > endPosition ? "left" : "right";
        if (this.startPosition == endPosition) {
            moveDirection = this.direction;
        }
        let newCoordinate = 0;

        if (moveDirection === "left") {
            newCoordinate = this.offset + this.scrollValue;
            if (this.slideIndex == this.count - 1) {
                this.slideIndex = 0;
            } else {
                this.slideIndex++;
            }
            this.changeStateIndicators(this.slides, this.curr, this.arrIndicators);
          } else {
            newCoordinate = this.offset - this.scrollValue;
            if (this.slideIndex == 0) {
                this.slideIndex = this.count - 1;
            } else {
                this.slideIndex--;
            }
            this.changeStateIndicators(this.slides, this.curr, this.arrIndicators);
            
          }
          if (
            newCoordinate >= 0 &&
            newCoordinate < this.count * this.scrollValue
          ) {
            this.offset = newCoordinate;

          }else if (newCoordinate >= this.count * this.scrollValue) {
              this.offset = 0;
          }else if (newCoordinate < 0){
            this.offset = (this.count * this.scrollValue) - this.scrollValue;
          }
          
        this.container.style.transform = `translateX(${-this.offset}px)`;
          this.animationTimeoutID = setTimeout(() => {
            this.container.classList.remove("animate");
          }, 300);

    }
}

export default Swiper;