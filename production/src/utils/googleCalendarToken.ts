const { OAuth2Client } = require('google-auth-library');
const config = require('../config');
const GoogleCalendar = require('../models/GoogleCalendar.model');
const moment = require('moment');
const { consoleLogger } = require('../config/log.config');

const client = new OAuth2Client(config.oAuthClientId, config.oAuthClientSecret)

exports.getAccessToken = async (googleCalendarID: any) => {
    const googleCalendar = await GoogleCalendar.findOne({
        where: { id: googleCalendarID }
    })

    const { access_token, refresh_token, token_expiry } = googleCalendar.dataValues;
    const timeNow = moment().format('YYYY-MM-DD HH:mm');
    const timeExpiry = moment(Number(token_expiry)).format('YYYY-MM-DD HH:mm');

    if (timeExpiry > timeNow) {
        return access_token;
    }

    await client.setCredentials({ refresh_token: refresh_token });
    const { credentials } = await client.refreshAccessToken();

    await GoogleCalendar.update(
        { access_token: credentials.access_token, token_expiry: credentials.expiry_date },
        { where: { id: googleCalendarID } }
    )

    return credentials.access_token;
}