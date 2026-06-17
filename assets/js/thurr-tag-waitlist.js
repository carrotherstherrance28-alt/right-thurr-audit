const form = document.querySelector('[data-thurr-tag-form]');
const interestType = document.querySelector('[data-interest-type]');
const quantityRange = document.querySelector('[data-quantity-range]');
const quantityField = document.querySelector('[data-quantity-field]');
const companyField = document.querySelector('[data-company-field]');
const statusNode = document.querySelector('[data-form-status]');
const searchParams = new URLSearchParams(window.location.search);

function setStatus(type, message) {
  if (!statusNode) {
    return;
  }

  statusNode.textContent = message;
  statusNode.classList.remove('is-success', 'is-error');

  if (type) {
    statusNode.classList.add(`is-${type}`);
  }
}

function isCorporateSelection() {
  return interestType?.value === 'Corporate Gifting';
}

function updateCorporateFields() {
  const isCorporate = isCorporateSelection();

  if (companyField) {
    companyField.hidden = !isCorporate;
  }

  if (quantityField) {
    quantityField.hidden = !isCorporate;
  }

  if (isCorporate && quantityRange?.value === '1') {
    quantityRange.value = '25+';
  }

  if (!isCorporate && quantityRange) {
    quantityRange.value = '1';
  }
}

function getTrackingValue(name, fallback = '') {
  return String(searchParams.get(name) || fallback || '').trim();
}

function getFormPayload() {
  const data = new FormData(form);
  const selectedInterest = String(data.get('interest_type') || 'Founders Edition');
  const utmSource = getTrackingValue('utm_source');

  return {
    name: String(data.get('name') || '').trim(),
    email: String(data.get('email') || '').trim(),
    phone: String(data.get('phone') || '').trim(),
    sms_opt_in: data.get('sms_opt_in') === 'on',
    interest_type: selectedInterest,
    founder_interest:
      selectedInterest === 'Founders Edition' ||
      selectedInterest === 'Personalized' ||
      selectedInterest === 'Personalized Founders Edition',
    personalized_interest:
      selectedInterest === 'Personalized' || selectedInterest === 'Personalized Founders Edition',
    sticker_interest: selectedInterest === 'Sticker Pack',
    corporate_interest: selectedInterest === 'Corporate Gifting',
    company: String(data.get('company') || '').trim(),
    quantity_range: String(data.get('quantity_range') || '1'),
    notes: '',
    company_website: String(data.get('company_website') || '').trim(),
    source: getTrackingValue('source', utmSource || 'thurr-tag-page'),
    utm_source: utmSource,
    utm_medium: getTrackingValue('utm_medium'),
    utm_campaign: getTrackingValue('utm_campaign'),
    utm_content: getTrackingValue('utm_content'),
    audience_segment: getTrackingValue('segment'),
    outreach_type: getTrackingValue('outreach'),
    page_path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer,
    submitted_at: new Date().toISOString(),
  };
}

interestType?.addEventListener('change', updateCorporateFields);
updateCorporateFields();

document.querySelector('[data-corporate-cta]')?.addEventListener('click', () => {
  window.setTimeout(() => {
    if (!interestType) {
      return;
    }

    interestType.value = 'Corporate Gifting';
    updateCorporateFields();
  }, 0);
});

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  setStatus(null, 'Saving your spot...');

  try {
    const response = await fetch('/api/thurr-tag-waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getFormPayload()),
    });
    const contentType = response.headers.get('content-type') || '';
    const result = contentType.includes('application/json') ? await response.json() : {};

    if (!response.ok) {
      throw new Error(result.message || 'The Founders List could not be saved yet.');
    }

    form.reset();
    updateCorporateFields();
    setStatus(
      'success',
      result.message ||
        'You are on the Founders List. Series 001 moves when the validation gate hits.',
    );
  } catch (error) {
    setStatus('error', error?.message || 'The Founders List could not be saved yet.');
  } finally {
    submitButton.disabled = false;
  }
});
