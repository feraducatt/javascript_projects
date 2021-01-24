class Particle {
    constructor() {
        this.pos = createVector(200, 200)
        // h is the beam height with number of rays
        this.rays = [];
        this.reflected_rays = [];
        //makes rays between -h/2 and h/2 
        for (let p = 0; p < 2*Math.PI; p += Math.PI/200) {
            this.rays.push(new Ray(createVector(this.pos.x, this.pos.y), p));
    }
}
    
//update position of particle
    update(x,y) {
        this.pos.x = x;
        this.pos.y = y;
        for (let i = 0; i< this.rays.length; i+=1) {
            this.rays[i].position = createVector(x, y);
        }
    }
//look for wall
    look(walls, rays) {
        this.reflected_rays = [];
        for (let ray of rays) {
            
            let closest = null; //assume it hits no boundaries
            
            let record = Infinity; // ray going to infinity
            
            let b; //the wall where it hits
            for (let wall of walls) {
                const pt = ray.cast(wall); //
                //if ray touches wall
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                        b = wall;
                    }
                }
            }
            //if there is a closest point
            if (closest) {
                strokeWeight(1)
                stroke(255, 100);
                line(ray.position.x, ray.position.y, closest.x, closest.y);
                this.reflected_rays.push(new Ray(closest.x, closest.y, Math.atan(this.reflected(ray.direction, b).y/this.reflected(ray.direction, b).x), true));
                push();
                stroke(0,0,255);
                translate(closest.x, closest.y);
                line(0, 0, this.reflected(ray.direction, b).x*100, this.reflected(ray.direction, b).y*100);
                this.look(walls, this.reflected(ray.direction,b))
                pop();
                push();
                stroke(0,255,0);
                translate(closest.x, closest.y);
                line(0, 0, this.refracted(ray.direction, b).x*100, this.refracted(ray.direction, b).y*100);
                pop();
                               
            }
        }
    }

    normal(line) {
        let x = line.b.x - line.a.x;
        let y = line.b.y - line.a.y;
        let n = createVector(-y, x).normalize();
        return n;
    }
    
    reflected(d, b) { // d=direction b=wall
        d = d.normalize(); //normalize direction
        let n = this.normal(b); //find normal of the wall
        if (p5.Vector.dot(n, d) > 0) {
            n = p5.Vector.mult(n, -1); //determine the correct side of the boundary to take the normal of
        }
        let dp = p5.Vector.dot(n, d); //get dot project
        let r = createVector();
        let inner = p5.Vector.mult(n, 2*dp); // r = d - n*2*dp
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
        strokeWeight(10);
        stroke(255);
        fill(255);
        point(this.pos.x, this.pos.y);
        //for (let ray of this.rays) {
        //    ray.show();
        //}
    }

}