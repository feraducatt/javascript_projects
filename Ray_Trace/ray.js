class Ray {
    constructor(pos, angle) {
        this.position = pos;
        this.direction = createVector(Math.cos(angle), Math.sin(angle));
        this.direction.normalize();

    }

    lookAt(x, y) {
        this.direction.x = x - this.position.x;
        this.direction.y = y - this.position.y;
        this.direction.normalize();
    }

    //show all rays (if no boundary, not in use)
    show() {
        strokeWeight(1);
        stroke(255);
        push();
        translate(this.position.x, this.position.y);
        line(0, 0, this.direction.x * 700, this.direction.y * 700);
        pop();
    }

    cast(wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.position.x;
        const y3 = this.position.y;
        const x4 = this.position.x + this.direction.x;
        const y4 = this.position.y + this.direction.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4); //y(x12)=y(x34)
        //if these two lines do not intersect, return
        if (den == 0) {
            return;
        }
    
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4))/den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3))/den;
        //if the boundary line segment and ray intersect, save pt as the point
        if (t > 0 && t < 1 && u > 0) {
            const pt = createVector(x1+t*(x2-x1), y1+t*(y2-y1));
          return pt;
          // else it doesn't
        } else {
            return;
        }


    
    }
}