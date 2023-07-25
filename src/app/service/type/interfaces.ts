export interface ModalConfig {
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  /** 點擊背景關閉視窗 */
  closeOnBackdropClick?: boolean;
  backdropClass?: string;
  /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
  width?: number | string;
  /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
  height?: number | string;
  /** The min-width of the overlay panel. If a number is provided, pixel units are assumed. */
  minWidth?: number | string;
  /** The min-height of the overlay panel. If a number is provided, pixel units are assumed. */
  minHeight?: number | string;
  /** The max-width of the overlay panel. If a number is provided, pixel units are assumed. */
  maxWidth?: number | string;
  /** The max-height of the overlay panel. If a number is provided, pixel units are assumed. */
  maxHeight?: number | string;
  /**
   * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  disposeOnNavigation?: boolean;
}