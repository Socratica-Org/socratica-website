# Socratica Webring

A Slack-operated webring for the Socratica community, hosted on Cloudflare Workers. Members join via a slash command, their personal sites are linked together in a ring, and a daily cron verifies that every site still has the webring's prev/next links.

- **Framework:** Astro (SSR) via `@astrojs/cloudflare`
- **Storage:** Cloudflare D1
- **Link checker:** Cloudflare Browser Rendering + `@cloudflare/playwright`
- **Base path:** `/webring` — the whole site is served under `https://socratica.info/webring/`

## Slack commands

- `/webring-add` — opens a modal to add your name, node, and website.
- `/webring-edit` — opens the modal prefilled with your existing entry.
- `/webring-delete` — removes your entry.

After adding, you'll receive a DM with the exact prev/next URLs to paste into your site.

## Webring link format

For a website stored as `example.com/path`:

- Next: `https://socratica.info/webring/example.com%2Fpath/next`
- Prev: `https://socratica.info/webring/example.com%2Fpath/prev`

Both links must be present on your site or, after 7 days of daily checks failing, your entry is removed.

## One-time setup

### 1. Install dependencies

```sh
npm install
```

### 2. Create the D1 database

```sh
npx wrangler d1 create webring
```

Copy the `database_id` from the output into `wrangler.jsonc` (replace `REPLACE_WITH_WRANGLER_D1_CREATE_OUTPUT`). Then apply the migration:

```sh
npx wrangler d1 execute webring --file=migrations/0001_init.sql           # remote
npx wrangler d1 execute webring --local --file=migrations/0001_init.sql   # local dev
```

### 3. Create the Slack app

In <https://api.slack.com/apps>, create a new app and configure:

- **Slash commands** (all pointing at `https://socratica.info/webring/api/slack/commands`):
  - `/webring-add`
  - `/webring-edit`
  - `/webring-delete`
- **Interactivity & Shortcuts** — request URL: `https://socratica.info/webring/api/slack/interactions`
- **OAuth scopes** (Bot Token): `commands`, `chat:write`, `im:write`
- Install the app to the Socratica workspace.

### 4. Set secrets

```sh
npx wrangler secret put SLACK_SIGNING_SECRET
npx wrangler secret put SLACK_BOT_TOKEN
```

### 5. Deploy

```sh
npm run build
npx wrangler deploy
```

## Local development

```sh
npm run dev
```

The cron handler can be invoked locally via wrangler:

```sh
npx wrangler dev --test-scheduled
curl "http://localhost:8787/__scheduled?cron=17+12+*+*+*"
```

## Commands

| Command                  | Action                                 |
| :----------------------- | :------------------------------------- |
| `npm run dev`            | Start local dev server                 |
| `npm run build`          | Build for Cloudflare Workers           |
| `npm run preview`        | Preview the production build locally   |
| `npm run check`          | Run `astro check` (type + diagnostics) |
| `npm run generate-types` | Regenerate `worker-configuration.d.ts` |
