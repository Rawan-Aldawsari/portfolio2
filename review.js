const reviewForm = document.querySelector('#reviewForm');
const results = document.querySelector('#results');
const resultsGrid = document.querySelector('#resultsGrid');
const resultTitle = document.querySelector('#resultTitle');
const resultCount = document.querySelector('#resultCount');
const status = document.querySelector('#status');

const reviews = [
  { area: 'Responsive Design', priority: 'High', text: 'Check mobile layouts for overflow, readable text, comfortable buttons, and navigation that remains easy to use.' },
  { area: 'Accessibility', priority: 'Medium', text: 'Check semantic HTML, meaningful labels, keyboard focus, image alternatives, and sufficient text contrast.' },
  { area: 'Typography', priority: 'Medium', text: 'Keep a clear heading hierarchy, readable font sizes, consistent line height, and comfortable text spacing.' },
  { area: 'Spacing & Layout', priority: 'Low', text: 'Use consistent section spacing, alignment, padding, and visual balance across cards and content blocks.' },
  { area: 'Usability', priority: 'Medium', text: 'Make navigation, calls to action, buttons, and user feedback clear and consistent.' },
  { area: 'Visual Consistency', priority: 'Low', text: 'Keep colors, buttons, cards, borders, shadows, typography, and spacing visually consistent.' }
];

const focusMap = {
  all: () => reviews,
  responsive: () => reviews.filter(item => item.area === 'Responsive Design'),
  accessibility: () => reviews.filter(item => item.area === 'Accessibility'),
  usability: () => reviews.filter(item => ['Usability', 'Visual Consistency'].includes(item.area))
};

reviewForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#projectName').value.trim();
  const focus = document.querySelector('#focus').value;
  const selected = focusMap[focus]();

  status.textContent = 'Reviewed';
  resultTitle.textContent = `${name} — UI Review`;
  resultCount.textContent = `${selected.length} finding${selected.length === 1 ? '' : 's'}`;
  resultsGrid.innerHTML = selected.map(item => `
    <article class="result-item">
      <div class="result-top">
        <span class="result-area">${item.area}</span>
        <span class="priority ${item.priority.toLowerCase()}">${item.priority}</span>
      </div>
      <p>${item.text}</p>
    </article>
  `).join('');

  results.hidden = false;
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
