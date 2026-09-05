/**
 * Nurshah Global Trade Portal - Main JavaScript Controller
 * Handles interactive pricing, live ticker, modals, mobile navigation,
 * shipment tracking, catalog search/filter, and listing persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initMarketTicker();
  initLiveShipmentTracker();
  initEstimateCalculator();
  initEstimateRequestModal();
  initCatalogFilters();
  initListingSubmission();
  initContactForm();
});

/* ==========================================================================
   1. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(title, message, type = 'gold') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast flex items-start gap-3';
  
  const iconName = type === 'success' ? 'check_circle' : type === 'info' ? 'info' : 'verified';
  const iconColor = type === 'success' ? 'text-green-400' : 'text-primary';

  toast.innerHTML = `
    <span class="material-symbols-outlined ${iconColor} text-2xl mt-0.5">${iconName}</span>
    <div class="flex-1">
      <div class="font-bold text-sm text-white">${title}</div>
      <div class="text-xs text-zinc-400 mt-0.5">${message}</div>
    </div>
    <button class="text-zinc-500 hover:text-white text-sm" onclick="this.parentElement.remove()">
      <span class="material-symbols-outlined text-sm">close</span>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.25s ease-in forwards';
    setTimeout(() => toast.remove(), 260);
  }, 4500);
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const menuButtons = document.querySelectorAll('[data-menu-toggle]');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerOverlay = document.getElementById('drawer-overlay');

  if (!mobileDrawer) return;

  const openDrawer = () => {
    mobileDrawer.classList.remove('translate-x-full');
    drawerOverlay?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.add('translate-x-full');
    drawerOverlay?.classList.add('hidden');
    document.body.style.overflow = '';
  };

  menuButtons.forEach(btn => btn.addEventListener('click', openDrawer));
  drawerClose?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

/* ==========================================================================
   3. COMMODITY BENCHMARK SPOT TICKER
   ========================================================================== */
const MARKET_FEEDS = [
  { symbol: 'LME COPPER', name: 'Grade A Cathodes', price: 9285.00, unit: 'MT', change: +1.42 },
  { symbol: 'FE 62% IRON ORE', name: 'CFR Qingdao', price: 118.50, unit: 'MT', change: +0.85 },
  { symbol: 'THERMAL COAL', name: 'GAR 5800 FOB', price: 114.80, unit: 'MT', change: -0.45 },
  { symbol: 'ALUMINUM P1020', name: 'LME Cash', price: 2420.00, unit: 'MT', change: +1.15 },
  { symbol: 'ROCK PHOSPHATE', name: 'DAP High Purity', price: 585.00, unit: 'MT', change: +0.30 },
  { symbol: 'COTTON YARN 30s', name: 'Combed Weaving', price: 3450.00, unit: 'MT', change: +0.20 },
  { symbol: 'HMS 1&2 SCRAP', name: 'CFR Turkey', price: 382.00, unit: 'MT', change: -0.80 },
  { symbol: 'GOLD BULLION', name: 'Physical 999.9', price: 2512.40, unit: 'oz', change: +0.65 },
  { symbol: 'BRENT CRUDE', name: 'Spot Physical', price: 74.80, unit: 'bbl', change: -0.25 }
];

function initMarketTicker() {
  const tickerTrack = document.getElementById('ticker-track');
  if (!tickerTrack) return;

  const renderItems = () => {
    let html = '';
    MARKET_FEEDS.forEach(item => {
      const isUp = item.change >= 0;
      const changeClass = isUp ? 'text-green-400' : 'text-red-400';
      const changeArrow = isUp ? '▲' : '▼';
      const changeSign = isUp ? '+' : '';

      html += `
        <div class="inline-flex items-center gap-2 px-6 py-1 border-r border-zinc-800/80 text-xs font-mono tracking-tight">
          <span class="font-bold text-amber-400/90">${item.symbol}</span>
          <span class="text-zinc-300">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <span class="text-zinc-500 text-[10px]">/${item.unit}</span>
          <span class="${changeClass} font-semibold text-[11px]">${changeArrow} ${changeSign}${item.change.toFixed(2)}%</span>
        </div>
      `;
    });
    return html;
  };

  // Render twice for continuous loop
  tickerTrack.innerHTML = renderItems() + renderItems();

  // Subtle live price jitter every 6 seconds for authentic financial feel
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * MARKET_FEEDS.length);
    const delta = (Math.random() - 0.49) * 0.35;
    MARKET_FEEDS[randomIndex].price = Math.max(1, MARKET_FEEDS[randomIndex].price * (1 + delta / 100));
    MARKET_FEEDS[randomIndex].change += delta;
    tickerTrack.innerHTML = renderItems() + renderItems();
  }, 6000);
}

/* ==========================================================================
   4. DYNAMIC RATE ESTIMATOR ENGINE (estimate.html)
   ========================================================================== */
const COMMODITY_PRICING = {
  'copper': { name: 'Raw Copper Cathodes (Grade A)', basePrice: 9285.00, defaultMoq: 500, unit: 'MT' },
  'iron_ore': { name: 'Iron Ore (62% Fe Fine)', basePrice: 118.50, defaultMoq: 10000, unit: 'MT' },
  'coal': { name: 'Industrial Thermal Coal (GAR 5800)', basePrice: 115.00, defaultMoq: 5000, unit: 'MT' },
  'aluminum': { name: 'Aluminum Ingots (P1020)', basePrice: 2420.00, defaultMoq: 300, unit: 'MT' },
  'scrap': { name: 'Metal Scrap (HMS 1&2)', basePrice: 382.00, defaultMoq: 1000, unit: 'MT' },
  'cotton_yarn': { name: 'Cotton Yarn (30s Combed)', basePrice: 3450.00, defaultMoq: 200, unit: 'MT' },
  'phosphate': { name: 'High-Grade Rock Phosphate', basePrice: 585.00, defaultMoq: 2000, unit: 'MT' },
  'solar_panels': { name: 'Solar Panels (550W Monocrystalline)', basePrice: 180.00, defaultMoq: 500, unit: 'Unit' },
  'wind_turbines': { name: 'Wind Turbine Nacelles (3.5MW)', basePrice: 850000.00, defaultMoq: 2, unit: 'Unit' }
};

const PORT_FREIGHT_RATES = {
  'rotterdam': { name: 'Port of Rotterdam (Europe)', ratePerMt: 45.00 },
  'qingdao': { name: 'Port of Qingdao (East Asia)', ratePerMt: 38.00 },
  'singapore': { name: 'Port of Singapore (SE Asia)', ratePerMt: 32.00 },
  'houston': { name: 'Port of Houston (Americas)', ratePerMt: 52.00 },
  'hamburg': { name: 'Port of Hamburg (Europe)', ratePerMt: 46.00 },
  'jebel_ali': { name: 'Port of Jebel Ali (Middle East)', ratePerMt: 28.00 }
};

function initEstimateCalculator() {
  const productSelect = document.getElementById('calc-product');
  const volumeInput = document.getElementById('calc-volume');
  const portSelect = document.getElementById('calc-port');
  const incotermSelect = document.getElementById('calc-incoterm');
  const updateBtn = document.getElementById('calc-update-btn');

  if (!productSelect || !volumeInput) return;

  const calculate = () => {
    const productKey = productSelect.value || 'copper';
    const product = COMMODITY_PRICING[productKey] || COMMODITY_PRICING['copper'];
    const volume = Math.max(1, parseFloat(volumeInput.value) || product.defaultMoq);
    const portKey = portSelect ? portSelect.value : 'rotterdam';
    const port = PORT_FREIGHT_RATES[portKey] || PORT_FREIGHT_RATES['rotterdam'];
    const incoterm = incotermSelect ? incotermSelect.value : 'cif';

    // Base material value
    const baseUnitRate = product.basePrice;
    
    // Freight addition
    let freightUnit = 0;
    if (incoterm === 'cif' || incoterm === 'cfr') {
      freightUnit = (product.unit === 'MT') ? port.ratePerMt : (port.ratePerMt * 0.15);
    }
    
    // Marine Insurance for CIF
    let insuranceUnit = (incoterm === 'cif') ? (baseUnitRate * 0.0035) : 0;

    // Brokerage fee: exactly 5%
    const subtotalUnit = baseUnitRate + freightUnit + insuranceUnit;
    const brokerageMarginUnit = subtotalUnit * 0.05;
    const finalUnitRate = subtotalUnit + brokerageMarginUnit;
    const totalContractValue = finalUnitRate * volume;

    // DOM Elements update
    const unitRateElem = document.getElementById('calc-unit-rate');
    const totalValueElem = document.getElementById('calc-total-value');
    const basePriceElem = document.getElementById('calc-base-price');
    const freightElem = document.getElementById('calc-freight');
    const marginElem = document.getElementById('calc-margin');
    const unitLabelElem = document.getElementById('calc-unit-label');

    if (unitRateElem) unitRateElem.textContent = finalUnitRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (totalValueElem) totalValueElem.textContent = '$' + totalContractValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (basePriceElem) basePriceElem.textContent = '$' + baseUnitRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (freightElem) freightElem.textContent = '$' + (freightUnit + insuranceUnit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (marginElem) marginElem.textContent = '$' + brokerageMarginUnit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (unitLabelElem) unitLabelElem.textContent = `/ ${product.unit}`;

    // Highlight animation
    const rateBox = document.getElementById('calc-rate-box');
    if (rateBox) {
      rateBox.classList.add('ring-2', 'ring-primary/50');
      setTimeout(() => rateBox.classList.remove('ring-2', 'ring-primary/50'), 400);
    }
  };

  productSelect.addEventListener('change', () => {
    const selected = COMMODITY_PRICING[productSelect.value];
    if (selected && (!volumeInput.value || volumeInput.value == 5000)) {
      volumeInput.value = selected.defaultMoq;
    }
    calculate();
  });

  volumeInput.addEventListener('input', calculate);
  if (portSelect) portSelect.addEventListener('change', calculate);
  if (incotermSelect) incotermSelect.addEventListener('change', calculate);
  if (updateBtn) updateBtn.addEventListener('click', () => {
    calculate();
    showToast('Estimate Recalculated', 'Pricing updated with latest spot quotes and freight indices.', 'info');
  });

  // Initial run
  calculate();
}

/* ==========================================================================
   5. ESTIMATE REQUEST MODAL (Matches image.png reference form)
   ========================================================================== */
function initEstimateRequestModal() {
  const modal = document.getElementById('estimate-modal');
  if (!modal) return;

  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalForm = document.getElementById('estimate-modal-form');
  const triggerButtons = document.querySelectorAll('[data-request-estimate]');

  const openModal = (productName = 'Iron Ore', defaultMoq = '') => {
    const productInput = document.getElementById('modal-product');
    const volumeInput = document.getElementById('modal-volume');
    if (productInput) productInput.value = productName;
    if (volumeInput && defaultMoq) volumeInput.value = defaultMoq;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product') || 'Grade A Copper Cathodes';
      const moq = btn.getAttribute('data-moq') || '500';
      openModal(product, moq);
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('modal-name')?.value || 'Client';
    const email = document.getElementById('modal-email')?.value || '';
    const product = document.getElementById('modal-product')?.value || '';
    const volume = document.getElementById('modal-volume')?.value || '';
    const port = document.getElementById('modal-port')?.value || '';

    const rfqId = 'RFQ-NS-' + Math.floor(1000 + Math.random() * 9000);

    // Save RFQ to localStorage
    const existingRfqs = JSON.parse(localStorage.getItem('nurshah_rfqs') || '[]');
    existingRfqs.unshift({
      id: rfqId,
      name: fullName,
      email,
      product,
      volume,
      port,
      date: new Date().toISOString()
    });
    localStorage.setItem('nurshah_rfqs', JSON.stringify(existingRfqs));

    closeModal();
    modalForm.reset();

    showToast(
      'Estimate Request Dispatched',
      `Reference #${rfqId} generated. A Nurshah broker will respond to ${email || 'your email'} within 4 business hours.`,
      'success'
    );
  });
}

/* ==========================================================================
   6. LIVE SHIPMENT TRACKER & MODAL
   ========================================================================== */
const SHIPMENT_DATABASE = {
  'NS-9942': {
    id: 'NS-9942',
    commodity: 'Grade A Copper Cathodes (99.99%)',
    volume: '2,500 MT',
    vessel: 'M/V Pacific Sovereign',
    imo: '9482716',
    flag: 'Panama (PA)',
    origin: 'Kolwezi / Durban (DRC/ZA)',
    destination: 'Port of Rotterdam (NL)',
    status: 'In Ocean Transit (Atlantic)',
    progress: 68,
    eta: 'September 12, 2026',
    lastPing: '22 mins ago (AIS Satellite)',
    coordinates: '18°24\'N, 28°12\'W',
    inspection: 'SGS Mineral Report #SGS-LU-88912 Verified',
    milestones: [
      { name: 'Mine Extraction & Smelting', date: 'Aug 14, 2026', done: true },
      { name: 'Port Loading (Durban Berth 4)', date: 'Aug 22, 2026', done: true },
      { name: 'Cape of Good Hope Passage', date: 'Aug 29, 2026', done: true },
      { name: 'Atlantic Corridor Transit', date: 'Current Position', done: true, active: true },
      { name: 'Customs & Discharging (Rotterdam)', date: 'Est. Sep 12, 2026', done: false }
    ]
  },
  'NS-8820': {
    id: 'NS-8820',
    commodity: '62% Fe Fine Iron Ore',
    volume: '50,000 MT',
    vessel: 'M/V Iron Prosperity',
    imo: '9631482',
    flag: 'Liberia (LR)',
    origin: 'Port Hedland (Australia)',
    destination: 'Port of Qingdao (China)',
    status: 'Customs Cleared / Discharging',
    progress: 95,
    eta: 'September 6, 2026',
    lastPing: '5 mins ago',
    coordinates: '36°04\'N, 120°19\'E',
    inspection: 'Bureau Veritas Cert #BV-9921 Approved',
    milestones: [
      { name: 'Extraction Pilbara Basin', date: 'Aug 10, 2026', done: true },
      { name: 'Port Hedland Bulk Loader', date: 'Aug 18, 2026', done: true },
      { name: 'Lombok Strait Transit', date: 'Aug 24, 2026', done: true },
      { name: 'Yellow Sea Approach', date: 'Sep 02, 2026', done: true },
      { name: 'Berth Discharge Qingdao', date: 'In Progress', done: true, active: true }
    ]
  },
  'NS-7731': {
    id: 'NS-7731',
    commodity: 'Thermal Coal (GAR 5800)',
    volume: '20,000 MT',
    vessel: 'M/V Kalimantan Star',
    imo: '9552109',
    flag: 'Singapore (SG)',
    origin: 'Samarinda (Indonesia)',
    destination: 'Port of Jebel Ali (UAE)',
    status: 'Loading at Terminal',
    progress: 25,
    eta: 'September 20, 2026',
    lastPing: '1 hour ago',
    coordinates: '0°30\'S, 117°09\'E',
    inspection: 'CCIC Quality Assured #CCIC-ID-440',
    milestones: [
      { name: 'Stockpile Blending', date: 'Aug 28, 2026', done: true },
      { name: 'Barge Conveyor Loading', date: 'Sep 04, 2026', done: true, active: true },
      { name: 'Malacca Strait Transit', date: 'Est. Sep 08, 2026', done: false },
      { name: 'Arabian Sea Crossing', date: 'Est. Sep 15, 2026', done: false },
      { name: 'Jebel Ali Discharge', date: 'Est. Sep 20, 2026', done: false }
    ]
  }
};

function initLiveShipmentTracker() {
  const trackerModal = document.getElementById('tracker-modal');
  const trackerInput = document.getElementById('tracker-code-input');
  const trackerBtn = document.getElementById('tracker-search-btn');
  const triggerElements = document.querySelectorAll('[data-track-shipment]');

  const openTracker = (shipmentId = 'NS-9942') => {
    const data = SHIPMENT_DATABASE[shipmentId] || SHIPMENT_DATABASE['NS-9942'];
    if (!trackerModal) {
      alert(`Shipment ${data.id} - ${data.commodity}\nVessel: ${data.vessel}\nStatus: ${data.status}\nETA: ${data.eta}`);
      return;
    }

    // Populate modal
    document.getElementById('trk-id').textContent = data.id;
    document.getElementById('trk-commodity').textContent = data.commodity;
    document.getElementById('trk-volume').textContent = data.volume;
    document.getElementById('trk-vessel').textContent = `${data.vessel} (IMO: ${data.imo})`;
    document.getElementById('trk-route').textContent = `${data.origin} → ${data.destination}`;
    document.getElementById('trk-status').textContent = data.status;
    document.getElementById('trk-eta').textContent = data.eta;
    document.getElementById('trk-coords').textContent = data.coordinates;
    document.getElementById('trk-ping').textContent = data.lastPing;
    document.getElementById('trk-cert').textContent = data.inspection;

    const progressBar = document.getElementById('trk-progress-bar');
    if (progressBar) progressBar.style.width = `${data.progress}%`;

    // Render Milestones
    const milestonesContainer = document.getElementById('trk-milestones');
    if (milestonesContainer) {
      milestonesContainer.innerHTML = data.milestones.map((m, idx) => `
        <div class="flex items-start gap-3 relative pb-5 last:pb-0">
          ${idx < data.milestones.length - 1 ? '<div class="absolute left-2.5 top-6 bottom-0 w-0.5 bg-zinc-800"></div>' : ''}
          <div class="w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5 ${m.active ? 'bg-primary ring-4 ring-primary/20 text-on-primary font-bold' : m.done ? 'bg-amber-500/80 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-600'}">
            ${m.done ? '✓' : '•'}
          </div>
          <div>
            <p class="text-sm font-semibold ${m.active ? 'text-primary' : m.done ? 'text-zinc-200' : 'text-zinc-500'}">${m.name}</p>
            <p class="text-xs text-zinc-500">${m.date}</p>
          </div>
        </div>
      `).join('');
    }

    trackerModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeTracker = () => {
    if (!trackerModal) return;
    trackerModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  triggerElements.forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const code = elem.getAttribute('data-shipment-id') || 'NS-9942';
      openTracker(code);
    });
  });

  trackerBtn?.addEventListener('click', () => {
    const code = (trackerInput?.value || '').trim().toUpperCase();
    if (code) {
      openTracker(code);
    } else {
      openTracker('NS-9942');
    }
  });

  trackerInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const code = trackerInput.value.trim().toUpperCase();
      openTracker(code || 'NS-9942');
    }
  });

  document.getElementById('tracker-modal-close')?.addEventListener('click', closeTracker);
  document.getElementById('tracker-modal-overlay')?.addEventListener('click', closeTracker);
}

/* ==========================================================================
   7. PRODUCT CATALOG SEARCH & CATEGORY FILTERS (products.html)
   ========================================================================== */
function initCatalogFilters() {
  const searchInput = document.getElementById('catalog-search');
  const filterButtons = document.querySelectorAll('[data-category-filter]');
  const productCards = document.querySelectorAll('[data-product-card]');
  const countBadge = document.getElementById('catalog-count');

  if (!productCards.length) return;

  let currentCategory = 'all';
  let currentQuery = '';

  const applyFilters = () => {
    let visibleCount = 0;

    productCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const desc = (card.querySelector('p')?.textContent || '').toLowerCase();

      const matchesCategory = (currentCategory === 'all' || category === currentCategory);
      const matchesQuery = !currentQuery || name.includes(currentQuery) || desc.includes(currentQuery);

      if (matchesCategory && matchesQuery) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countBadge) countBadge.textContent = `${visibleCount} commodities displayed`;
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'border-primary');
        b.classList.add('bg-surface-container', 'text-zinc-400', 'border-white/5');
      });

      btn.classList.add('bg-primary', 'text-on-primary', 'border-primary');
      btn.classList.remove('bg-surface-container', 'text-zinc-400', 'border-white/5');

      currentCategory = btn.getAttribute('data-category-filter') || 'all';
      applyFilters();
    });
  });

  searchInput?.addEventListener('input', (e) => {
    currentQuery = e.target.value.trim().toLowerCase();
    applyFilters();
  });
}

/* ==========================================================================
   8. SUPPLIER LISTING SUBMISSION & LOCALSTORAGE (estimate.html)
   ========================================================================== */
function initListingSubmission() {
  const form = document.getElementById('supplier-listing-form');
  const submissionsContainer = document.getElementById('active-submissions-list');

  if (!form) return;

  const renderSavedListings = () => {
    if (!submissionsContainer) return;
    const listings = JSON.parse(localStorage.getItem('nurshah_supplier_listings') || '[]');

    if (!listings.length) {
      submissionsContainer.innerHTML = `
        <div class="text-center py-12 text-zinc-500 text-sm">
          No custom supplier listings submitted yet. Fill out the form above to list your raw commodities for global brokerage.
        </div>
      `;
      return;
    }

    submissionsContainer.innerHTML = listings.map(l => `
      <div class="p-6 bg-surface-container-high rounded-xl border border-white/5 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <span class="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">${l.id}</span>
            <span class="text-xs font-bold text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">${l.status}</span>
            <span class="text-xs text-zinc-500">${new Date(l.createdAt).toLocaleDateString()}</span>
          </div>
          <h4 class="font-bold text-white text-base">${l.materialName}</h4>
          <p class="text-xs text-zinc-400 mt-1">${l.volume} MT • Destination: ${l.port} • Origin: ${l.company}</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-zinc-400">Assigned Broker: <strong class="text-zinc-200">Muhammad H. Ali</strong></span>
          <button class="text-xs text-primary hover:underline" onclick="showToast('Broker Notified', 'Broker desk alerted for listing ${l.id}', 'info')">
            Check Status
          </button>
        </div>
      </div>
    `).join('');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value || 'Commodity Supplier';
    const email = form.querySelector('[name="email"]')?.value || 'supplier@trade.com';
    const company = form.querySelector('[name="company"]')?.value || 'Enterprise Ltd';
    const materialName = form.querySelector('[name="product"]')?.value || 'Industrial Commodity';
    const volume = form.querySelector('[name="volume"]')?.value || '1000';
    const port = form.querySelector('[name="port"]')?.value || 'Rotterdam';

    const listingId = 'LST-' + Math.floor(10000 + Math.random() * 90000);

    const newListing = {
      id: listingId,
      name,
      email,
      company,
      materialName,
      volume,
      port,
      status: 'Broker Verification',
      createdAt: new Date().toISOString()
    };

    const currentListings = JSON.parse(localStorage.getItem('nurshah_supplier_listings') || '[]');
    currentListings.unshift(newListing);
    localStorage.setItem('nurshah_supplier_listings', JSON.stringify(currentListings));

    form.reset();
    renderSavedListings();

    showToast(
      'Commodity Listed Successfully',
      `Listing ID #${listingId} registered. Escrow & verification protocols initiated.`,
      'success'
    );
  });

  renderSavedListings();
}

/* ==========================================================================
   9. CONTACT FORM HANDLER (contact.html)
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('general-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]')?.value || 'Valued Partner';
    const category = contactForm.querySelector('[name="service"]')?.value || 'General Brokerage';

    showToast(
      'Inquiry Dispatched to Executive Desk',
      `Thank you, ${name}. Your correspondence regarding ${category} has been routed to our Trade Directors.`,
      'success'
    );

    contactForm.reset();
  });
}
