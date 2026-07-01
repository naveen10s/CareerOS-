"use client";

import React, { forwardRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

// ----------------------------------------------------
// 1. STANDARD TEXT INPUT
// ----------------------------------------------------
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", isInvalid = false, label, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-text-primary block font-mono text-[11px] font-bold tracking-wider uppercase"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "border-border bg-surface text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-ring duration-fast flex h-10 w-full rounded-lg border px-3 py-2 text-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            isInvalid && "border-danger focus-visible:ring-danger focus-visible:border-danger",
            className,
          )}
          aria-invalid={isInvalid}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              "text-[10px] leading-none",
              isInvalid ? "text-danger" : "text-muted-foreground",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

// ----------------------------------------------------
// 2. TEXTAREA INPUT
// ----------------------------------------------------
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean;
  label?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isInvalid = false, label, helperText, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-text-primary block font-mono text-[11px] font-bold tracking-wider uppercase"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "border-border bg-surface text-foreground placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-ring duration-fast flex min-h-[80px] w-full resize-y rounded-lg border px-3 py-2 text-xs transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            isInvalid && "border-danger focus-visible:ring-danger focus-visible:border-danger",
            className,
          )}
          aria-invalid={isInvalid}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              "text-[10px] leading-none",
              isInvalid ? "text-danger" : "text-muted-foreground",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

// ----------------------------------------------------
// 3. SEARCH BOX INPUT
// ----------------------------------------------------
export const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, isInvalid = false, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          ref={ref}
          type="search"
          className={cn(
            "border-border bg-surface text-foreground placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-ring duration-fast flex h-10 w-full rounded-lg border py-2 pr-3 pl-9 text-xs transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            isInvalid && "border-danger focus-visible:ring-danger focus-visible:border-danger",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

// ----------------------------------------------------
// 4. TOGGLE / SWITCH COMPONENT
// ----------------------------------------------------
interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, onCheckedChange, id, ...props }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
    };

    return (
      <div className="flex items-center space-x-3 select-none">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            id={switchId}
            type="checkbox"
            ref={ref}
            checked={checked}
            onChange={handleChange}
            className="peer sr-only"
            {...props}
          />
          <div className="bg-secondary/80 peer peer-checked:bg-primary border-border/20 h-5 w-9 rounded-full border peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
        </label>
        {label && (
          <label htmlFor={switchId} className="text-foreground cursor-pointer text-xs font-medium">
            {label}
          </label>
        )}
      </div>
    );
  },
);
Switch.displayName = "Switch";

// ----------------------------------------------------
// 5. CUSTOM SELECT PRIMITIVE
// ----------------------------------------------------
interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  helperText?: string;
  isInvalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, label, helperText, isInvalid = false, id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-text-primary block font-mono text-[11px] font-bold tracking-wider uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "border-border bg-surface text-foreground focus-visible:ring-ring focus-visible:border-ring duration-fast flex h-10 w-full cursor-pointer appearance-none rounded-lg border px-3 py-2 text-xs transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              isInvalid && "border-danger focus-visible:ring-danger focus-visible:border-danger",
              className,
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px]">
            ▼
          </span>
        </div>
        {helperText && (
          <p
            className={cn(
              "text-[10px] leading-none",
              isInvalid ? "text-danger" : "text-muted-foreground",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
