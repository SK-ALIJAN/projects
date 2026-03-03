const sequelize = require(".");
const Currency = require("../../models/Currency.model");

const seedCurrencyMaster = async () => {
  const currencyMasterData = [
    {
      currency: "Australian Dollar",
      code: "AUD",
      display_text: "$"
    },
    {
      currency: "Brazilian Real",
      code: "BRL",
      display_text: "R$"
    },
    {
      currency: "British Pound Sterling",
      code: "GBP",
      display_text: "£"
    },
    {
      currency: "Canadian Dollar",
      code: "CAD",
      display_text: "$"
    },
    {
      currency: "Chinese Yuan",
      code: "CNY",
      display_text: "¥"
    },
    {
      currency: "Czech Koruna",
      code: "CZK",
      display_text: "Kč"
    },
    {
      currency: "Danish Krone",
      code: "DKK",
      display_text: "kr"
    },
    {
      currency: "Euro",
      code: "EUR",
      display_text: "€"
    },
    {
      currency: "Hong Kong Dollar",
      code: "HKD",
      display_text: "$"
    },
    {
      currency: "Hungarian Forint",
      code: "HUF",
      display_text: "Ft"
    },
    {
      currency: "Indian Rupee",
      code: "INR",
      display_text: "₹"
    },
    {
      currency: "Indonesian Rupiah",
      code: "IDR",
      display_text: "Rp"
    },
    {
      currency: "Israeli Shekel",
      code: "ILS",
      display_text: "₪"
    },
    {
      currency: "Japanese Yen",
      code: "JPY",
      display_text: "¥"
    },
    {
      currency: "Malaysian Ringgit",
      code: "MYR",
      display_text: "RM"
    },
    {
      currency: "Mexican Peso",
      code: "MXN",
      display_text: "$"
    },
    {
      currency: "New Taiwan Dollar",
      code: "TWD",
      display_text: "NT$"
    },
    {
      currency: "New Zealand Dollar",
      code: "NZD",
      display_text: "$"
    },
    {
      currency: "Norwegian Krone",
      code: "NOK",
      display_text: "kr"
    },
    {
      currency: "Philippine Peso",
      code: "PHP",
      display_text: "₱"
    },
    {
      currency: "Polish Zloty",
      code: "PLN",
      display_text: "zł"
    },
    {
      currency: "Russian Ruble",
      code: "RUB",
      display_text: "₽"
    },
    {
      currency: "Saudi Riyal",
      code: "SAR",
      display_text: "ر.س"
    },
    {
      currency: "Singapore Dollar",
      code: "SGD",
      display_text: "$"
    },
    {
      currency: "South African Rand",
      code: "ZAR",
      display_text: "R"
    },
    {
      currency: "South Korean Won",
      code: "KRW",
      display_text: "₩"
    },
    {
      currency: "Swedish Krona",
      code: "SEK",
      display_text: "kr"
    },
    {
      currency: "Swiss Franc",
      code: "CHF",
      display_text: "CHF"
    },
    {
      currency: "Thai Baht",
      code: "THB",
      display_text: "฿"
    },
    {
      currency: "Turkish Lira",
      code: "TRY",
      display_text: "₺"
    },
    {
      currency: "United Arab Emirates Dirham",
      code: "AED",
      display_text: "د.إ"
    },
    {
      currency: "United States Dollar",
      code: "USD",
      display_text: "$"
    }
  ];


  // Check if the records already exist
  const existingCurrencies = await Currency.findAll({
    where: {
      code: currencyMasterData.map((data) => data.code),
    },
  });

  // Filter out the already existing currencies from the seed data
  const newCurrencies = currencyMasterData.filter(
    (data) =>
      !existingCurrencies.some((currency) => currency.code === data.code)
  );

  // If there are new currencies to be inserted, bulk create them
  if (newCurrencies.length > 0) {
    await Currency.bulkCreate(newCurrencies, {
      updateOnDuplicate: ["currency", "code", "display_text"],
    });
  }
};

module.exports = seedCurrencyMaster;
