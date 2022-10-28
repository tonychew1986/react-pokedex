PokeDex
=====================================

Pages
----------------
- Pokemon list page
- Pokemon detail view page
- New pokemon form page


Pokedex flow
----------------

### Existing pokemons
- Call PokeApi & insert into Redux store
- Retrieve pokemon count to determine pagination
- Display pokemon on to UI with pagination
- Each page consist of 20 pokemon
- so total page will be 1154/20
- each pokemon has an id
- when pokemon is clicked on, retrieve data from id

### New pokemon
- Append from total pokemon count (1154)
- existing pokemon can be retrieved live from pokeApi
- new pokemon needs to be stored in redux store
- will require a local 'new pokemon addition' array


## Instructions

To test application:

```bash
$ npm test
```

Install NPM modules on fresh deployment:

```bash
$ npm install
```

To run in development mode:

```bash
$ npm run start
```
