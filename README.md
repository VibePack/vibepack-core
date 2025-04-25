# VibePack

> **Drop-in UI design-vibe packs + CLI for AI coding assistants**
>
> One `vibe.json` ➜ on-brand UI, no more gray boilerplate.

---

## Table of Contents
1. [Motivation](#motivation)
2. [Packages](#packages)
3. [Quick Start](#quick-start)
4. [CLI Reference](#cli-reference)
5. [Creating Your Own Pack](#creating-your-own-pack)
6. [Project Structure](#project-structure)
7. [Roadmap](#roadmap)
8. [Contributing](#contributing)
9. [License](#license)

---

## Motivation
AI tools like Copilot, Cursor, and Replit generate solid UI code,but every scaffold looks exactly the same. **VibePack** adds a lightweight design-token contract (`vibe.json`) and a CLI that turns those tokens into CSS, Tailwind, and soon VS Code prompt-context, so generated screens ship *instantly* on-brand or with beautiful community created templates.

---

## Packages
| Path | NPM Name | Description |
|------|----------|-------------|
| `packages/cli` | `@vibepack/cli` | Validates & builds packs → emits `vibe.css` + `tailwind.js`. Installs a global `vibepack` command. |
| `packages/packs/*` | `@vibepack/<pack>` | Theme packs (tokens, generated artifacts). Example: **`neon-saas`** |
| `packages/vscode-extension` | _TBD_ | Injects `vibe.json` into Copilot/Cursor prompts & shows live previews. |

---

## Quick Start
```bash
# 1 Clone & bootstrap
pnpm install

# 2 Build the CLI once
pnpm --filter @vibepack/cli run build

# 3 Link globally (dev only)
pnpm --filter @vibepack/cli link --global

# 4 Generate artifacts for a pack
vibepack build packages/packs/neon-saas

# 5 Use the pack in your app
echo "@import 'packages/packs/neon-saas/vibe.css';" >> styles.css
```

---

## CLI Reference
| Command | Description |
|---------|-------------|
| `vibepack validate [file]` | Validate a `vibe.json` against the schema. |
| `vibepack build <dir>` | Generate `vibe.css` & `tailwind.js` into the given pack directory. |

See **`packages/cli/src/index.ts`** for implementation details.

---

## Creating Your Own Pack
```bash
mkdir -p packages/packs/dark-hacker
cp packages/packs/neon-saas/vibe.json packages/packs/dark-hacker/
# ✏️ Edit tokens…
vibepack build packages/packs/dark-hacker
```
1. Update `packages/packs/dark-hacker/package.json` with a name & version.
2. Publish: `pnpm --filter @vibepack/dark-hacker publish --access public`.

---

## Project Structure
```
vibepack-core/
├─ packages/
│  ├─ cli/               # CLI source & build
│  ├─ packs/
│  │   └─ neon-saas/     # example theme pack
│  └─ vscode-extension/  # future VS Code plug-in
└─ …                     # configs, lockfile, etc.
```

---

## Roadmap
- [x] CLI `validate` / `build`
- [x] First pack: **Neon SaaS**
- [ ] VS Code / Cursor extension (prompt injection)
- [ ] Additional pack generators (radius, motion, shadow)
- [ ] Figma plug-in ➜ export `vibe.json`

---

## Contributing
1. Fork & clone this repo.
2. `pnpm install` (pnpm ≥10 recommended).
3. Create a feature branch: `git checkout -b feat/my-feature`.
4. Run tests/lint: _coming soon_.
5. Open a PR—please follow the conventional commits style.

---

## License
MIT © 2025 VibePack contributors
