export function setSectionSelection(sections) {
  const selectElement = document.querySelector("#sectionNumber");
  selectElement.innerHTML = ""; // Clear existing options

  sections.forEach(section => {
    const option = document.createElement("option");
    option.value = section.section;
    option.textContent = `Section ${section.section}`;
    selectElement.appendChild(option);
  });
}