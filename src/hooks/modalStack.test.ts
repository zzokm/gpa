import { afterEach, describe, expect, it } from 'vitest';
import {
  isTopModal,
  lockBodyForModal,
  registerModal,
  resetModalStackForTests,
  unregisterModal,
  unlockBodyForModal,
} from './modalStack';

describe('modalStack', () => {
  afterEach(() => {
    resetModalStackForTests();
  });

  it('keeps body.modal-open until all modals unlock', () => {
    lockBodyForModal();
    lockBodyForModal();
    expect(document.body.classList.contains('modal-open')).toBe(true);

    unlockBodyForModal();
    expect(document.body.classList.contains('modal-open')).toBe(true);

    unlockBodyForModal();
    expect(document.body.classList.contains('modal-open')).toBe(false);
  });

  it('tracks top modal for escape handling', () => {
    const first = Symbol('first');
    const second = Symbol('second');
    const closeFirst = () => {};
    const closeSecond = () => {};

    registerModal(first, closeFirst);
    registerModal(second, closeSecond);

    expect(isTopModal(first)).toBe(false);
    expect(isTopModal(second)).toBe(true);

    unregisterModal(second);
    expect(isTopModal(first)).toBe(true);
  });
});
