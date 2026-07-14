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
import {
  createContext,
  forwardRef,
  useContext,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*  Shared style tokens                                                       */
/* -------------------------------------------------------------------------- */

const triggerStyles = clsx(
  "inline-flex h-9 items-center gap-2 rounded-[var(--radius-control)] px-3",
  "border border-[var(--border-subtle)] bg-white/[0.03]",
  "text-sm font-medium text-[var(--od-text-primary)]",
  "transition-[background-color,border-color,color,box-shadow] duration-150",
  "hover:bg-white/[0.06] hover:border-[var(--border-strong)]",
  "data-[open]:bg-white/[0.08] data-[open]:border-[var(--border-strong)]",
  "focus:outline-none focus-visible:shadow-[var(--focus-ring)]",
);

const contentStyles = clsx(
  "obsidian-dropdown-content",
  "relative z-50 min-w-[var(--dropdown-width-default)] max-w-[calc(100vw-1rem)]",
  "max-h-[var(--dropdown-max-height)] overflow-y-auto",
  "rounded-[var(--radius-overlay)] border border-[var(--border-dropdown)]",
  "bg-[var(--surface-floating)] p-1 backdrop-blur-xl",
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
  "px-2.5 py-2 text-left text-[13px] leading-5 font-medium",
  "text-[var(--od-text-primary)] outline-none select-none cursor-pointer",
  "transition-[background-color,color] duration-100",
  "data-[focus]:bg-[var(--surface-hover)]",
  "data-[active]:bg-[var(--surface-active)]",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40 data-[disabled]:data-[focus]:bg-transparent",
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
  className?: string;
}

function Item({
  children,
  onClick,
  disabled,
  variant = "default",
  className,
}: ItemProps) {
  return (
    <MenuItem disabled={disabled}>
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          baseItemStyles,
          variant === "danger" &&
            "text-[var(--od-text-danger)] data-[focus]:bg-[color-mix(in_oklab,var(--od-text-danger)_14%,transparent)]",
          className,
        )}
      >
        <ItemVariantCtx.Provider value={variant}>
          {children}
        </ItemVariantCtx.Provider>
      </button>
    </MenuItem>
  );
}

/* -------------------------------------------------------------------------- */
/*  Icon slot                                                                 */
/* -------------------------------------------------------------------------- */

function Icon({ children }: { children: ReactNode }) {
  const variant = useContext(ItemVariantCtx);
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "flex size-4 shrink-0 items-center justify-center",
        variant === "danger"
          ? "text-[var(--od-text-danger)]"
          : "text-[var(--od-text-secondary)] group-data-[focus]:text-[var(--od-text-primary)]",
      )}
    >
      {children}
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
/*  Public compound export                                                    */
/* -------------------------------------------------------------------------- */

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger,
  Content,
  Section,
  SectionLabel,
  Separator,
  Item,
  Icon,
  Label,
  Shortcut,
});
