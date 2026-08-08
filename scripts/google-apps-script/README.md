# University leaderboard data setup

1. Open the Google Form response spreadsheet.
2. Choose **Extensions → Apps Script**.
3. Replace the editor contents with `leaderboard.gs`.
4. Confirm the response tab is named `Form Responses 1`. If it is not, change
   `responseSheetName` in `CONFIG`.
5. Choose **Deploy → New deployment → Web app**.
6. Set **Execute as** to yourself and access to **Anyone**. The endpoint exposes
   only aggregate university totals, never response rows or email addresses.
7. Authorize the script, open the deployment URL, and confirm it returns JSON.
8. Add the deployment URL to Vercel as `LEADERBOARD_DATA_URL`, then redeploy.

The Next.js page caches a successful response for 24 hours. Both student and
personal emails on a response are tracked for duplicate detection, so the same
person cannot be counted twice. The first valid response wins.
