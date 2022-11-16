export default {
  async contactLehrer(context, payload) {
    const newAnfrage = {
      // id: new Date().toISOString(),
      lehrerId: payload.lehrerId,
      userEmail: payload.email,
      message: payload.message,
    };

    const url = `https://vue-project-a2db0-default-rtdb.firebaseio.com/anfragen/${payload.lehrerId}.json`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newAnfrage),
    });

    const responseData = await response.json();
    //console.log(responseData);

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Anfrage konnte nicht versendet werden'
      );
      throw error;
    }

    newAnfrage.id = responseData.name;
    //console.log(newAnfrage);
    newAnfrage.lehrerId = payload.lehrerId;

    context.commit('addAnfrage', newAnfrage);
  },

  /* ------------------------- */
  async fetchAnfragen(context) {
    const lehrerId = context.rootGetters.userId;
    const url = `https://vue-project-a2db0-default-rtdb.firebaseio.com/anfragen/${lehrerId}.json`;
    const response = await fetch(url);

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Anfrage konnte nicht geladen werden'
      );
      throw error;
    }

    const anfragen = [];

    for (const key in responseData) {
      const anfrage = {
        id: key,
        lehrerId: lehrerId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };

      anfragen.push(anfrage);
    }

    context.commit('setAnfragen', anfragen);
  },
};
