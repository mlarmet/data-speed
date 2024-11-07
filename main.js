const KO_FACTOR = 1024;
const MO_FACTOR = KO_FACTOR * 1024;
const GO_FACTOR = MO_FACTOR * 1024;

const UNIT_FACTORS = {
	o: 1,
	ko: KO_FACTOR,
	mo: MO_FACTOR,
	go: GO_FACTOR,
};

const speedInput = document.getElementById("speed");
const dataInput = document.getElementById("data");

const speedUnitInput = document.getElementById("speed-unit");
const dataUnitInput = document.getElementById("data-unit");

const timeAmount = document.getElementById("time-amount");

function toHHMMSS(seconds) {
	const hours = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);

	// Show nb days
	if (hours >= 24) {
		return `${Math.floor(hours / 24)} days`;
	}

	// Pad with leading zeros and format as HH:MM:SS
	return `${String(hours).padStart(2, "0")} h ${String(mins).padStart(2, "0")} m ${String(secs).padStart(2, "0")}`;
}

function getOctets(data, unit) {
	const factor = UNIT_FACTORS[unit];
	return factor ? data * factor : 0;
}

function getTime(timeInSec) {
	if (timeInSec < 60) {
		return `${Math.floor(timeInSec)}`;
	}

	// 1 to 59 min
	if (timeInSec < 3600) {
		return `${Math.floor(timeInSec / 60)} minute(s) et ${timeInSec % 60} seconde(s)`;
	}

	// up than 1 hour
	return `${Math.floor(timeInSec / 3600)} heure(s), ${Math.floor(timeInSec / 60)} minute(s) et ${timeInSec % 60} seconde(s)`;
}

function calcTime() {
	const speed = parseInt(speedInput.value || 0);
	const data = parseInt(dataInput.value || 0);

	if (speed === 0 || data === 0) {
		return;
	}

	const speedUnit = speedUnitInput.value;
	const dataUnit = dataUnitInput.value;

	const speedOct = getOctets(speed, speedUnit);
	const dataOct = getOctets(data, dataUnit);

	const timeInSec = dataOct / speedOct;

	const timeText = toHHMMSS(timeInSec);
	timeAmount.textContent = timeText;
}

speedInput.addEventListener("input", calcTime);
dataInput.addEventListener("input", calcTime);

speedUnitInput.addEventListener("input", calcTime);
dataUnitInput.addEventListener("input", calcTime);
