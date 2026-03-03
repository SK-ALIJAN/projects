const sequelize = require(".");
const Admin = require("../../models/Admin.model");

const seedAdminMaster = async () => {
  const AdminData = [
    {
      name: "Creoo",
      slug: "tech-creoo",
      email: "tech@creoo.co",
      // Cr3oo@92X!mT
      password: "$2b$10$xVxqGFIjEHh55Pn7P4XE4ee25iUB5wERF7nXxRkvu/6qkNQgsQzQi",
      designation: "Manager",
      department: "Sales",
      country_code: 1,
      mobile: 1234567890,
      about: "Experienced sales manager with over 10 years in the industry.",
      profile_image: "profile_image_url",
      user_type: "admin",
      status: 1,
      is_deleted: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  // express server

  await Admin.bulkCreate(AdminData, {
    updateOnDuplicate: [
      "name",
      "slug",
      "email",
      "password",
      "designation",
      "department",
    ],
  });
};

module.exports = seedAdminMaster;
