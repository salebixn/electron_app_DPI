const { exec } = require("child_process");

module.exports = class openFile {
	constructor(fileName) {
		exec(`notepad D:/electron_app/${fileName}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			//console.log(`stdout: ${stdout}`);
		});
    }
}