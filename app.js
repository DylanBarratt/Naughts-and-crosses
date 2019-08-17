var canvasSize = 1.5;
var canvas, tiles, turn, circles, crosses, whosGoLbl, started;
//{turn} human is O computer is X (O = true|| X = false)
function setup() {
	canvas = createCanvas(document.documentElement.clientHeight / canvasSize, document.documentElement.clientHeight / canvasSize);
	canvas.position(
		document.documentElement.clientWidth / 2 - document.documentElement.clientHeight / canvasSize / 2,
		document.documentElement.clientHeight / 2 - document.documentElement.clientHeight / canvasSize / 2
	);
	tileInit();
	turn = true;
	whosGoLbl = createP("It is noughts go!");
	whosGoLbl.style("font-size", "30px");
	whosGoLbl.position(document.documentElement.clientWidth / 2 - 90, document.documentElement.clientHeight - 100);
	started = true;
}
function draw() {
	background(255);
	noFill();
	strokeWeight(10);
	stroke(0);
	//VERTICAL LINES
	line(width / 3, 0, width / 3, height);
	line((width / 3) * 2, 0, (width / 3) * 2, height);
	//HORIZONTAL LINES
	line(0, height / 3, width, height / 3);
	line(0, (height / 3) * 2, width, (height / 3) * 2);

	tileDraw();
	shapeDraw();
	winCheck();

	if (turn) {
		whosGoLbl.html("It is noughts go!");
	}
	if (!turn) {
		whosGoLbl.html("It is crosses go!");
	}
}

function windowResized() {
	resizeCanvas(document.documentElement.clientHeight / canvasSize, document.documentElement.clientHeight / canvasSize);
	canvas.position(
		document.documentElement.clientWidth / 2 - document.documentElement.clientHeight / canvasSize / 2,
		document.documentElement.clientHeight / 2 - document.documentElement.clientHeight / canvasSize / 2
	);
	tileInit();
	whosGoLbl.position(document.documentElement.clientWidth / 2 - 90, document.documentElement.clientHeight - 100);
}

function tileInit() {
	turn = true;
	tiles = [];
	circles = [];
	crosses = [];

	for (y = 0; y < 3; y++) {
		for (x = 0; x < 3; x++) {
			tiles.push([(x * width) / 3, (y * height) / 3, width / 3, height / 3, ""]);
		}
	}
}

function tileDraw() {
	for (i = 0; i < tiles.length; i++) {
		if (mouseX >= tiles[i][0] && mouseX <= tiles[i][0] + tiles[i][2]) {
			if (mouseY >= tiles[i][1] && mouseY <= tiles[i][1] + tiles[i][3]) {
				cursor("pointer");
				if (mouseIsPressed && started) {
					if (tiles[i][4] == "") {
						if (turn) {
							drawCircle(i);
							turn = false;
						} else {
							drawCross(i);
							turn = true;
						}
					}
				}
			}
		}
	}
}

function drawCircle(i) {
	tiles[i][4] = "O";

	circles.push([tiles[i][0] + tiles[i][2] / 2, tiles[i][1] + tiles[i][3] / 2, tiles[i][3] - 35]);
}

function drawCross(i) {
	tiles[i][4] = "X";

	crosses.push([
		//LINE 1 \
		tiles[i][0] + 30,
		tiles[i][1] + 30,
		tiles[i][0] + tiles[i][2] - 30,
		tiles[i][1] + tiles[i][3] - 30,
		//LINE 2 /
		tiles[i][0] + tiles[i][2] - 30,
		tiles[i][1] + 30,
		tiles[i][0] + 30,
		tiles[i][1] + tiles[i][3] - 30
	]);
}

function shapeDraw() {
	noFill();
	stroke(0);
	for (i = 0; i < circles.length; i++) {
		circle(circles[i][0], circles[i][1], circles[i][2]);
	}
	for (i = 0; i < crosses.length; i++) {
		line(crosses[i][0], crosses[i][1], crosses[i][2], crosses[i][3]);
		line(crosses[i][4], crosses[i][5], crosses[i][6], crosses[i][7]);
	}
}

function winCheck() {
	//HORIZONTAL CHECKS
	if (tiles[0][4] == tiles[1][4] && tiles[0][4] == tiles[2][4] && tiles[0][4] != "") {
		alert(tiles[0][4] + " WINS HORIZONTAL 1");
		started = false;
		tileInit();
	}
	if (tiles[3][4] == tiles[4][4] && tiles[3][4] == tiles[5][4] && tiles[3][4] != "") {
		alert(tiles[3][4] + " WINS HORIZONTAL 2");
		started = false;
		tileInit();
	}
	if (tiles[6][4] == tiles[7][4] && tiles[6][4] == tiles[8][4] && tiles[6][4] != "") {
		alert(tiles[6][4] + " WINS HORIZONTAL 3");
		started = false;
		tileInit();
	}

	//VERTICAL CHECKS
	if (tiles[0][4] == tiles[3][4] && tiles[0][4] == tiles[6][4] && tiles[0][4] != "") {
		alert(tiles[0][4] + " WINS VERTICAL 1");
		started = false;
		tileInit();
	}
	if (tiles[1][4] == tiles[4][4] && tiles[1][4] == tiles[7][4] && tiles[1][4] != "") {
		alert(tiles[1][4] + " WINS VERTICAL 2");
		started = false;
		tileInit();
	}
	if (tiles[2][4] == tiles[5][4] && tiles[2][4] == tiles[8][4] && tiles[2][4] != "") {
		alert(tiles[2][4] + " WINS VERTICAL 3");
		started = false;
		tileInit();
	}

	//DIAGONAL CHECKS
	if (tiles[0][4] == tiles[4][4] && tiles[0][4] == tiles[8][4] && tiles[0][4] != "") {
		alert(tiles[0][4] + " WINS DIAGONAL 1");
		started = false;
		tileInit();
	}
	if (tiles[2][4] == tiles[4][4] && tiles[2][4] == tiles[6][4] && tiles[2][4] != "") {
		alert(tiles[2][4] + " WINS DIAGONAL 2");
		started = false;
		tileInit();
	}
}

function mouseClicked() {
	started = true;
}
