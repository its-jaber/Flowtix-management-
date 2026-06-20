var SUPABASE_URL = 'https://ljcemqorwvgasnhbetja.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqY2VtcW9yd3ZnYXNuaGJldGphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MjQ1ODUsImV4cCI6MjA5NjUwMDU4NX0.zxfmWAt1uN9FfVcSCABPR7eumonbQ4AbKX9xBJk6pmg';
var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Run once on every page load — shows a banner if the project is paused/unreachable
async function checkConnection() {
  try {
    const { error } = await supabase.from('clients').select('id').limit(1);
    if (error) throw error;
  } catch (e) {
    const banner = document.createElement('div');
    banner.id = 'conn-banner';
    banner.style.cssText = [
      'position:fixed;top:0;left:0;right:0;z-index:9999',
      'background:#7f1d1d;color:#fff;padding:10px 18px',
      'font-size:13px;font-family:Inter,sans-serif',
      'display:flex;align-items:center;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,.3)'
    ].join(';');
    banner.innerHTML = `
      <strong>⚠ Database unavailable:</strong>
      <span>${e.message || 'Cannot reach Supabase — the project may be paused. Refresh in a moment.'}</span>
      <button onclick="this.parentElement.remove()" style="margin-left:auto;background:rgba(255,255,255,.2);border:none;color:#fff;padding:4px 12px;border-radius:4px;cursor:pointer;font-size:12px;">Dismiss</button>
    `;
    document.body.prepend(banner);
  }
}
