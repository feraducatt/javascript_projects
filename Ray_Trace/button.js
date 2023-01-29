class Button {
    constructor(r, b, g) {
        this.r = 0;
        this.b = 255;
        this.g = 0;
    }
    show() {
        let button;
        button = button.createButton('click me')
        button.position(0,0)
        button.mousePressed(changeColor);
        button.style('backgroundColor', rbg(this.r, this.b, this.g)
    }

    function changeColor() {
        if(this.g == 255) {
            this.g=0;
            this.b=255
        }
        else if (this.b == 255) {
            this.b = 0;
            this.r = 255;
        }

        else if (this.r == 255) {
            this.r = 0;
            this.g = 255;
    }
    }
}


