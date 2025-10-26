// sttStorage.js

// Provider IDs (safe to persist)
export const STT_PROVIDERS = {
  openai: 'openai',
  soniox: 'soniox',
  assembly: 'assembly',
};

// Selected provider (not a secret → localStorage is fine)
const KEY_PROVIDER = 'stt_provider';
export function getProvider() {
  return localStorage.getItem(KEY_PROVIDER) || STT_PROVIDERS.openai;
}
export function setProvider(p) {
  localStorage.setItem(KEY_PROVIDER, p);
}

// -------- Secrets: sessionStorage ONLY --------
export function setProviderKey(provider, key) {
  if (!provider) return;
  const k = 'stt_key_' + provider;
  if (key) sessionStorage.setItem(k, key);
  else     sessionStorage.removeItem(k);
}

export function getProviderKey(provider) {
  const k = 'stt_key_' + provider;
  return sessionStorage.getItem(k) || '';
}

// Canonical OpenAI key for note generation (sessionStorage only)
export function setOpenAIKey(key) {
  const K = 'openai_api_key';
  if (key) sessionStorage.setItem(K, key);
  else     sessionStorage.removeItem(K);
}
export function getOpenAIKey() {
  return sessionStorage.getItem('openai_api_key') || '';
}

// Optional helper you can call once to purge any legacy localStorage secrets
export function purgeLocalSecretCopies() {
  ['openai_api_key','stt_key_openai','stt_key_soniox','stt_key_assembly','user_api_key']
    .forEach(k => localStorage.removeItem(k));
}
