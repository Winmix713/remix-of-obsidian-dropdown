import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  PencilSquareIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  ArchiveBoxIcon,
  TrashIcon,
  UserCircleIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  CheckIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import { Dropdown } from "@/components/obsidian-dropdown";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Obsidian Dropdown — Premium UX" },
      {
        name: "description",
        content:
          "A precision, calm, keyboard-first dropdown built on Headless UI with the Obsidian design language.",
      },
      { property: "og:title", content: "Obsidian Dropdown — Premium UX" },
      {
        property: "og:description",
        content:
          "A precision, calm, keyboard-first dropdown built on Headless UI with the Obsidian design language.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [density, setDensity] = useState<"comfortable" | "compact">(
    "comfortable",
  );
  const [workspace, setWorkspace] = useState("obsidian-studio");
  const [query, setQuery] = useState("");

  const workspaces = useMemo(
    () => [
      { id: "obsidian-studio", name: "Obsidian Studio", hint: "Personal" },
      { id: "linear-hq", name: "Linear HQ", hint: "Team" },
      { id: "raycast-labs", name: "Raycast Labs", hint: "Team" },
      { id: "vercel-edge", name: "Vercel Edge", hint: "Team" },
      { id: "figma-design", name: "Figma Design", hint: "Team" },
      { id: "framer-motion", name: "Framer Motion", hint: "Team" },
      { id: "notion-workspace", name: "Notion Workspace", hint: "Personal" },
      { id: "arc-browser", name: "Arc Browser", hint: "Team" },
      { id: "warp-terminal", name: "Warp Terminal", hint: "Personal" },
      { id: "supabase-cloud", name: "Supabase Cloud", hint: "Team" },
      { id: "stripe-atlas", name: "Stripe Atlas", hint: "Team" },
      { id: "cloudflare-r2", name: "Cloudflare R2", hint: "Team" },
    ],
    [],
  );

  const filteredWorkspaces = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workspaces;
    return workspaces.filter((w) => w.name.toLowerCase().includes(q));
  }, [query, workspaces]);


  return (
    <div className="min-h-dvh bg-[#0b0d12] text-[var(--od-text-primary)] antialiased">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60rem 40rem at 20% -10%, rgba(220,180,92,0.08), transparent 60%), radial-gradient(50rem 30rem at 90% 10%, rgba(94,140,255,0.06), transparent 60%)",
        }}
      />

      <main className="relative mx-auto flex min-h-dvh max-w-5xl flex-col gap-16 px-6 py-16 sm:py-24">
        <header className="flex flex-col gap-4">
          <span className="w-fit rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-[var(--od-text-tertiary)] uppercase">
            Obsidian · Component
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[var(--od-text-primary)] sm:text-5xl">
            Premium Dropdown
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--od-text-secondary)]">
            A precise, layered menu surface built on Headless UI. Calm motion,
            confident hierarchy, and full keyboard support — designed to feel
            closer to Linear or Raycast than a browser select.
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 — labelled trigger with sections */}
          <Card
            title="Project actions"
            description="Sectioned menu with shortcuts, separator, and a destructive action."
          >
            <Dropdown>
              <Dropdown.Trigger>
                Actions
                <ChevronDownIcon
                  className="size-4 text-[var(--od-text-tertiary)] group-data-[open]:text-[var(--od-text-primary)]"
                  aria-hidden="true"
                />
              </Dropdown.Trigger>

              <Dropdown.Content>
                <Dropdown.Section>
                  <Dropdown.SectionLabel>Project</Dropdown.SectionLabel>
                  <Dropdown.Item>
                    <Dropdown.Icon>
                      <PencilSquareIcon className="size-4" />
                    </Dropdown.Icon>
                    <Dropdown.Label>Rename project</Dropdown.Label>
                    <Dropdown.Shortcut>⌘R</Dropdown.Shortcut>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Dropdown.Icon>
                      <DocumentDuplicateIcon className="size-4" />
                    </Dropdown.Icon>
                    <Dropdown.Label>Duplicate</Dropdown.Label>
                    <Dropdown.Shortcut>⌘D</Dropdown.Shortcut>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Dropdown.Icon>
                      <ArrowDownTrayIcon className="size-4" />
                    </Dropdown.Icon>
                    <Dropdown.Label>Export as PNG</Dropdown.Label>
                    <Dropdown.Shortcut>⇧⌘P</Dropdown.Shortcut>
                  </Dropdown.Item>
                </Dropdown.Section>

                <Dropdown.Separator />

                <Dropdown.Section>
                  <Dropdown.Item>
                    <Dropdown.Icon>
                      <ShareIcon className="size-4" />
                    </Dropdown.Icon>
                    <Dropdown.Label>Share link</Dropdown.Label>
                  </Dropdown.Item>
                  <Dropdown.Item disabled>
                    <Dropdown.Icon>
                      <ArchiveBoxIcon className="size-4" />
                    </Dropdown.Icon>
                    <Dropdown.Label>Archive (locked)</Dropdown.Label>
                  </Dropdown.Item>
                </Dropdown.Section>

                <Dropdown.Separator />

                <Dropdown.Section>
                  <Dropdown.Item variant="danger">
                    <Dropdown.Icon>
                      <TrashIcon className="size-4" />
                    </Dropdown.Icon>
                    <Dropdown.Label>Delete project</Dropdown.Label>
                    <Dropdown.Shortcut>⌘⌫</Dropdown.Shortcut>
                  </Dropdown.Item>
                </Dropdown.Section>
              </Dropdown.Content>
            </Dropdown>
          </Card>

          {/* Card 2 — icon-only trigger */}
          <Card
            title="Contextual actions"
            description="Icon-only trigger with an accessible name. Opens to the bottom-end."
          >
            <Dropdown>
              <Dropdown.Trigger
                aria-label="Open row actions"
                className="!w-9 !px-0 justify-center"
              >
                <EllipsisHorizontalIcon
                  className="size-5 text-[var(--od-text-secondary)]"
                  aria-hidden="true"
                />
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Item>
                  <Dropdown.Icon>
                    <PencilSquareIcon className="size-4" />
                  </Dropdown.Icon>
                  <Dropdown.Label>Edit</Dropdown.Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Dropdown.Icon>
                    <DocumentDuplicateIcon className="size-4" />
                  </Dropdown.Icon>
                  <Dropdown.Label>Duplicate</Dropdown.Label>
                </Dropdown.Item>
                <Dropdown.Separator />
                <Dropdown.Item variant="danger">
                  <Dropdown.Icon>
                    <TrashIcon className="size-4" />
                  </Dropdown.Icon>
                  <Dropdown.Label>Delete</Dropdown.Label>
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          </Card>

          {/* Card 3 — persistent selection */}
          <Card
            title="View density"
            description="Persistent preference with a trailing check mark for current value."
          >
            <Dropdown>
              <Dropdown.Trigger>
                Density: <span className="text-[var(--od-text-secondary)]">{density}</span>
                <ChevronDownIcon className="size-4 text-[var(--od-text-tertiary)]" aria-hidden="true" />
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.SectionLabel>Layout</Dropdown.SectionLabel>
                {(["comfortable", "compact"] as const).map((value) => (
                  <Dropdown.Item key={value} onClick={() => setDensity(value)}>
                    <Dropdown.Label>
                      <span className="capitalize">{value}</span>
                    </Dropdown.Label>
                    {density === value && (
                      <CheckIcon
                        aria-hidden="true"
                        className="size-4 text-[var(--od-accent-primary)]"
                      />
                    )}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </Card>

          {/* Card 4 — account menu */}
          <Card
            title="Account"
            description="User menu with grouped sessions and sign-out."
          >
            <Dropdown>
              <Dropdown.Trigger>
                <span className="flex size-6 items-center justify-center rounded-full bg-[var(--od-accent-primary-soft)] text-[11px] font-semibold text-[var(--od-accent-primary)]">
                  AK
                </span>
                Anna K.
                <ChevronDownIcon className="size-4 text-[var(--od-text-tertiary)]" aria-hidden="true" />
              </Dropdown.Trigger>
              <Dropdown.Content>
                <div className="px-2.5 py-2">
                  <div className="text-[13px] font-medium text-[var(--od-text-primary)]">
                    Anna Kovács
                  </div>
                  <div className="text-[12px] text-[var(--od-text-tertiary)]">
                    anna@obsidian.studio
                  </div>
                </div>
                <Dropdown.Separator />
                <Dropdown.Section>
                  <Dropdown.Item>
                    <Dropdown.Icon>
                      <UserCircleIcon className="size-4" />
                    </Dropdown.Icon>
                    <Dropdown.Label>Profile</Dropdown.Label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Dropdown.Icon>
                      <CreditCardIcon className="size-4" />
                    </Dropdown.Icon>
                    <Dropdown.Label>Billing</Dropdown.Label>
                    <Dropdown.Shortcut>⌘B</Dropdown.Shortcut>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Dropdown.Icon>
                      <Cog6ToothIcon className="size-4" />
                    </Dropdown.Icon>
                    <Dropdown.Label>Settings</Dropdown.Label>
                    <Dropdown.Shortcut>⌘,</Dropdown.Shortcut>
                  </Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Separator />
                <Dropdown.Item>
                  <Dropdown.Icon>
                    <ArrowRightOnRectangleIcon className="size-4" />
                  </Dropdown.Icon>
                  <Dropdown.Label>Sign out</Dropdown.Label>
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          </Card>

          {/* Card 5 — command-palette style with search + selection */}
          <Card
            title="Workspace switcher"
            description="Command-palette style with live search, selected state, and empty results."
          >
            <Dropdown>
              <Dropdown.Trigger>
                <span className="text-[var(--od-text-secondary)]">Workspace</span>
                <span className="min-w-0 truncate">
                  {workspaces.find((w) => w.id === workspace)?.name ?? "—"}
                </span>
                <Dropdown.Chevron />
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Search
                  icon={<MagnifyingGlassIcon className="size-4" />}
                  hint="⌘K"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search workspaces…"
                />
                {filteredWorkspaces.length === 0 ? (
                  <Dropdown.Empty icon={<FaceFrownIcon className="size-5" />}>
                    No workspaces match "{query}"
                  </Dropdown.Empty>
                ) : (
                  filteredWorkspaces.map((w) => (
                    <Dropdown.Item
                      key={w.id}
                      selected={workspace === w.id}
                      onClick={() => {
                        setWorkspace(w.id);
                        setQuery("");
                      }}
                    >
                      <Dropdown.Label>
                        <span className="flex flex-col">
                          <span>{w.name}</span>
                          <span className="text-[11.5px] font-normal text-[var(--od-text-tertiary)]">
                            {w.hint}
                          </span>
                        </span>
                      </Dropdown.Label>
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Content>
            </Dropdown>
          </Card>
        </section>


        <footer className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--border-subtle)] pt-8 text-[12px] text-[var(--od-text-tertiary)]">
          <span>Try it: <kbd className="rounded border border-[var(--border-subtle)] px-1.5 py-0.5 text-[11px]">Tab</kbd> to trigger, <kbd className="rounded border border-[var(--border-subtle)] px-1.5 py-0.5 text-[11px]">Enter</kbd> to open, <kbd className="rounded border border-[var(--border-subtle)] px-1.5 py-0.5 text-[11px]">↑</kbd> <kbd className="rounded border border-[var(--border-subtle)] px-1.5 py-0.5 text-[11px]">↓</kbd> to navigate, <kbd className="rounded border border-[var(--border-subtle)] px-1.5 py-0.5 text-[11px]">Esc</kbd> to close.</span>
        </footer>
      </main>
    </div>
  );
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative flex flex-col gap-5 rounded-2xl border border-[var(--border-subtle)] bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:border-[var(--border-strong)]">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[14px] font-semibold text-[var(--od-text-primary)]">
          {title}
        </h2>
        <p className="text-[12.5px] leading-relaxed text-[var(--od-text-tertiary)]">
          {description}
        </p>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  );
}
