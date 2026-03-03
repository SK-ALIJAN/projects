const sequelize = require(".");
const Master = require("../../models/DropdownModule.model");

const seedMaster = async () => {
  const MasterData = [
    {
      module_name: "can help you with",
      slug: "can-help-you-with",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "super power",
      slug: "super-power",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "industry",
      slug: "industry",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "career goal",
      slug: "career-goal",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "how do you want access",
      slug: "how-do-you-want-access",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "visa type",
      slug: "visa-type",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "tags",
      slug: "tags",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "city",
      slug: "city",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "degree",
      slug: "degree",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "university",
      slug: "university",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "country of origin",
      slug: "country-of-origin",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "feedback category",
      slug: "feedback-category",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "enquery status",
      slug: "enquery-status",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "offer type",
      slug: "offer-type",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "blog author",
      slug: "blog-author",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "blog category",
      slug: "blog-category",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "faq category",
      slug: "faq-category",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      module_name: "section",
      slug: "section",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  // Fetch existing records
  const existingRecords = await Master.findAll({
    attributes: ["slug"],
    raw: true,
  });

  const existingSlugs = existingRecords.map((record) => record.slug);

  // Filter out records that already exist
  const newRecords = MasterData.filter(
    (record) => !existingSlugs.includes(record.slug)
  );

  // Insert only the new records
  if (newRecords.length > 0) {
    await Master.bulkCreate(newRecords, {
      updateOnDuplicate: ["module_name", "slug"],
    });
  }
};

module.exports = seedMaster;
