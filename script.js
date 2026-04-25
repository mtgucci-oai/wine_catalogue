const catalogue = document.getElementById('catalogue');
const template = document.getElementById('wine-card-template');

function setStatus(message) {
  catalogue.innerHTML = `<p class="status">${message}</p>`;
}

function createWineCard(wine) {
  const fragment = template.content.cloneNode(true);
  const title = fragment.querySelector('.wine-title');
  const meta = fragment.querySelector('.wine-meta');

  title.textContent = wine.wineName;
  meta.textContent = `${wine.vintage} • ${wine.region}, ${wine.country}`;

  const fields = [
    'producer',
    'country',
    'region',
    'grapeVarieties',
    'style',
    'tastingNotes',
    'foodPairing',
    'servingOrder'
  ];

  fields.forEach((field) => {
    const target = fragment.querySelector(`[data-field="${field}"]`);
    if (target) {
      target.textContent = wine[field];
    }
  });

  return fragment;
}

async function loadCatalogue() {
  try {
    setStatus('Loading wines...');

    const response = await fetch('wines.json');
    if (!response.ok) {
      throw new Error(`Failed to load wines.json (${response.status})`);
    }

    const wines = await response.json();
    catalogue.innerHTML = '';

    wines
      .sort((a, b) => a.servingOrder - b.servingOrder)
      .forEach((wine) => catalogue.appendChild(createWineCard(wine)));
  } catch (error) {
    console.error(error);
    setStatus('Unable to load wine catalogue. Please try again later.');
  }
}

loadCatalogue();
