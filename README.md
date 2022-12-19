# Discord Manager Bot

Discord bot that will take care of your team meeting schedule on Discord for you!

## Implemented Commands

### Tools
  - `/ping`
    - Ping latency of the API
  - `/user`
    - Provide information about the user that called the command
  - `/server`
    - Provide information about current server
### Team
  - `/new_team team_name [channel] [role]`
    - Create a new team on a channel and role (optional)
  - `/teams [channel]`
    - List all team on current guild or a channel
### Meeting
  - `/new_meeting team_name title date_time`
    - Create a new meeting associated with the team with name team_name with title and date_time
  - `/meetings [team_name]`
    - List all meeting scheduled on current guild or team_name

## To be Implemented Features

- Schedule repeated meeting (weekly, biweekly, monthly)
- Reschedule meeting
- Send meeting reminder before meeting (1 hr or 30 mins)
- Tag role/channel/team
- Send meeting reminder to email
- Send meeting reminder to calendar

## How to Run

### First time only

1. Create a file named `config.json` and put `token`, `databaseToken`, `clientId` and `guildId` inside like so.
   ```
   {
     "token": "your-bot-token",
     "databaseToken": "mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true",
     "clientId": "application-id",
     "guildId": "guild-id",
   }
   ```

2. Install `MongoDB` locally or create a database on MongoDB Atlas. You can easily run MongoDB with docker by running following command
   ```
   docker run -dp 27015:27017 --name mymongo mongo:latest
   ```


### Scripts

- `npm start`: Run the `app.js`
- `npm run dep-com`: Register commands to Discord
- `npm run del-com`: Delete all registered commands

## Future Idea

- Voice channel features
- Music play
- Rubik Scamble
