PokeDex
=====================================

Pages
----------------
- Pokemon list page
- Pokemon detail view page
- New pokemon form page


Pokedex flow
----------------

### Demo
![Alt Text](https://github.com/tonychew1986/react-pokedex/demo.gif)

### Usage flow
1. User enters page with paginated list of 1st 20 pokemons
2. They are able to navigate through all pokemons through the navigation
3. Pokemon id are not sequential
4. Upon clicking, they should be able to view pokemon details in a separate page
5. They can also choose to add a new pokemon (external of PokeApi)
6. They can fill in a form to add the pokemon
7. The newly added pokemon should be reflected in the paginated list with the pre-existing pokemons
8. Details of the newly added pokemon can also be viewed upon clicking

### Existing pokemons implementation
- Call PokeApi & insert into Redux store
- Retrieve pokemon count to determine pagination
- Display pokemon on to UI with pagination
- Each page consist of 20 pokemon
- so total page will be 1154/20
- each pokemon has an id
- when pokemon is clicked on, retrieve data from id
- pokemon id not in sequential order

### New pokemon
- Append from total pokemon count (1154)
- existing pokemon can be retrieved live from pokeApi
- new pokemon needs to be stored in redux store
- will require a local 'new pokemon addition' array
- new pokemon will require prefix to id (due to non-sequential order of pokemon from pokeApi)

## Issues faced
- pokemon id is not in sequential order
- newly added pokemon cannot follow id in terms of sequential order
- give it a unique identifier before the id
- cannot use id to determine if a detail page is empty or does not contain pokemon
- on the last page of the list new + existing pokemon, it will require application logic to display it properly
- can't combine new + existing pokemon due to data structure considerations
- thought of implementing one big object that incrementally appends when adding new pokemon or querying existing pokemon but decided against it. Scaling and code reasoning issues


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
