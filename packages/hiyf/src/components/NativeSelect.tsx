import * as React from 'react'
import {
  NativeSelect as NativeSelectPrimitive,
  NativeSelectOption,
} from './ui/native-select'

/**
 * NativeSelect — closed, options-driven wrapper over shadcn's NativeSelect.
 *
 * shadcn's NativeSelect accepts arbitrary `className` on both the wrapper and
 * the option elements, and requires callers to compose NativeSelectOption
 * children manually. This wrapper closes both escape hatches:
 *   - `options` is the only way to populate items; no raw NativeSelectOption
 *     imports needed (or possible) from consumer code.
 *   - `size` maps to the primitive's two sanctioned heights ('sm'|'md').
 *   - `invalid` activates the error ring via `aria-invalid`.
 *   - there is NO `className` / `style` prop.
 */

export interface NativeSelectOption {
  value: string
  label: string
}

export interface NativeSelectProps {
  options: NativeSelectOption[]
  value?: string
  defaultValue?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  placeholder?: string
  /** Activates the error ring. Prefer pairing with a <Field> error. */
  invalid?: boolean
  disabled?: boolean
  /** Controls the trigger height. Defaults to 'md'. */
  size?: 'sm' | 'md'
  name?: string
  required?: boolean
  id?: string
}

export function NativeSelect({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  invalid,
  disabled,
  size = 'md',
  name,
  required,
  id,
}: NativeSelectProps) {
  // No className/style props by design — the only expressible choices are correct ones.
  // aria-invalid triggers the error ring already built into the base component.
  return (
    <NativeSelectPrimitive
      size={size === 'md' ? 'default' : 'sm'}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      name={name}
      required={required}
      id={id}
    >
      {placeholder && (
        <NativeSelectOption value="" disabled>
          {placeholder}
        </NativeSelectOption>
      )}
      {options.map((opt) => (
        <NativeSelectOption key={opt.value} value={opt.value}>
          {opt.label}
        </NativeSelectOption>
      ))}
    </NativeSelectPrimitive>
  )
}
