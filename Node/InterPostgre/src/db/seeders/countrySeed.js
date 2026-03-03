const sequelize = require(".");
const Country = require("../../models/Country.model");

const isInitialRun = async () => {
  const count = await Country.count();
  return count === 0;
};

const seedCountry = async () => {
  const CountryData = [
    {
      country_name: "India",
      country_slug: "india",
      details: "South Asian country known for its diverse culture and history.",
      sequence: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      country_name: "United States of America",
      country_slug: "usa",
      details:
        "A North American country known for its diverse culture and global influence.",
      sequence: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  // express server
  if (await isInitialRun()) {
    await Country.bulkCreate(CountryData, {
      updateOnDuplicate: ["country_name", "country_slug", "details"],
    });
  } else {
    console.log("Countries already exist, skipping seeding.");
  }
};

module.exports = seedCountry;
