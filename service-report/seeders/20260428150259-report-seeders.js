"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("reports", [
      {
        street_name: "Jalan Riau",
        description: "Jalanan berlubang dan berbahaya",
        status: "reported",
        reporter_id: 1,
        media_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        street_name: "Jalan Mastrip",
        description:
          "Jalanan licin karena banyak minyak tumpah akibat kecelakaan",
        status: "reported",
        reporter_id: 2,
        media_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("reports", null, {});
  },
};
