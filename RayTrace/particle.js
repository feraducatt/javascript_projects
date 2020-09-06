class Particle {
    constructor() {
        this.pos = createVector(width - 100, 205);
        let h = 10.0;
        this.y = [(this.pos.y + (h / 2)), (this.pos.y - (h / 2))];
        this.rays = [];
        this.reflected_rays = [];
        for (let p = this.y[1]; p < this.y[0]; p += 2) {
            this.rays.push(new Ray(createVector(this.pos.x, p), Math.PI, false));
        }

    }

    update(x,y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    look(walls, rays) {
        this.reflected_rays = [];
        for (let ray of rays) {
            let closest = null;
            let record = Infinity;
            let b;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                        b = wall;
                    }
                }
            }
            if (closest) {
                stroke(255, 100);
                line(ray.position.x, ray.position.y, closest.x, closest.y);
                this.reflected_rays.push(new Ray(closest.x, closest.y, Math.atan(this.reflected(ray.direction, b).y/this.reflected(ray.direction, b).x), true));
                // push();
                // stroke(0,0,255);
                // translate(closest.x, closest.y);
                // line(0, 0, this.reflected(ray.direction, b).x*100, this.reflected(ray.direction, b).y*100);
                // pop();
                // push();
                // stroke(0,255,0);
                // translate(closest.x, closest.y);
                // line(0, 0, this.refracted(ray.direction, b).x*100, this.refracted(ray.direction, b).y*100);
                // pop();
                               
            }
        }
    }

    normal(line) {
        let x = line.b.x - line.a.x;
        let y = line.b.y - line.a.y;
        let n = createVector(-y, x).normalize();
        return n;
    }
    
    reflected(d, b) {
        d = d.normalize();
        let n = this.normal(b);
        if (p5.Vector.dot(n, d) > 0) {
            n = p5.Vector.mult(n, -1);
        }
        let dp = p5.Vector.dot(n, d);
        let r = createVector();
        let inner = p5.Vector.mult(n, 2*dp);
        r = p5.Vector.sub(d, inner);

        return r;
    }
    refracted(d, b) {
        let n = this.normal(b);
        if (p5.Vector.dot(n, d) > 0) {
            n = p5.Vector.mult(n, -1);
        }
        let r = 1 / b.n;
        let c = n.mult(-1).dot(d);
        let t = d.mult(r).add(r*c - n.mult(Math.sqrt(1-Math.pow(r,2)*(1-Math.pow(c,2)))));
        
        return t;
    }

    show() {
        fill(255);
        line(this.pos.x, this.y[0], this.pos.x, this.y[1]);
        for (let ray of this.rays) {
            ray.show();
        }

    }

}