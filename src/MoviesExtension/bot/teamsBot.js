const axios = require("axios");
const querystring = require("querystring");
const { TeamsActivityHandler, CardFactory, TurnContext} = require("botbuilder");
const rawWelcomeCard = require("./adaptiveCards/welcome.json");
const rawLearnCard = require("./adaptiveCards/learn.json");
const cardTools = require("@microsoft/adaptivecards-tools");

class TeamsBot extends TeamsActivityHandler {
  async handleTeamsMessagingExtensionQuery(context, query) {
    const searchQuery = query.parameters[0].value;

    var options = {
      params: {q: searchQuery},
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': 'd40759f62bmsh5ed975582143c85p1b2f22jsnf81127f18b6e'
      }
    };

    const response = await axios.get('https://imdb8.p.rapidapi.com/auto-complete', options);

    const attachments = [];

    response.data.d.forEach((obj) => {
      const heroCard = CardFactory.heroCard(obj.l, obj.s, [], 
          CardFactory.actions([
            {
              type: 'openUrl',
              title: 'Ver en IMDB',
              value: 'https://www.imdb.com/title/' + obj.id
            }
          ])
        );
      const preview = CardFactory.heroCard(obj.l, obj.s);
      preview.content.tap = {
        type: "showImage",
        value: { name: obj.l, description: obj.s }
      };
      const attachment = { ...heroCard, preview };
      attachments.push(attachment);
    });

    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: attachments,
      },
    };
    
  }
}

module.exports.TeamsBot = TeamsBot;