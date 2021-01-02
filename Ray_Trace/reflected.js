
function reflected(d, b) {
    let n = particle.normal(b);
    console.log("n: ", n);
    let r = createVector();
    let dp = p5.Vector.dot(d, n);
    r = d - 2 * (dp) * n;
    console.log("r: ", r);
    return r.normalize();
}

let dir = createVector(Math.cos(0), Math.sin(0))
console.log("ray-dir: ", dir);
let boundary = new Boundary(5, 6, -10, -10);
reflected(dir, b);