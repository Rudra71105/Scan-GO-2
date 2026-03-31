// some helper stuff, not sure if all of this is needed

function isValidQR(data) {
    // very basic check
    if (!data) return false;

    // idk maybe check length??
    if (data.length < 3) return false;

    return true;
}

// was thinking to use this but didn't fully integrate
function formatOutput(text) {
    return text.trim();
}

// debug helper (used once lol)
function logScan(data) {
    console.log("scanned ->", data);
}