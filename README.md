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

## Issues faced
- pokemon id is not in sequential order
- newly added pokemon cannot follow id in terms of sequential order
- give it a unique identifier before the id
- cannot use id to determine if a detail page is empty or does not contain pokemon


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
