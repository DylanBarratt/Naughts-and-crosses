var canvasSize = 1.5;
var canvas, tiles, turn, circles, crosses, whosGoLbl, started, move, lastPlaced;
//{turn} human is O computer is X (O = true|| X = false)
function setup() {
	canvas = createCanvas(document.documentElement.clientHeight / canvasSize, document.documentElement.clientHeight / canvasSize);
	canvas.position(
		document.documentElement.clientWidth / 2 - document.documentElement.clientHeight / canvasSize / 2,
		document.documentElement.clientHeight / 2 - document.documentElement.clientHeight / canvasSize / 2
	);
	tileInit();
	turn = true;
	whosGoLbl = createP("It's noughts go!");
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

	if (turn) {
		whosGoLbl.html("It's noughts go!");
	}
	if (!turn) {
		whosGoLbl.html("It's crosses go!");
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
	lastPlaced = 0;
	move = 0;
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
		if (mouseX >= tiles[i][0] && mouseX <= tiles[i][0] + tiles[i][2] && mouseY >= tiles[i][1] && mouseY <= tiles[i][1] + tiles[i][3]) {
			cursor("pointer");
			if (mouseIsPressed && started && tiles[i][4] == "" && turn) {
				drawCircle(i);
				turn = false;
				move += 1;
			}
			if (!turn) {
				chooseMove();
				move += 1;
			}
		}
	}
}

function drawCircle(i) {
	tiles[i][4] = "O";
	lastPlaced = i;

	circles.push([tiles[i][0] + tiles[i][2] / 2, tiles[i][1] + tiles[i][3] / 2, tiles[i][3] - 35]);
}

function drawCross(i) {
	if (tiles[i][4] == "") {
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
	} else {
		alert("ERROR PLACING X AT " + i);
	}
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

	winCheck();
}

function winCheck() {
	//HORIZONTAL CHECKS
	if (tiles[0][4] == tiles[1][4] && tiles[0][4] == tiles[2][4] && tiles[0][4] != "") {
		alert(tiles[0][4] + " WINS HORIZONTAL 1 IN " + move + " moves");
		started = false;
		tileInit();
	}
	if (tiles[3][4] == tiles[4][4] && tiles[3][4] == tiles[5][4] && tiles[3][4] != "") {
		alert(tiles[3][4] + " WINS HORIZONTAL 2" + move + " moves");
		started = false;
		tileInit();
	}
	if (tiles[6][4] == tiles[7][4] && tiles[6][4] == tiles[8][4] && tiles[6][4] != "") {
		alert(tiles[6][4] + " WINS HORIZONTAL 3" + move + " moves");
		started = false;
		tileInit();
	}

	//VERTICAL CHECKS
	if (tiles[0][4] == tiles[3][4] && tiles[0][4] == tiles[6][4] && tiles[0][4] != "") {
		alert(tiles[0][4] + " WINS VERTICAL 1" + move + " moves");
		started = false;
		tileInit();
	}
	if (tiles[1][4] == tiles[4][4] && tiles[1][4] == tiles[7][4] && tiles[1][4] != "") {
		alert(tiles[1][4] + " WINS VERTICAL 2" + move + " moves");
		started = false;
		tileInit();
	}
	if (tiles[2][4] == tiles[5][4] && tiles[2][4] == tiles[8][4] && tiles[2][4] != "") {
		alert(tiles[2][4] + " WINS VERTICAL 3" + move + " moves");
		started = false;
		tileInit();
	}

	//DIAGONAL CHECKS
	if (tiles[0][4] == tiles[4][4] && tiles[0][4] == tiles[8][4] && tiles[0][4] != "") {
		alert(tiles[0][4] + " WINS DIAGONAL 1" + move + " moves");
		started = false;
		tileInit();
	}
	if (tiles[2][4] == tiles[4][4] && tiles[2][4] == tiles[6][4] && tiles[2][4] != "") {
		alert(tiles[2][4] + " WINS DIAGONAL 2" + move + " moves");
		started = false;
		tileInit();
	}

	//FULL CHECK
	var counter = 0;
	for (i = 0; i < 8; i++) {
		if (tiles[i][4] != "") {
			counter += 1;
		}
	}

	if (counter == 8) {
		alert("TIE");
		started = false;
		tileInit();
	}
}

function mouseClicked() {
	started = true;
}

//0 = corner start || 1 = middle start || 2 = side start
/*
drawCross(4);
turn = true;
move += 1;
*/

var start = 0;
function chooseMove() {
	console.log(move + " " + start);

	if (move == 1) {
		if (tiles[0][4] == "O" || tiles[2][4] == "O" || tiles[6][4] == "O" || tiles[8][4] == "O") {
			drawCross(4);
			turn = true;
			move += 1;
			start = 0;
		}
	}

	//CORNER START

	if (move == 4 && start == 0) {
		if (tiles[0][4] == "O" && tiles[2][4] == "O") {
			drawCross(1);
			turn = true;
			move += 1;
		} else if (tiles[0][4] == "O" && tiles[6][4] == "O") {
			drawCross(3);
			turn = true;
			move += 1;
		} else if (tiles[2][4] == "O" && tiles[0][4] == "O") {
			drawCross(1);
			turn = true;
			move += 1;
		} else if (tiles[2][4] == "O" && tiles[8][4] == "O") {
			drawCross(5);
			turn = true;
			move += 1;
		} else if (tiles[6][4] == "O" && tiles[0][4] == "O") {
			drawCross(3);
			turn = true;
			move += 1;
		} else if (tiles[6][4] == "O" && tiles[8][4] == "O") {
			drawCross(7);
			turn = true;
			move += 1;
		} else if (tiles[0][4] == "O" && tiles[8][4] == "O") {
			drawCross(7);
			turn = true;
			move += 1;
		} else if (tiles[2][4] == "O" && tiles[6][4] == "O") {
			drawCross(7);
			turn = true;
			move += 1;
		} else {
			if (tiles[1][4] == "") {
				drawCross(1);
				turn = true;
				move += 1;
			} else if (tiles[3][4] == "") {
				drawCross(3);
				turn = true;
				move += 1;
			} else if (tiles[5][4] == "") {
				drawCross(5);
				turn = true;
				move += 1;
			} else if (tiles[7][4] == "") {
				drawCross(7);
				turn = true;
				move += 1;
			}
		}
	}

	if (move == 7 && start == 0) {
		if (lastPlaced == 0 && tiles[2][4] == "O" && tiles[1][4] != "X") {
			drawCross(1);
			turn = true;
			move += 1;
		} else if (lastPlaced == 0 && tiles[6][4] == "O" && tiles[3][4] != "X") {
			drawCross(3);
			turn = true;
			move += 1;
		} else if (lastPlaced == 2 && tiles[0][4] == "O" && tiles[1][4] != "X") {
			drawCross(1);
			turn = true;
			move += 1;
		} else if (lastPlaced == 2 && tiles[8][4] == "O" && tiles[5][4] != "X") {
			drawCross(5);
			turn = true;
			move += 1;
		} else if (lastPlaced == 6 && tiles[0][4] == "O" && tiles[3][4] != "X") {
			drawCross(3);
			turn = true;
			move += 1;
		} else if (lastPlaced == 6 && tiles[8][4] == "O" && tiles[7][4] != "X") {
			drawCross(7);
			turn = true;
			move += 1;
		} else {
			if (tiles[1][4] == "") {
				drawCross(1);
				turn = true;
				move += 1;
			} else if (tiles[3][4] == "") {
				drawCross(3);
				turn = true;
				move += 1;
			} else if (tiles[5][4] == "") {
				drawCross(5);
				turn = true;
				move += 1;
			} else if (tiles[7][4] == "") {
				drawCross(7);
				turn = true;
				move += 1;
			}
		}
	}
}
