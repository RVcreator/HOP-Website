'use strict';
window.HopGifts = {
  amount(mode, children) {
    return (mode === 'annual' ? [1440, 2880, 4320] : [120, 240, 360])[children - 1];
  },
  read(params) {
    const mode = params.get('mode');
    if (mode === 'once') {
      const raw = params.get('amount') || '';
      const amount = Number(raw);
      const purpose = params.get('purpose');
      const purposes = ['Where most needed', 'Everyday care', 'Meals', 'Education', 'Health and wellbeing'];
      if (!/^\d+(?:\.\d{1,2})?$/.test(raw) || !Number.isSafeInteger(Math.round(amount * 100)) || amount < 1 || !purposes.includes(purpose)) return null;
      return {mode, amount, purpose};
    }
    const children = Number(params.get('children'));
    if (!['sponsor', 'annual'].includes(mode) || ![1, 2, 3].includes(children)) return null;
    return {mode, children, amount:this.amount(mode, children), purpose:'Child sponsorship'};
  }
};
