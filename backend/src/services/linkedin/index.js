const axios = require('axios')

const apiLinkedin = axios.create({
  baseURL: 'https://api.linkedin.com',
})


const sendMessage = async (accessToken, personId, message) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  const body = {
    eventCreate: {
      value: {
        event: {
          type: 'MESSAGE',
          message: {
            text: message,
          },
        },
        recipients: {
          values: [
            {
              person: {
                entityUrn: `urn:li:person:${personId}`,
              },
            },
          ],
        },
      },
    },
  };

  try {
    const { data } = await apiLinkedin.post('/v2/message', body, config)

    return data
  }catch(error) {
    console.error(error);
  }
}

exports.linkedinServices = {
  sendMessage
}