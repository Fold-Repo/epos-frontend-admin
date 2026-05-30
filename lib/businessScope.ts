let getBusinessIdFromScope: (() => string | null) | null = null;

export function registerBusinessIdGetter(getter: () => string | null) {
  getBusinessIdFromScope = getter;
}

export function unregisterBusinessIdGetter() {
  getBusinessIdFromScope = null;
}

export function getScopedBusinessId(): string | null {
  return getBusinessIdFromScope?.() ?? null;
}
