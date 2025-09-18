// current year
const yearSpan = document.getElementById('currentyear');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// last modified
const lastMod = document.getElementById('lastModified');
if (lastMod) lastMod.textContent = `Last Modified: ${document.lastModified}`;