# Discord Manager Bot

Discord bot that will take care of your team meating schedule on Discord for you!

## Implemented Commands

- **_Tools_ Catagory**
  - `/ping`: Ping latency of the API.
  - `/user`: Provide information about the user that called the command.
  - `/server`: Provide information about current server.
  - `/databases`: Store guild information into the database.

## To be Implemented Features

- Schedule next meeting for each channel, role, team
- Schedule repeated meeting (weekly, biweekly, monthly)
- Reschedule meeting
- Send meeting reminder before meeting (1 hr or 30 mins)
- Tag role/channel/team
- Answer to when asked for upcoming meeting

## How to Run

\*\*Create a file named `config.json` and put `token`, `databaseToken`, `clientId` and `guildId` inside.\*\*

### First time only

Install node packages by running `npm install` or `npm i`.
For convinience when developing, also install `nodemon` by running `npm i -g nodemon`

### Scripts

- `npm start`: Run the `app.js`
- `npm run dep-com`: Register commands to Discord
