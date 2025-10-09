const courseContainer = document.getElementById('course-cards');
const creditsDisplay = document.getElementById('credits');
const courseDetails = document.getElementById('course-details');

const courses = [
  {
    subject: "WDD",
    number: "130",
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web Foundations",
    description: "Introduction to HTML, CSS, and basic web concepts.",
    technology: ["HTML", "CSS"]
  },
  {
    subject: "CSE",
    number: "131",
    title: "Programming Logic",
    credits: 2,
    certificate: "Software Foundations",
    description: "Learn programming logic and basic algorithms using Python.",
    technology: ["Python", "Pseudocode"]
  },
  {
    subject: "WDD",
    number: "231",
    title: "Web Frontend Development",
    credits: 2,
    certificate: "Web Development",
    description: "Build dynamic websites using modern JavaScript and APIs.",
    technology: ["JavaScript", "DOM", "Fetch API"]
  }
];

let filteredCourses = [...courses];

function calculateTotalCredits(list) {
  return list.reduce((sum, c) => sum + c.credits, 0);
}

function updateCreditDisplay() {
  creditsDisplay.textContent = `The total credits for courses listed above is: ${calculateTotalCredits(filteredCourses)}`;
}

function renderCourses(list) {
  courseContainer.innerHTML = '';
  list.forEach(course => {
    const div = document.createElement('div');
    div.classList.add('course-card');
    div.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <h4>${course.title}</h4>
      <p>Credits: ${course.credits}</p>
      <p>Certificate: ${course.certificate}</p>
    `;
    div.addEventListener('click', () => displayCourseDetails(course));
    courseContainer.appendChild(div);
  });
  updateCreditDisplay();
}

document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', function() {
    document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    filteredCourses = filter === 'all' ? [...courses] : courses.filter(c => c.subject === filter);
    renderCourses(filteredCourses);
  });
});

document.addEventListener('DOMContentLoaded', () => renderCourses(filteredCourses));

function displayCourseDetails(course) {
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p><strong>Description</strong>: ${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();

  document.getElementById('closeModal').addEventListener("click", () => courseDetails.close());
  courseDetails.addEventListener('click', (event) => {
    if (event.target === courseDetails) courseDetails.close();
  });
}

// Close on Escape
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && courseDetails.open) courseDetails.close();
});
