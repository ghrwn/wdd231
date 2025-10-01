export function setTitle(course) {
  document.querySelector("#courseTitle").textContent = `${course.code}: ${course.name}`;
}

export function renderSections(sections) {
  const container = document.querySelector("#sectionsDisplay");
  container.innerHTML = "<h3>Current Sections</h3>";

  sections.forEach(section => {
    const div = document.createElement("div");
    div.classList.add("section");
    div.innerHTML = `
      <strong>Section ${section.section}</strong>: ${section.enrollment} students enrolled
    `;
    container.appendChild(div);
  });
}