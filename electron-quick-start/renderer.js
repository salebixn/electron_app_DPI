const CM = require('../functions/comm.js');
const PR = require('../classes/prim.js');
const KR = require('../classes/krusk.js');
const FORD = require('../functions/ford');
const fr = require('../classes/FileReader.js');
const of = require('../classes/openFile.js');
const fs = require("fs");

function comm() {
	var matrix = new fr('../in/comm_matrix.in');

	document.getElementById('result_comm').value = CM.Comm(matrix);
}

function prim() {
	var matrix = new fr('../in/prim_matrix.in');

	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix.length; j++) {
			if (matrix[i][j] == 909) {
				matrix[i][j] = Number.maxValue;
			}
		}
	}

	var result = new PR().miniSpanTree_prime(2, matrix);
	var result_start = '';
	var result_end = '';
	for (let i = 0; i < result.length; i++) {
		result_start += `${result[i]['start']},`;
		result_end += `${result[i]['end']},`;
	}

	document.getElementById('result_prim').value = 'Start:' + result_start + 'End:' + result_end;
}

function krusk() {
	var matrix = new fr('../in/krusk_matrix.in');

	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix.length; j++) {
			if (matrix[i][j] == 909) {
				matrix[i][j] = Number.maxValue;
			}
		}
	}

	var result = new KR().miniSpanTree_kruskal(matrix);
	var result_start='';
	var result_end='';
	for (let i = 0; i < result.length; i++) {
		result_start += `${result[i]['start']},`;
		result_end += `${result[i]['end']},`;
	}
	
	document.getElementById('result_krusk').value = 'Start:' + result_start + 'End:' + result_end;
}

function ford(){
	var graph = new fr('../in/ford_matrix.in');
	var s_t = fs.readFileSync('../in/s_t.in').toString().split(' ');

	document.getElementById('result_ford').value = FORD.Ford(graph, s_t[0], s_t[1]);
}

function openFile(fileName) {
	new of(fileName);
}