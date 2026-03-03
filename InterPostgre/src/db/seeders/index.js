const seedAdminMaster = require("./adminSeeder");
const currencySeeder = require("./currencySeeder");
const serviceTypeSeeder = require("./serviceTypeSeeder");
const countrySeeder = require("./countrySeed");
const masterSeeder = require("./masterSeeder");
const seedSiteSetting = require("./siteSettingSeeder");

const seedMasterData = async () => {
  await currencySeeder();
  await serviceTypeSeeder();
  await seedAdminMaster();
  await countrySeeder();
  await masterSeeder();
  await seedSiteSetting();
};

module.exports = seedMasterData;
