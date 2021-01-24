let walls = [];
let ray;
let particle;
let height = 600;
let width = 600;

function setup() {
    createCanvas(width, height);
    //surounding canvas
    walls.push(new Boundary(0, 0, 0, height));
    walls.push(new Boundary(0, height, width, height));
    walls.push(new Boundary(width, height, width, 0));
    walls.push(new Boundary(width, 0, 0, 0));
    for(let i = 0; i<6; i+=1) {
        walls.push(new Boundary(Math.floor(Math.random() * width), Math.floor(Math.random() * height), Math.floor(Math.random() * width), Math.floor(Math.random() * height)));
    }

    particle = new Particle();
}

function draw() {
    background(0); //make the whole thing black
    for (let wall of walls) {    
        wall.show();
    }
    particle.look(walls, particle.rays); //looks for walls in ray trajectory
    //let reflected_rays = [...particle.reflected_rays];
    //particle.look(walls, reflected_rays);
    //console.log(reflected_rays);
    //console.log(particle.reflected_rays);
    particle.update(mouseX, mouseY); //update position of particle 
    particle.show(); //shows the particle
}