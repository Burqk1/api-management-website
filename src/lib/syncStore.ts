/**
 * Web sync store — reads/writes the same Supabase `user_data` table as mobile.
 * Uses the same encryption functions for cross-device compatibility.
 * Stores: collections, endpoints, call_logs, environments, monitor, api_keys, settings
 */

import { supabase } from './supabase';
import { encryptSync, decryptSync } from './encryption';

// ==================== TYPES (matching mobile) ====================

export interface ApiCollection {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  baseUrl: string;
  parentId?: string;
  auth?: any;
  createdAt: number;
}

export interface ApiHeader {
  key: string;
  value: string;
  enabled: boolean;
}

export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  method: string;
  headers: ApiHeader[];
  body: string;
  bodyType?: string;
  formData?: any[];
  collectionId: string;
  assertions: any[];
  auth?: any;
  preRequestScript?: string;
  postRequestScript?: string;
  isGraphQL?: boolean;
  graphqlQuery?: string;
  graphqlVariables?: string;
  isFavorite?: boolean;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface ApiCallLog {
  id: string;
  endpointId: string;
  endpointName: string;
  collectionId: string;
  url: string;
  method: string;
  statusCode: number;
  responseTime: number;
  responseSize: number;
  success: boolean;
  timestamp: number;
  requestHeaders?: Record<string, string>;
  requestBody?: string;
  responseHeaders?: Record<string, string>;
  responseBody?: string;
}

export interface EnvVariable {
  key: string;
  value: string;
}

export interface Environment {
  id: string;
  name: string;
  color: string;
  variables: EnvVariable[];
  createdAt: number;
}

export interface MonitorCheck {
  id: string;
  endpointId: string;
  endpointName: string;
  url: string;
  method: string;
  interval: number;
  enabled: boolean;
  lastCheck?: number;
  lastStatus?: number;
  lastResponseTime?: number;
  isUp?: boolean;
  consecutiveFailures: number;
  history: MonitorPing[];
}

export interface MonitorPing {
  timestamp: number;
  statusCode: number;
  responseTime: number;
  success: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  service: string;
  createdAt: number;
}

export interface UserSettings {
  theme: 'system' | 'dark' | 'light';
  language: 'en' | 'tr';
  accentColor: string | null;
}

// ==================== STATE ====================

let _collections: ApiCollection[] = [];
let _endpoints: ApiEndpoint[] = [];
let _callLogs: ApiCallLog[] = [];
let _environments: Environment[] = [];
let _activeEnvId: string | null = null;
let _monitorChecks: MonitorCheck[] = [];
let _apiKeys: ApiKey[] = [];
let _settings: UserSettings = { theme: 'dark', language: 'en', accentColor: null };
let _listeners: (() => void)[] = [];
let _syncStatus: 'idle' | 'syncing' | 'success' | 'error' = 'idle';

function notify() { _listeners.forEach((fn) => fn()); }

export function onStoreChange(fn: () => void) {
  _listeners.push(fn);
  return () => { _listeners = _listeners.filter((l) => l !== fn); };
}

// ==================== GETTERS ====================

export function getCollections() { return _collections; }
export function getEndpoints() { return _endpoints; }
export function getCallLogs() { return _callLogs; }
export function getEnvironments() { return _environments; }
export function getActiveEnvId() { return _activeEnvId; }
export function getActiveEnv() { return _environments.find((e) => e.id === _activeEnvId) || null; }
export function getMonitorChecks() { return _monitorChecks; }
export function getApiKeys() { return _apiKeys; }
export function getSettings() { return _settings; }
export function getSyncStatus() { return _syncStatus; }

// Stats
export function getTotalCalls() { return _callLogs.length; }
export function getAvgResponseTime() {
  if (_callLogs.length === 0) return 0;
  return Math.round(_callLogs.reduce((s, l) => s + l.responseTime, 0) / _callLogs.length);
}
export function getSuccessRate() {
  if (_callLogs.length === 0) return 0;
  return Math.round((_callLogs.filter((l) => l.success).length / _callLogs.length) * 100);
}
export function getCallsToday() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return _callLogs.filter((l) => l.timestamp >= today.getTime()).length;
}
export function getUpCount() { return _monitorChecks.filter((c) => c.isUp === true).length; }
export function getDownCount() { return _monitorChecks.filter((c) => c.isUp === false).length; }

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ==================== COLLECTIONS ====================

export function addCollection(data: Omit<ApiCollection, 'id' | 'createdAt'>): ApiCollection {
  const col: ApiCollection = { ...data, id: generateId(), createdAt: Date.now() };
  _collections = [..._collections, col];
  persistLocal(); notify(); autoSync();
  return col;
}

export function updateCollection(id: string, data: Partial<ApiCollection>) {
  _collections = _collections.map((c) => c.id === id ? { ...c, ...data } : c);
  persistLocal(); notify(); autoSync();
}

export function deleteCollection(id: string) {
  _collections = _collections.filter((c) => c.id !== id);
  _endpoints = _endpoints.filter((e) => e.collectionId !== id);
  persistLocal(); notify(); autoSync();
}

// ==================== ENDPOINTS ====================

export function addEndpoint(data: Omit<ApiEndpoint, 'id' | 'createdAt' | 'updatedAt'>): ApiEndpoint {
  const ep: ApiEndpoint = { ...data, id: generateId(), createdAt: Date.now(), updatedAt: Date.now() };
  _endpoints = [..._endpoints, ep];
  persistLocal(); notify(); autoSync();
  return ep;
}

export function updateEndpoint(id: string, data: Partial<ApiEndpoint>) {
  _endpoints = _endpoints.map((e) => e.id === id ? { ...e, ...data, updatedAt: Date.now() } : e);
  persistLocal(); notify(); autoSync();
}

export function deleteEndpoint(id: string) {
  _endpoints = _endpoints.filter((e) => e.id !== id);
  persistLocal(); notify(); autoSync();
}

export function toggleFavorite(id: string) {
  _endpoints = _endpoints.map((e) => e.id === id ? { ...e, isFavorite: !e.isFavorite } : e);
  persistLocal(); notify(); autoSync();
}

// ==================== CALL LOGS ====================

export function addCallLog(log: Omit<ApiCallLog, 'id'>) {
  const entry: ApiCallLog = { ...log, id: generateId() };
  _callLogs = [entry, ..._callLogs].slice(0, 5000);
  persistLocal(); notify(); autoSync();
}

export function clearCallLogs() {
  _callLogs = [];
  persistLocal(); notify(); autoSync();
}

// ==================== ENVIRONMENTS ====================

export function addEnvironment(data: Omit<Environment, 'id' | 'createdAt'>) {
  const env: Environment = { ...data, id: generateId(), createdAt: Date.now() };
  _environments = [..._environments, env];
  persistLocal(); notify(); autoSync();
  return env;
}

export function updateEnvironment(id: string, data: Partial<Environment>) {
  _environments = _environments.map((e) => e.id === id ? { ...e, ...data } : e);
  persistLocal(); notify(); autoSync();
}

export function deleteEnvironment(id: string) {
  _environments = _environments.filter((e) => e.id !== id);
  if (_activeEnvId === id) _activeEnvId = null;
  persistLocal(); notify(); autoSync();
}

export function setActiveEnv(id: string | null) {
  _activeEnvId = id;
  localStorage.setItem('fl_active_env', JSON.stringify(id));
  notify();
}

export function resolveVariables(text: string): string {
  const env = getActiveEnv();
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (env) {
      const v = env.variables.find((v) => v.key === key);
      if (v) return v.value;
    }
    return match;
  });
}

// ==================== MONITOR ====================

export function addMonitorCheck(data: Omit<MonitorCheck, 'id' | 'consecutiveFailures' | 'history'>) {
  const check: MonitorCheck = { ...data, id: generateId(), consecutiveFailures: 0, history: [] };
  _monitorChecks = [..._monitorChecks, check];
  persistLocal(); notify(); autoSync();
  return check;
}

export function removeMonitorCheck(id: string) {
  _monitorChecks = _monitorChecks.filter((c) => c.id !== id);
  persistLocal(); notify(); autoSync();
}

export function addMonitorPing(checkId: string, ping: MonitorPing) {
  _monitorChecks = _monitorChecks.map((c) => {
    if (c.id !== checkId) return c;
    const history = [ping, ...c.history].slice(0, 50);
    return {
      ...c,
      history,
      lastCheck: ping.timestamp,
      lastStatus: ping.statusCode,
      lastResponseTime: ping.responseTime,
      isUp: ping.success,
      consecutiveFailures: ping.success ? 0 : c.consecutiveFailures + 1,
    };
  });
  persistLocal(); notify(); autoSync();
}

// ==================== API KEYS ====================

export function addApiKey(data: Omit<ApiKey, 'id' | 'createdAt'>) {
  const key: ApiKey = { ...data, id: generateId(), createdAt: Date.now() };
  _apiKeys = [..._apiKeys, key];
  persistLocal(); notify(); autoSync();
  return key;
}

export function deleteApiKey(id: string) {
  _apiKeys = _apiKeys.filter((k) => k.id !== id);
  persistLocal(); notify(); autoSync();
}

// ==================== SETTINGS ====================

export function updateSettings(data: Partial<UserSettings>) {
  _settings = { ..._settings, ...data };
  localStorage.setItem('fl_settings', JSON.stringify(_settings));
  localStorage.setItem('fl_settings_dirty', '1');
  notify(); autoSync();
}

// ==================== LOCAL PERSISTENCE ====================

function persistLocal() {
  try {
    localStorage.setItem('fl_collections', JSON.stringify(_collections));
    localStorage.setItem('fl_endpoints', JSON.stringify(_endpoints));
    localStorage.setItem('fl_call_logs', JSON.stringify(_callLogs));
    localStorage.setItem('fl_environments', JSON.stringify(_environments));
    localStorage.setItem('fl_active_env', JSON.stringify(_activeEnvId));
    localStorage.setItem('fl_monitor', JSON.stringify(_monitorChecks));
    localStorage.setItem('fl_api_keys', JSON.stringify(_apiKeys));
    // Settings is NOT persisted here — only via updateSettings() to prevent cloud overwrite
  } catch {}
}

export function loadLocal() {
  try {
    _collections = JSON.parse(localStorage.getItem('fl_collections') || '[]');
    _endpoints = JSON.parse(localStorage.getItem('fl_endpoints') || '[]');
    _callLogs = JSON.parse(localStorage.getItem('fl_call_logs') || '[]');
    _environments = JSON.parse(localStorage.getItem('fl_environments') || '[]');
    _activeEnvId = JSON.parse(localStorage.getItem('fl_active_env') || 'null');
    _monitorChecks = JSON.parse(localStorage.getItem('fl_monitor') || '[]');
    _apiKeys = JSON.parse(localStorage.getItem('fl_api_keys') || '[]');
    _settings = JSON.parse(localStorage.getItem('fl_settings') || '{"theme":"dark","language":"en","accentColor":null}');
  } catch {}
}

// ==================== CLOUD SYNC ====================

let _syncTimer: ReturnType<typeof setTimeout> | null = null;

function autoSync() {
  // Debounce: sync 2 seconds after last change
  if (_syncTimer) clearTimeout(_syncTimer);
  _syncTimer = setTimeout(() => pushToCloud(), 2000);
}

export async function pushToCloud(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return false;

  _syncStatus = 'syncing'; notify();
  const userId = session.user.id;

  const payload = {
    user_id: userId,
    collections: encryptSync(JSON.stringify(_collections), userId),
    endpoints: encryptSync(JSON.stringify(_endpoints), userId),
    call_logs: encryptSync(JSON.stringify(_callLogs.slice(-200)), userId),
    environments: encryptSync(JSON.stringify(_environments), userId),
    monitor_checks: encryptSync(JSON.stringify(_monitorChecks), userId),
    api_keys: encryptSync(JSON.stringify(_apiKeys), userId),
    settings: encryptSync(JSON.stringify(_settings), userId),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('user_data')
    .upsert(payload, { onConflict: 'user_id' });

  if (error) {
    console.error('[sync] Push failed:', error.message);
    _syncStatus = 'error'; notify();
    return false;
  }

  _syncStatus = 'success'; notify();
  localStorage.setItem('fl_last_sync', String(Date.now()));
  return true;
}

export async function pullFromCloud(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return false;

  _syncStatus = 'syncing'; notify();
  const userId = session.user.id;

  const { data, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    _syncStatus = error ? 'error' : 'idle';
    notify();
    return false;
  }

  // Decrypt each field
  _collections = safeDecryptParse(data.collections, userId, _collections);
  _endpoints = safeDecryptParse(data.endpoints, userId, _endpoints);
  _callLogs = safeDecryptParse(data.call_logs, userId, _callLogs);
  _environments = safeDecryptParse(data.environments, userId, _environments);
  _monitorChecks = safeDecryptParse(data.monitor_checks, userId, _monitorChecks);
  _apiKeys = safeDecryptParse(data.api_keys, userId, _apiKeys);

  // Settings: NEVER override from cloud during pull.
  // Settings are local-first — saved to localStorage and pushed to cloud.
  // This prevents the language/theme flickering issue on page reload.
  // On first login (no local settings), load from cloud.
  const hasLocalSettings = localStorage.getItem('fl_settings');
  if (!hasLocalSettings) {
    const cloudSettings = safeDecryptParse(data.settings, userId, null);
    if (cloudSettings) _settings = cloudSettings;
  }

  // Sort logs newest first
  _callLogs.sort((a, b) => b.timestamp - a.timestamp);
  _callLogs = _callLogs.slice(0, 5000);

  persistLocal();
  _syncStatus = 'success'; notify();
  localStorage.setItem('fl_last_sync', String(Date.now()));
  return true;
}

export async function fullSync(): Promise<boolean> {
  const pulled = await pullFromCloud();
  if (!pulled) {
    // No cloud data yet — push local data
    return await pushToCloud();
  }
  return true;
}

function safeDecryptParse<T>(encrypted: string | null | undefined, userId: string, fallback: T): T {
  if (!encrypted) return fallback;
  try {
    const decrypted = decryptSync(encrypted, userId);
    return JSON.parse(decrypted);
  } catch {
    // Try unencrypted (legacy)
    try { return JSON.parse(encrypted); } catch {}
  }
  return fallback;
}

export function getLastSyncTime(): number | null {
  const t = localStorage.getItem('fl_last_sync');
  return t ? Number(t) : null;
}
