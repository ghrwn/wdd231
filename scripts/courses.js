// === DATA: edit completed: true/false to match your progress ===
const courses = [
  { code: "WDD 130", title: "Web Fundamentals", credits: 2, prefix: "WDD", completed: true },
  { code: "WDD 131", title: "Dynamic Web Fundamentals", credits: 2, prefix: "WDD", completed: false },
  { code: "WDD 231", title: "Frontend Dev I", credits: 3, prefix: "WDD", completed: false },
  { code: "CSE 110", title: "Intro to Programming", credits: 2, prefix: "CSE", completed: true },
  { code: "CSE 111", title: "Programming with Functions", credits: 2, prefix: "CSE", completed: false },
  { code: "CSE 210", title: "Programming with Classes", credits: 3, prefix: "CSE", completed: false }
];

// DOM refs
const cards = document.getElementById('course-cards');
const creditsOut = document.getElementById('credits');
const filterButtons = document.querySelectorAll('.filters .btn');

// render helpers
function courseCard(c) {
  return `
    <div class="card ${c.completed ? 'completed' : ''}">
      <h3>${c.code}</h3>
      <p>${c.title}</p>
      <p><span class="badge">${c.prefix}</span> • ${c.credits} credit${c.credits>1?'s':''}</p>
    </div>`;
}

function render(list) {
  if (!cards) return;
  cards.innerHTML = list.map(courseCard).join('');
  const total = list.reduce((sum, c) => sum + c.credits, 0);  // reduce()
  if (creditsOut) creditsOut.textContent = `The total credits for courses listed above is ${total}`;
}

// filter logic
function applyFilter(key) {
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === key));
  if (key === 'WDD') return render(courses.filter(c => c.prefix === 'WDD'));
  if (key === 'CSE') return render(courses.filter(c => c.prefix === 'CSE'));
  return render(courses); // all
}

// init
render(courses);
filterButtons.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));