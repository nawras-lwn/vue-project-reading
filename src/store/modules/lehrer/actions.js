export default {
  async registerLehrer(context, data) {
    const userId = context.rootGetters.userId;
    const lehrerData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const url = `https://vue-project-a2db0-default-rtdb.firebaseio.com/lehrer/${userId}.json`;
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(lehrerData),
    });

    // const responseData = await response.json()

    if (!response.ok) {
      // error
    }

    context.commit('registerLehrer', {
      ...lehrerData,
      id: userId,
    });
  },

  async loadLehrer(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const url = `https://vue-project-a2db0-default-rtdb.firebaseio.com/lehrer.json`;

    const response = await fetch(url);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    console.log(responseData);

    const lehrers = [];

    for (const key in responseData) {
      console.log(key, responseData);
      const lehrer = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      lehrers.push(lehrer);
    }

    context.commit('setLehrer', lehrers);
    context.commit('setFetchTimestamp');
  },
};
