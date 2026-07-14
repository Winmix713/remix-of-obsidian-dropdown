import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuHeading,
  MenuSeparator,
  type MenuItemsProps,
} from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  createContext,
  forwardRef,
  useContext,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*  Shared style tokens                                                       */
/* -------------------------------------------------------------------------- */

const triggerStyles = clsx(
  "group inline-flex min-h-[var(--control-height)] items-center gap-3 rounded-[var(--radius-control)] px-3.5",
  "border border-[var(--border-subtle)] bg-white/[0.03]",
  "text-sm font-medium text-[var(--od-text-primary)]",
  "transition-[background-color,border-color,color,box-shadow,transform] duration-150",
  "hover:bg-white/[0.06] hover:border-[var(--border-strong)]",
  "active:translate-y-[1px]",
  "data-[open]:bg-white/[0.06] data-[open]:border-[color:var(--od-accent-primary)]",
  "data-[open]:shadow-[var(--focus-ring)]",
  "focus:outline-none focus-visible:border-[color:var(--od-accent-primary)] focus-visible:shadow-[var(--focus-ring)]",
  "disabled:opacity-50 disabled:cursor-not-allowed",
);

const contentStyles = clsx(
  "obsidian-dropdown-content",
  "relative z-50 min-w-[var(--dropdown-width-default)] max-w-[calc(100vw-1rem)]",
  "max-h-[var(--dropdown-max-height)] overflow-y-auto",
  "rounded-[var(--radius-overlay)] border border-[var(--border-dropdown)]",
  "bg-[var(--surface-floating)] p-1.5 backdrop-blur-xl",
  "shadow-[var(--shadow-dropdown)]",
  "origin-top",
  "transition duration-[var(--motion-enter-duration)] ease-[var(--motion-enter-easing)]",
  "data-[closed]:translate-y-1 data-[closed]:scale-[0.985] data-[closed]:opacity-0",
  "data-[leave]:duration-[var(--motion-exit-duration)] data-[leave]:ease-[var(--motion-exit-easing)]",
  "focus:outline-none",
  "motion-reduce:transform-none motion-reduce:transition-[opacity] motion-reduce:duration-100",
);

const baseItemStyles = clsx(
  "group flex w-full items-center gap-2.5 rounded-[var(--radius-control)]",
  "min-h-[var(--option-height)] px-2.5 py-1.5 text-left text-[13px] leading-5 font-medium",
  "text-[var(--od-text-primary)] outline-none select-none cursor-pointer",
  "transition-[background-color,color] duration-100",
  "hover:bg-[var(--surface-hover)]",
  "data-[focus]:bg-[var(--surface-hover)]",
  "data-[active]:bg-[var(--surface-active)]",
  "data-[selected=true]:bg-[var(--surface-selected)] data-[selected=true]:text-white",
  "data-[selected=true]:data-[focus]:bg-[var(--surface-selected-strong)]",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40 data-[disabled]:data-[focus]:bg-transparent",
  "sm:min-h-[var(--option-height)] max-sm:min-h-[2.875rem]",
);

/* -------------------------------------------------------------------------- */
/*  Context (variant plumbing for Item -> danger, etc.)                       */
/* -------------------------------------------------------------------------- */

type ItemVariant = "default" | "danger";
const ItemVariantCtx = createContext<ItemVariant>("default");

/* -------------------------------------------------------------------------- */
/*  Root                                                                      */
/* -------------------------------------------------------------------------- */

interface DropdownProps {
  children: ReactNode;
  className?: string;
}

function DropdownRoot({ children, className }: DropdownProps) {
  return (
    <Menu as="div" className={clsx("relative inline-block text-left", className)}>
      {children}
    </Menu>
  );
}

/* -------------------------------------------------------------------------- */
/*  Trigger                                                                   */
/* -------------------------------------------------------------------------- */

interface TriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(function Trigger(
  { children, className, ...props },
  ref,
) {
  return (
    <MenuButton ref={ref} className={clsx(triggerStyles, className)} {...props}>
      {children}
    </MenuButton>
  );
});

/* -------------------------------------------------------------------------- */
/*  Chevron helper                                                            */
/* -------------------------------------------------------------------------- */

function Chevron({ className }: { className?: string }) {
  return (
    <ChevronDownIcon
      aria-hidden="true"
      className={clsx(
        "size-4 shrink-0 text-[var(--od-text-tertiary)]",
        "transition-[transform,color] duration-[var(--motion-enter-duration)] ease-[var(--motion-enter-easing)]",
        "group-data-[open]:rotate-180 group-data-[open]:text-[var(--od-accent-primary)]",
        className,
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

interface ContentProps
  extends Omit<MenuItemsProps, "as" | "className" | "children"> {
  children: ReactNode;
  className?: string;
  anchor?: MenuItemsProps["anchor"];
}

function Content({
  children,
  className,
  anchor = { to: "bottom end", gap: 8, padding: 8 },
  ...props
}: ContentProps) {
  return (
    <MenuItems
      transition
      anchor={anchor}
      className={clsx(contentStyles, className)}
      {...props}
    >
      {children}
    </MenuItems>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section + Section label                                                   */
/* -------------------------------------------------------------------------- */

function Section({ children, className }: { children: ReactNode; className?: string }) {
  return <MenuSection className={clsx("py-0.5", className)}>{children}</MenuSection>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <MenuHeading
      className={clsx(
        "px-2.5 pt-2 pb-1 text-[11px] font-semibold tracking-[0.08em]",
        "text-[var(--od-text-tertiary)] uppercase select-none",
      )}
    >
      {children}
    </MenuHeading>
  );
}

/* -------------------------------------------------------------------------- */
/*  Separator                                                                 */
/* -------------------------------------------------------------------------- */

function Separator() {
  return (
    <MenuSeparator className="mx-1 my-1 h-px bg-[var(--border-subtle)]" />
  );
}

/* -------------------------------------------------------------------------- */
/*  Item                                                                      */
/* -------------------------------------------------------------------------- */

interface ItemProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ItemVariant;
  selected?: boolean;
  /** Suppress the automatic trailing check icon when selected. */
  hideCheck?: boolean;
  className?: string;
}

function Item({
  children,
  onClick,
  disabled,
  variant = "default",
  selected = false,
  hideCheck = false,
  className,
}: ItemProps) {
  return (
    <MenuItem disabled={disabled}>
      <button
        type="button"
        onClick={onClick}
        data-selected={selected ? "true" : undefined}
        aria-checked={selected || undefined}
        className={clsx(
          baseItemStyles,
          variant === "danger" &&
            "text-[var(--od-text-danger)] data-[focus]:bg-[color-mix(in_oklab,var(--od-text-danger)_14%,transparent)]",
          className,
        )}
      >
        <ItemVariantCtx.Provider value={variant}>
          {children}
          {selected && !hideCheck && (
            <CheckIcon
              aria-hidden="true"
              className="ml-auto size-[18px] shrink-0 text-[var(--od-accent-primary)]"
            />
          )}
        </ItemVariantCtx.Provider>
      </button>
    </MenuItem>
  );
}

/* -------------------------------------------------------------------------- */
/*  Icon slot                                                                 */
/* -------------------------------------------------------------------------- */

function Icon({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  /** `accent` = red Raycast tile, `muted` = neutral tile, `bare` = no tile bg */
  tone?: "accent" | "muted" | "bare";
}) {
  const variant = useContext(ItemVariantCtx);
  const useTile = tone !== "bare";
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "relative flex shrink-0 items-center justify-center transition-transform duration-150",
        useTile
          ? "size-7 rounded-[8px] text-white group-data-[focus]:scale-[1.04] group-active:scale-[0.96]"
          : "size-4",
        variant === "danger" && !useTile && "text-[var(--od-text-danger)]",
        !useTile && variant !== "danger" &&
          "text-[var(--od-text-secondary)] group-data-[focus]:text-[var(--od-text-primary)]",
      )}
      style={
        useTile
          ? {
              backgroundImage:
                tone === "accent" ? "var(--tile-bg)" : "var(--tile-bg-muted)",
              boxShadow: "var(--tile-ring), var(--tile-shadow)",
            }
          : undefined
      }
    >
      <span className={clsx("relative flex items-center justify-center", useTile ? "size-4" : "size-4")}>
        {children}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Label (flex-1 truncating middle slot)                                     */
/* -------------------------------------------------------------------------- */

function Label({ children }: { children: ReactNode }) {
  return <span className="min-w-0 flex-1 truncate">{children}</span>;
}

/* -------------------------------------------------------------------------- */
/*  Shortcut                                                                  */
/* -------------------------------------------------------------------------- */

function Shortcut({ children }: { children: ReactNode }) {
  return (
    <kbd
      className={clsx(
        "ml-auto pl-3 text-[12px] font-normal tabular-nums",
        "text-[var(--od-text-tertiary)] group-data-[focus]:text-[var(--od-text-secondary)]",
        "font-sans tracking-wide",
      )}
    >
      {children}
    </kbd>
  );
}

/* -------------------------------------------------------------------------- */
/*  Search — inline search input, non-interactive as MenuItem                 */
/* -------------------------------------------------------------------------- */

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  hint?: ReactNode;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { icon, hint, className, placeholder = "Search…", ...props },
  ref,
) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 rounded-[var(--radius-control)] px-2.5",
        "min-h-[2.375rem] mb-1",
        "bg-white/[0.045] border border-transparent",
        "text-[var(--od-text-secondary)]",
        "focus-within:bg-white/[0.07] focus-within:border-[color:var(--od-accent-primary)]",
        "focus-within:shadow-[var(--focus-ring)]",
        "transition-[background-color,border-color,box-shadow] duration-150",
      )}
      onKeyDown={(e) => {
        // keep menu keys working, but stop letters/space from being swallowed
        // by Headless UI's typeahead when typing into the field.
        if (
          e.key !== "ArrowDown" &&
          e.key !== "ArrowUp" &&
          e.key !== "Escape" &&
          e.key !== "Enter" &&
          e.key !== "Tab"
        ) {
          e.stopPropagation();
        }
      }}
    >
      {icon ? (
        <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center text-[var(--od-text-tertiary)]">
          {icon}
        </span>
      ) : null}
      <input
        ref={ref}
        type="text"
        role="searchbox"
        aria-label="Search options"
        placeholder={placeholder}
        className={clsx(
          "min-w-0 flex-1 bg-transparent text-[13px] font-medium text-[var(--od-text-primary)]",
          "placeholder:text-[var(--od-text-tertiary)]",
          "outline-none",
          className,
        )}
        {...props}
      />
      {hint ? (
        <kbd className="text-[11px] font-sans text-[var(--od-text-tertiary)] tabular-nums tracking-wide">
          {hint}
        </kbd>
      ) : null}
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/*  Empty — placeholder when a filter produces no results                     */
/* -------------------------------------------------------------------------- */

function Empty({
  children = "No results",
  icon,
}: {
  children?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-1.5 px-3 py-6 text-center"
    >
      {icon ? (
        <span aria-hidden="true" className="text-[var(--od-text-tertiary)]">
          {icon}
        </span>
      ) : null}
      <p className="text-[12.5px] font-medium text-[var(--od-text-tertiary)]">
        {children}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Public compound export                                                    */
/* -------------------------------------------------------------------------- */

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger,
  Chevron,
  Content,
  Section,
  SectionLabel,
  Separator,
  Item,
  Icon,
  Label,
  Shortcut,
  Search,
  Empty,
});
