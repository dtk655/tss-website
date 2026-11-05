// Site-wide contact and integration settings.
export const PHONE = '908-561-4800';
export const PHONE_TEL = 'tel:+19085614800';
export const EMAIL = 'info@trafficsafetyservice.com';
export const ADDRESS = 'South Plainfield, NJ';
export const FOUNDED = 1971;
export const YEARS = new Date().getFullYear() - FOUNDED;

// n8n webhook that receives every quote/contact form submission as JSON POST.
// Set after the intake workflow is published; empty string = forms fall back to a mailto link.
export const FORM_WEBHOOK = 'https://dylan-tss.app.n8n.cloud/webhook/tss-site-quote';

export const LOGO = 'https://cdn.shopify.com/s/files/1/0587/7701/0241/files/TSS_LOGO_2000_x_250_px_2.svg';
export const WATERCADE_LOGO = 'https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SHOPIFY_DESKTOP_LOGO_3.svg';
