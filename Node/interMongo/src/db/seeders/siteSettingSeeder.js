const SiteSetting = require("../../models/SiteSetting.model");

const isInitialRun = async () => {
  const count = await SiteSetting.count();
  return count === 0;
};

const seedSiteSetting = async () => {
  const SiteSettingData = [
    {
      site_name: "Leap Beyond",
      email: "leapbeyond@gmail.com",
      mobile_no: "9876543210",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  // express server
  if (await isInitialRun()) {
    await SiteSetting.bulkCreate(SiteSettingData, {
      updateOnDuplicate: ["site_name", "email", "mobile_no"],
    });
  } else {
    console.log("Site Setting already exist, skipping seeding.");
  }
};

module.exports = seedSiteSetting;
