import type { InjectionKey } from "vue";

export const ShowErrorKey: InjectionKey<(msg: string) => void> = Symbol("showError");
export const ShowSuccessKey: InjectionKey<(msg: string) => void> = Symbol("showSuccess");
