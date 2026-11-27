'use strict';
const get = id => document.getElementById(id);
const gift = HopGifts.read(new URLSearchParams(location.search));
if (gift) {
  const annual = gift.mode === 'annual';
  const monthly = gift.mode === 'sponsor';
  const usd = new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',minimumFractionDigits:0,maximumFractionDigits:2});
  get('purpose').textContent = gift.purpose;
  get('children-row').hidden = !gift.children;
  get('children').textContent = gift.children || '';
  get('frequency').textContent = annual ? 'Annual' : monthly ? 'Monthly' : 'One time';
  get('total').textContent = usd.format(gift.amount) + (annual ? ' / year' : monthly ? ' / month' : '');
  if (annual) {
    get('payment-copy').textContent = 'Use the WIPAHS payment instructions to arrange your annual sponsorship. Include Haven of Peace annual sponsorship and the number of children as your payment reference.';
  } else {
    get('payment-copy').textContent = 'Continue to the WIPAHS checkout to enter your details and view payment options.';
    const purpose = 'Haven of Peace · ' + gift.purpose + (monthly ? ' (' + gift.children + (gift.children === 1 ? ' child)' : ' children)') : '');
    const params = new URLSearchParams({amount: String(gift.amount),currency:'USD',cause:purpose,frequency:monthly ? 'monthly' : 'once'});
    get('payment-link').href = 'https://wipahs.org/checkout.html?' + params;
  }
  get('invalid').hidden = true;
  get('checkout').hidden = false;
}
