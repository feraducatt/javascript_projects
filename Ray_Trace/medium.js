class Medium {
    constructor(x1, y1, x2, y2, x3,y3) {
        this.b1 = new Boundary(x1, y1, x1, y2);
        this.b2 = new Boundary(x1, y2, x2, y2);
        this.b3 = new Boundary(x2, y2, x3, y3);
        this.b4 = new Boundary(x2, y1, x3, y3);
        this.b5 = new Boundary(x2, y1, x1, y1);
    }
    show() {
        for (bound in bounds) {
            push();
            stroke(255);
            line(bound.a.x, bound.a.y, bound.b.x, bound.b.y);
            pop();
        }
    }
}