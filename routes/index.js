
var express = require('express');
var router = express.Router();
const dataService = require('../data/dataService');



// Página de inicio: muestra todas las tarjetas de Pokémon
router.get('/', function(req, res, next) {
  const pokemon = dataService.findAllPokemons();
  const tipos = Array.from(dataService.findAllPokemonTypes());
  console.log('TYPES ENVIADOS A LA VISTA:', tipos);
  res.render('index', {
    title: 'PokéDex',
    descripcion: 'Enciclopedia Pokémon Completa',
    pokemon,
    tipos
  });
});


// Página de Pokémon por id
router.get('/pokemon/:id', function(req, res, next) {
  const poke = dataService.findPokemonById(req.params.id);
  const tipos = Array.from(dataService.findAllPokemonTypes());
  if (!poke) return res.status(404).render('error', { message: 'Pokémon no encontrado' });
  res.render('pokemon', {
    title: poke.nombre,
    pokemon: poke,
    tipos
  });
});


// Página de tipo
router.get('/tipo/:tipo', function(req, res, next) {
  const tipo = req.params.tipo;
  const pokes = dataService.findAllPokemonsByType(tipo);
  const tipos = Array.from(dataService.findAllPokemonTypes());
  res.render('tipo', {
    title: `Pokémon tipo ${tipo}`,
    descripcion: `Listado de Pokémon de tipo ${tipo}`,
    pokemon: pokes,
    tipos,
    tipo
  });
});

module.exports = router;
