module.exports = {
  sameDay: "[Today] [at] h:mm A",
  nextDay: "[Tomorrow] [at] h:mm A",
  nextWeek: "[on] dddd [at] h:mm A",
  lastDay: "[Yesterday]",
  lastWeek: "[Last] dddd",
  sameElse: function (now) {
    if (this.isBefore(now)) {
      return "[on] DD/MM/YYYY";
    } else {
      return "[on] DD/MM/YYYY [at] h:mm A";
    }
  },
};
