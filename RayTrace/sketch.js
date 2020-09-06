let walls = [];
let ray;
let particle;
let medium;

function setup() {
    createCanvas(400, 400);
    
    medium = new Medium(200, 105, 250, 305, 275, 205);

    //walls.push(new Boundary(0, 0, 0, height));
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(0, height, width, height));

    walls.push(medium.b1);
    walls.push(medium.b2);
    walls.push(medium.b3);
    walls.push(medium.b4);
    walls.push(medium.b5);
    particle = new Particle();

}

function draw() {
    background(0);
    for (let wall of walls) {    
        wall.show();
    }
    particle.look(walls, particle.rays);
    let reflected_rays = [...particle.reflected_rays];
    particle.look(walls, reflected_rays);
    console.log(reflected_rays);
    console.log(particle.reflected_rays);
    // particle.update(mouseX, mouseY);
    particle.show();

}