// Import everything we need
import byuiCourse from './course.mjs';
import { setSectionSelection } from './sections.mjs';
import { setTitle, renderSections } from './output.mjs';

// Initialize page on load
document.addEventListener("DOMContentLoaded", () => {
  setTitle(byuiCourse);
  setSectionSelection(byuiCourse.sections);
  renderSections(byuiCourse.sections);
});

// Handle Enroll Button
document.querySelector("#enrollStudent").addEventListener("click", function () {
  const sectionNum = document.querySelector("#sectionNumber").value;
  byuiCourse.changeEnrollment(sectionNum);
  renderSections(byuiCourse.sections); // 👈 Update UI
});

// Handle Drop Button
document.querySelector("#dropStudent").addEventListener("click", function () {
  const sectionNum = document.querySelector("#sectionNumber").value;
  byuiCourse.changeEnrollment(sectionNum, false);
  renderSections(byuiCourse.sections); // 👈 Update UI
});