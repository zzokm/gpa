// Global dropdown manager to ensure only one dropdown is open at a time
export class DropdownManager {
  private static instance: DropdownManager;
  private activeDropdown: string | null = null;
  private callbacks: Map<string, () => void> = new Map();

  static getInstance(): DropdownManager {
    if (!DropdownManager.instance) {
      DropdownManager.instance = new DropdownManager();
    }
    return DropdownManager.instance;
  }

  register(id: string, closeCallback: () => void) {
    this.callbacks.set(id, closeCallback);
  }

  unregister(id: string) {
    this.callbacks.delete(id);
  }

  openDropdown(id: string) {
    // Close any currently open dropdown
    if (this.activeDropdown && this.activeDropdown !== id) {
      const closeCallback = this.callbacks.get(this.activeDropdown);
      if (closeCallback) {
        closeCallback();
      }
    }
    this.activeDropdown = id;
  }

  closeDropdown(id: string) {
    if (this.activeDropdown === id) {
      this.activeDropdown = null;
    }
  }

  closeAllDropdowns() {
    this.callbacks.forEach((closeCallback) => {
      closeCallback();
    });
    this.activeDropdown = null;
  }
}
