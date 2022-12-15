# Discord Manager Bot

Discord bot that will take care of your team meeting schedule on Discord for you!

## Implemented Commands

- **_Tools_**
  - `/ping`
    - Ping latency of the API
  - `/user`
    - Provide information about the user that called the command
  - `/server`
    - Provide information about current server
  - `/guild`
    - Store guild information into the database
- **_Team_**
  - `/new_team team_name [channel] [role]`
    - Create a new team on a channel and role (optional)
  - `/teams [channel]`
    - List all team on current guild or a channel
- **_Meeting_**
  - `/new_meeting team_name title date_time`
    - Create a new meeting associated with the team with name `team_name` with title of `title` at the time `date_time`
  - `/meetings [team_name]`
    - List all meeting on current guild or a team

## To be Implemented Features

- Schedule repeated meeting (weekly, biweekly, monthly)
- Reschedule meeting
- Send meeting reminder before meeting (1 hr or 30 mins)
- Tag role/channel/team
- Send meeting reminder to email
- Send meeting reminder to calendar

## How to Run

\*\*Create a file named `config.json` and put `token`, `databaseToken`, `clientId` and `guildId` inside.\*\*

### First time only

Install `MongoDB` locally or create a database on MongoDB Atlas.
Install node packages by running `npm install` or `npm i`.
For convinience when developing, also install `nodemon` by running `npm i -g nodemon`

### Scripts

- `npm start`: Run the `app.js`
- `npm run dep-com`: Register commands to Discord
- `npm run del-com` : Delete all registered commands

## Future Idea

- Voice channel features
- Music play
- Rubik Scamble
