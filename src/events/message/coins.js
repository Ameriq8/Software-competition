const BaseEvent = require("../../utils/structures/BaseEvent");
const db = require("quick.db");
const Money = require("../../database/coins.js");
module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client, message) {
    if (message.author.bot) return;
    let boost = (await db.fetch(`Coinsboost_${message.guild.id}`)) || "false";
    let coinsboost = Math.ceil(Math.random() * 10) + 6;
    let coinsadd = Math.ceil(Math.random() * 4) + 1;
    // console.log(coinsadd + " Coins" + " " + message.author.username)
    Money.findOne(
      {
        userID: message.author.id
      },
      (err, money) => {
        if (err) console.log(err);
        if (!money) {
          const newMoney = new Money({
            userID: message.author.id,
            coins: coinsadd,
            UserName: message.author.tag,
            Date: Date()
          });
          newMoney.save().catch(err => console.log(err));
        } else {
          if (boost == "false") {
            money.coins = money.coins + coinsadd;
            money.UserName = message.author.tag;

            money.save().catch(err => console.log(err));
          }
          if (boost == "true") {
            money.coins = money.coins + coinsboost;
            money.UserName = message.author.tag;
            money.save().catch(err => console.log(err));
          }
        }
      }
    );
  }
};
