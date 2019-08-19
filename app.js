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
	if (!winCheck()) {
		for (i = 0; i < tiles.length; i++) {
			if (mouseX >= tiles[i][0] && mouseX <= tiles[i][0] + tiles[i][2] && mouseY >= tiles[i][1] && mouseY <= tiles[i][1] + tiles[i][3]) {
				cursor("pointer");
				if (mouseIsPressed && started && tiles[i][4] == "" && turn) {
					drawCircle(i);
					turn = false;
					move += 1;
				}
				if (!turn) {
					var place;
					place = chooseMove(i);
					drawCross(place);
					turn = true;
					move += 1;
				}
			}
		}
	}
	for (i = 0; i < tiles.length; i++) {
		if (mouseX >= tiles[i][0] && mouseX <= tiles[i][0] + tiles[i][2] && mouseY >= tiles[i][1] && mouseY <= tiles[i][1] + tiles[i][3]) {
			cursor("pointer");
			if (mouseIsPressed && started && tiles[i][4] == "" && turn) {
				drawCircle(i);
				turn = false;
				move += 1;
			}
			if (!turn) {
				var place;
				place = chooseMove(i);
				drawCross(place);
				turn = true;
				move += 1;
			}
		}
	}
}

function drawCircle(i) {
	if (!winCheck()) {
		tiles[i][4] = "O";
		lastPlaced = i;

		circles.push([tiles[i][0] + tiles[i][2] / 2, tiles[i][1] + tiles[i][3] / 2, tiles[i][3] - 35]);
	}
}

function drawCross(i) {
	if (!winCheck()) {
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

function finalDraw() {
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
	if (started) {
		//HORIZONTAL CHECKS
		if (tiles[0][4] == tiles[1][4] && tiles[0][4] == tiles[2][4] && tiles[0][4] != "") {
			started = false;
			finalDraw();
			alert(tiles[0][4] + " WINS HORIZONTAL 1 (press reset to start again)");
			return true;
		}
		if (tiles[3][4] == tiles[4][4] && tiles[3][4] == tiles[5][4] && tiles[3][4] != "") {
			started = false;
			finalDraw();
			alert(tiles[3][4] + " WINS HORIZONTAL 2 (press reset to start again)");
			return true;
		}
		if (tiles[6][4] == tiles[7][4] && tiles[6][4] == tiles[8][4] && tiles[6][4] != "") {
			started = false;
			finalDraw();
			alert(tiles[6][4] + " WINS HORIZONTAL 3 (press reset to start again)");
			return true;
		}

		//VERTICAL CHECKS
		if (tiles[0][4] == tiles[3][4] && tiles[0][4] == tiles[6][4] && tiles[0][4] != "") {
			started = false;
			finalDraw();
			alert(tiles[0][4] + " WINS VERTICAL 1 (press reset to start again)");
			return true;
		}
		if (tiles[1][4] == tiles[4][4] && tiles[1][4] == tiles[7][4] && tiles[1][4] != "") {
			started = false;
			finalDraw();
			alert(tiles[1][4] + " WINS VERTICAL 2 (press reset to start again)");
			return true;
		}
		if (tiles[2][4] == tiles[5][4] && tiles[2][4] == tiles[8][4] && tiles[2][4] != "") {
			alert(tiles[2][4] + " WINS VERTICAL 3 (press reset to start again)");
			started = false;
			finalDraw();
			return true;
		}

		//DIAGONAL CHECKS
		if (tiles[0][4] == tiles[4][4] && tiles[0][4] == tiles[8][4] && tiles[0][4] != "") {
			started = false;
			finalDraw();
			alert(tiles[0][4] + " WINS DIAGONAL 1 (press reset to start again)");
			return true;
		}
		if (tiles[2][4] == tiles[4][4] && tiles[2][4] == tiles[6][4] && tiles[2][4] != "") {
			started = false;
			finalDraw();
			alert(tiles[2][4] + " WINS DIAGONAL 2 (press reset to start again)");
			return true;
		}

		//FULL CHECK
		var counter = 0;
		for (i = 0; i < tiles.length; i++) {
			if (tiles[i][4] != "") {
				counter += 1;
			}
		}

		if (counter >= 8) {
			alert("TIE (press reset to start again)");
			started = false;
			finalDraw();
			return true;
		}
	}
}

function mouseClicked() {
	started = true;
}

//0 = corner start || 1 = middle start || 2 = side start

var start = 0;
function chooseMove() {
	console.log(move + " " + start);

	if (move == 1) {
		if (tiles[0][4] == "O" || tiles[2][4] == "O" || tiles[6][4] == "O" || tiles[8][4] == "O") {
			start = 0;
			var r = 4;
			return r;
		} else if (tiles[1][4] == "O" || tiles[3][4] == "O" || tiles[5][4] == "O" || tiles[7][4] == "O") {
			start = 2;
			var r = 4;
			return r;
		}
	}

	//CHECK TO WIN
	//HORIZONTAL 1
	if (tiles[0][4] == "X" && tiles[1][4] == "X" && tiles[2][4] == "") {
		var r = 2;
		return r;
	} else if (tiles[0][4] == "X" && tiles[2][4] == "X" && tiles[1][4] == "") {
		var r = 1;
		return r;
	} else if (tiles[1][4] == "X" && tiles[2][4] == "X" && tiles[0][4] == "") {
		var r = 0;
		return r;
	}

	//HORIZONTAL 2
	if (tiles[3][4] == "X" && tiles[4][4] == "X" && tiles[5][4] == "") {
		var r = 5;
		return r;
	} else if (tiles[3][4] == "X" && tiles[5][4] == "X" && tiles[4][4] == "") {
		var r = 4;
		return r;
	} else if (tiles[4][4] == "X" && tiles[5][4] == "X" && tiles[3][4] == "") {
		var r = 3;
		return r;
	}

	//HORIZONTAL 3
	if (tiles[6][4] == "X" && tiles[7][4] == "X" && tiles[8][4] == "") {
		var r = 8;
		return r;
	} else if (tiles[6][4] == "X" && tiles[8][4] == "X" && tiles[7][4] == "") {
		var r = 7;
		return r;
	} else if (tiles[7][4] == "X" && tiles[8][4] == "X" && tiles[6][4] == "") {
		var r = 6;
		return r;
	}

	//VERTICAL 1
	if (tiles[0][4] == "X" && tiles[3][4] == "X" && tiles[6][4] == "") {
		var r = 6;
		return r;
	} else if (tiles[0][4] == "X" && tiles[6][4] == "X" && tiles[3][4] == "") {
		var r = 3;
		return r;
	} else if (tiles[3][4] == "X" && tiles[6][4] == "X" && tiles[0][4] == "") {
		var r = 0;
		return r;
	}

	//VERTICAL 2
	if (tiles[1][4] == "X" && tiles[4][4] == "X" && tiles[7][4] == "") {
		var r = 7;
		return r;
	} else if (tiles[1][4] == "X" && tiles[7][4] == "X" && tiles[4][4] == "") {
		var r = 4;
		return r;
	} else if (tiles[4][4] == "X" && tiles[7][4] == "X" && tiles[1][4] == "") {
		var r = 1;
		return r;
	}

	//VERTICAL 3
	if (tiles[2][4] == "X" && tiles[5][4] == "X" && tiles[8][4] == "") {
		var r = 8;
		return r;
	} else if (tiles[2][4] == "X" && tiles[8][4] == "X" && tiles[5][4] == "") {
		var r = 5;
		return r;
	} else if (tiles[5][4] == "X" && tiles[8][4] == "X" && tiles[2][4] == "") {
		var r = 2;
		return r;
	}

	//DIAGONAL 1
	if (tiles[0][4] == "X" && tiles[4][4] == "X" && tiles[8][4] == "") {
		var r = 8;
		return r;
	} else if (tiles[0][4] == "X" && tiles[8][4] == "X" && tiles[4][4] == "") {
		var r = 4;
		return r;
	} else if (tiles[4][4] == "X" && tiles[8][4] == "X" && tiles[0][4] == "") {
		var r = 0;
		return r;
	}

	//DIAGONAL 2
	if (tiles[2][4] == "X" && tiles[4][4] == "X" && tiles[6][4] == "") {
		var r = 6;
		return r;
	} else if (tiles[2][4] == "X" && tiles[6][4] == "X" && tiles[4][4] == "") {
		var r = 4;
		return r;
	} else if (tiles[4][4] == "X" && tiles[6][4] == "X" && tiles[2][4] == "") {
		var r = 2;
		return r;
	}

	//CHECK TO BLOCK
	//HORIZONTAL 1
	if (tiles[0][4] == "O" && tiles[1][4] == "O" && tiles[2][4] == "") {
		console.log("h1");
		var r = 2;
		return r;
	} else if (tiles[0][4] == "O" && tiles[2][4] == "O" && tiles[1][4] == "") {
		console.log("h1");
		var r = 1;
		return r;
	} else if (tiles[1][4] == "O" && tiles[2][4] == "O" && tiles[0][4] == "") {
		console.log("h1");
		var r = 0;
		return r;
	}

	//HORIZONTAL 2
	if (tiles[3][4] == "O" && tiles[4][4] == "O" && tiles[5][4] == "") {
		console.log("h2");
		var r = 5;
		return r;
	} else if (tiles[3][4] == "O" && tiles[5][4] == "O" && tiles[4][4] == "") {
		console.log("h2");
		var r = 4;
		return r;
	} else if (tiles[4][4] == "O" && tiles[5][4] == "O" && tiles[3][4] == "") {
		console.log("h2");
		var r = 3;
		return r;
	}

	//HORIZONTAL 3
	if (tiles[6][4] == "O" && tiles[7][4] == "O" && tiles[8][4] == "") {
		console.log("h3");
		var r = 8;
		return r;
	} else if (tiles[6][4] == "O" && tiles[8][4] == "O" && tiles[7][4] == "") {
		console.log("h3");
		var r = 7;
		return r;
	} else if (tiles[7][4] == "O" && tiles[8][4] == "O" && tiles[6][4] == "") {
		console.log("h3");
		var r = 6;
		return r;
	}

	//VERTICAL 1
	if (tiles[0][4] == "O" && tiles[3][4] == "O" && tiles[6][4] == "") {
		console.log("v1");
		var r = 6;
		return r;
	} else if (tiles[0][4] == "O" && tiles[6][4] == "O" && tiles[3][4] == "") {
		console.log("v1");
		var r = 3;
		return r;
	} else if (tiles[3][4] == "O" && tiles[6][4] == "O" && tiles[0][4] == "") {
		console.log("v1");
		var r = 0;
		return r;
	}

	//VERTICAL 2
	if (tiles[1][4] == "O" && tiles[4][4] == "O" && tiles[7][4] == "") {
		console.log("v2");
		var r = 7;
		return r;
	} else if (tiles[1][4] == "O" && tiles[7][4] == "O" && tiles[4][4] == "") {
		console.log("v2");
		var r = 4;
		return r;
	} else if (tiles[4][4] == "O" && tiles[7][4] == "O" && tiles[1][4] == "") {
		console.log("v2");
		var r = 1;
		return r;
	}

	//VERTICAL 3
	if (tiles[2][4] == "O" && tiles[5][4] == "O" && tiles[8][4] == "") {
		console.log("v3");
		var r = 8;
		return r;
	} else if (tiles[2][4] == "O" && tiles[8][4] == "O" && tiles[5][4] == "") {
		console.log("v3");
		var r = 5;
		return r;
	} else if (tiles[5][4] == "O" && tiles[8][4] == "O" && tiles[2][4] == "") {
		console.log("v3");
		var r = 2;
		return r;
	}

	//DIAGONAL 1
	if (tiles[0][4] == "O" && tiles[4][4] == "O" && tiles[8][4] == "") {
		console.log("d1");
		var r = 8;
		return r;
	} else if (tiles[0][4] == "O" && tiles[8][4] == "O" && tiles[4][4] == "") {
		console.log("d1");
		var r = 4;
		return r;
	} else if (tiles[4][4] == "O" && tiles[8][4] == "O" && tiles[0][4] == "") {
		console.log("d1");
		var r = 0;
		return r;
	}

	//DIAGONAL 2
	if (tiles[2][4] == "O" && tiles[4][4] == "O" && tiles[6][4] == "") {
		console.log("d2");
		var r = 6;
		return r;
	} else if (tiles[2][4] == "O" && tiles[6][4] == "O" && tiles[4][4] == "") {
		console.log("d2");
		var r = 4;
		return r;
	} else if (tiles[4][4] == "O" && tiles[6][4] == "O" && tiles[2][4] == "") {
		console.log("d2");
		var r = 2;
		return r;
	}

	if (move == 3) {
		if (tiles[0][4] == "O" && tiles[7][4] == "O" && tiles[3][4] == "") {
			var r = 3;
			return r;
		} else if (tiles[2][4] == "O" && tiles[7][4] == "O" && tiles[5][4] == "") {
			var r = 5;
			return r;
		} else if (tiles[6][4] == "O" && tiles[2][4] == "O" && tiles[3][4] == "") {
			var r = 3;
			return r;
		} else if (tiles[8][4] == "O" && tiles[1][4] == "O" && tiles[5][4] == "") {
			var r = 5;
			return r;
		}
	}

	for (i = 0; i < tiles.length; i++) {
		if (tiles[i][4] == "") {
			return i;
		}
	}
}
