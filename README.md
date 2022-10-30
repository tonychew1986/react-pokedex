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
https://user-images.githubusercontent.com/6251226/198874428-5843a520-fd1f-490a-bf5b-fa78ccf9c0b3.mp4


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

## Decision for solving 'newly added pokemon' issues
1. Pokemon Id issues
Since pokemon from the API is not numbered in sequential order, I can't rely on using the id given by the API. Therefore I appended a prefix to differentiate newly added pokemon. Currently it looks a little awkward since the formatting is different. An alternative solution would be to hash the id to have a more symmetrical feel.

2. Data structure differences
List view, detail view & newly added pokemon uses 3 distinctly different data structures. This is due to PokeApi breaking down list & detail view into a reasonable querying format. Newly added pokemon however does not fit into this "list & detail view" structure.

Therefore a decision was made to split data from the PokeApi from newly generated pokemon. This would keep the application logic of pokemon origin separate in case there are future UI usecase where new pokemons will need to be displayed in a different manner

3. Mixing existing pokemon with newly added pokemon in paginated list
Since I now have 2 different list with different data structure, I'll need some application logic to normalise data before 'consolidating the list' together.

In the earlier stage, I contemplated joining the 2 list together. However I eventually decided to append the newly created pokemons after the pokemon from PokeApi using application logic.

There are different trade-off for each implementation method. The former would make sorting and searching based on attributes easier (if list API has more data besides URL). The latter is chosen since there is no sorting & searching requirements and having it as a separate list keep reasoning easier (due to data structure issues when displaying on detail view or when updating [nested data structure])

4. Representing pokemon detail view
Existing & new pokemon uses different data structure mentioned above. Therefore it requires some application logic to differentiate "new" vs "existing" vs "not found" pokemons.

Again new pokemon are kept separate from existing pokemons to make "editing" of attributes easier. This is assuming existing pokemons are non-immutable & new pokemon can be modified.

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
