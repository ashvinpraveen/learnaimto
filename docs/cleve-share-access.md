# Accessing Cleve public share notes

Cleve share pages (`https://app.cleve.ai/share/<id>`) are a **client-rendered Next.js app**. Fetching the HTML (curl, `WebFetch`, etc.) usually only returns a loading shell or “Something went wrong” — **not the note body**. Do not rely on scraping the page DOM.

## Fast path (recommended)

Call Cleve’s **Convex public query** directly. No auth is required for public share links. No Cleve MCP or browser automation is needed.

### 1. Extract the share id

From:

```text
https://app.cleve.ai/share/jn70j2hs42naxtqqerxdytyhg58c7swj
```

the id is:

```text
jn70j2hs42naxtqqerxdytyhg58c7swj
```

### 2. Query Convex

```bash
curl -sS -X POST "https://earnest-chicken-856.convex.cloud/api/query" \
  -H "Content-Type: application/json" \
  -d '{"path":"notes/api/publicLinks:getPublicContent","args":{"id":"SHARE_ID_HERE"},"format":"json"}'
```

### 3. Read the note text

Successful response shape:

```json
{
  "status": "success",
  "value": {
    "_id": "...",
    "content": "<full note text>"
  }
}
```

Print only the content:

```bash
curl -sS -X POST "https://earnest-chicken-856.convex.cloud/api/query" \
  -H "Content-Type: application/json" \
  -d '{"path":"notes/api/publicLinks:getPublicContent","args":{"id":"SHARE_ID_HERE"},"format":"json"}' \
  | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d["value"]["content"] if d.get("status")=="success" else d)'
```

## Path format

Use Convex path style:

| Path | Works? |
| --- | --- |
| `notes/api/publicLinks:getPublicContent` | Yes |
| `notes.api.publicLinks.getPublicContent` | No — invalid Convex identifier |

## Optional sanity check

The HTML `<title>` / Open Graph title often includes the note title even when the body is not in the HTML. Useful only to confirm you hit the right share URL.

## If the Convex host changes

1. Fetch `https://app.cleve.ai/share/<id>`.
2. Download linked `/_next/static/chunks/*.js` assets.
3. Grep for `*.convex.cloud`.
4. Prefer the deployment that successfully answers `getPublicContent`.

As of 2026-08-10, the working deployment is:

```text
earnest-chicken-856.convex.cloud
```

## Agent one-liner

For Cleve share URLs: skip page scraping; POST to `https://earnest-chicken-856.convex.cloud/api/query` with path `notes/api/publicLinks:getPublicContent` and `args.id` set to the share id; use `value.content` from the JSON response.
