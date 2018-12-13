let xs = [];
let ys = [];

let m, b;

const learningRate = 0.01;
const optimizer = tf.train.sgd(learningRate);

function setup() {
    createCanvas(400, 400);

    m = tf.variable(tf.scalar(random(1)));
    b = tf.variable(tf.scalar(random(1)));

}

function loss(pred, labels) {
    return pred.sub(labels).square().mean();
}

function predict(xs) {
    const tfxs = tf.tensor1d(xs);
    // y = mx + b
    const ys = tfxs.mul(m).add(b);
    return ys;
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

    if (xs.length > 0) {
        const tfys = tf.tensor1d(ys);
        optimizer.minimize(() => loss(predict(xs), tfys));
    }

    for (let i = 0; i < xs.length; i++) {
        // reverse normalization (values between 0 - height and 0 - width)
        let px = map(xs[i], 0, 1, 0, width);
        let py = map(ys[i], 0, 1, height, 0);
        // draw a point
        point(px, py);
    }

    // draw the line
    const xvals = [0, 1];
    const yvals = predict(xvals);
    //yvals.print();
    let x1 = map(xvals[0], 0, 1, 0, width);
    let x2 = map(xvals[1], 0, 1, 0, width);
    
    let lineY = yvals.dataSync();
    let y1 = map(lineY[0], 0, 1, height, 0);
    let y2 = map(lineY[1], 0, 1, height, 0);
    
    line(x1, y1, x2, y2);

}