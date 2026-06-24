type ModalEntry = {
  id: symbol;
  onClose: () => void;
};

const openModals: ModalEntry[] = [];
let bodyLockCount = 0;

export function lockBodyForModal(): void {
  bodyLockCount += 1;
  if (bodyLockCount === 1) {
    document.body.classList.add('modal-open');
  }
}

export function unlockBodyForModal(): void {
  bodyLockCount = Math.max(0, bodyLockCount - 1);
  if (bodyLockCount === 0) {
    document.body.classList.remove('modal-open');
  }
}

export function registerModal(id: symbol, onClose: () => void): void {
  openModals.push({ id, onClose });
}

export function unregisterModal(id: symbol): void {
  const index = openModals.findIndex((entry) => entry.id === id);
  if (index !== -1) {
    openModals.splice(index, 1);
  }
}

export function isTopModal(id: symbol): boolean {
  const top = openModals[openModals.length - 1];
  return top?.id === id;
}

/** Test helper */
export function resetModalStackForTests(): void {
  openModals.length = 0;
  bodyLockCount = 0;
  document.body.classList.remove('modal-open');
}
