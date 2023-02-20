import { ToastType } from './toast-type';

export interface Toast {
  type?: ToastType;
  title?: string;
  body?:any;
  delay?: number;
}