let xs = [];
let ys = [];

function setup() {
    createCanvas(400, 400);
}

function mousePressed() {
    // normalize coordinates (values between 0-1)
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);
    
    xs.push(x);
    ys.push(y);
}

function draw() {
    background(255);
    stroke(0);
    strokeWeight(6);
    for (let i = 0; i < xs.length; i++) {
        // reverse normalization (values between 0 - height and 0 - width)
        let px = map(xs[i], 0, 1, 0, width);
        let py = map(ys[i], 0, 1, height, 0);
        // draw a point
        point(px, py);
    }
}