
exports.seed = function(knex) {
  await knex("users").truncate();
};
