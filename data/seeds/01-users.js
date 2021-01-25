//Pre-hashed password for "foobar"
const hashedPassword = "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
exports.seed = async function(knex) {
  await knex("users").insert([
    {"id": 1, "username": "captainmarvel", "password": hashedPassword },
    {"id": 2, "username": "ironman", "password": hashedPassword },
    {"id": 3, "username": "thor", "password": hashedPassword },
 ])
};