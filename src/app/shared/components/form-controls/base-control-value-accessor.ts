import { ControlValueAccessor } from '@angular/forms';
import { signal } from '@angular/core';

export abstract class BaseControlValueAccessor<T> implements ControlValueAccessor {
  private $valueSource = signal<T | null>(null);
  private $disabledSource = signal(false);

  readonly $value = this.$valueSource.asReadonly();
  readonly $disabled = this.$disabledSource.asReadonly();

  setValue(v: T | null) {
    if (this.$valueSource() !== v) {
      this.$valueSource.set(v);
      this.onChange(v as T);
    }
  }

  protected onChange: (value: T) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: T): void {
    this.$valueSource.set(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.$disabledSource.set(isDisabled);
  }

  markAsTouched(): void {
    this.onTouched();
  }
}
