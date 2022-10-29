/**
 *
 * Form
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { useForm } from 'react-hook-form';

import Select from 'react-select';


const typesOptions = [
  { value: 'water', label: 'Water' },
  { value: 'fire', label: 'Fire' },
  { value: 'grass', label: 'Grass' },
  { value: 'ground', label: 'Ground' },
  { value: 'rock', label: 'Rock' },
  { value: 'steel', label: 'Steel' },
  { value: 'ice', label: 'Ice' },
  { value: 'electric', label: 'Electric' },
  { value: 'dragon', label: 'Dragon' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'psychic', label: 'Psychic' },
  { value: 'normal', label: 'Normal' },
  { value: 'fighting', label: 'Fighting' },
  { value: 'poison', label: 'Poison' },
  { value: 'bug', label: 'Bug' },
  { value: 'flying', label: 'Flying' },
  { value: 'dark', label: 'Dark' },
  { value: 'fairy', label: 'Fairy' }
]

function Form({
  listPage,
  onAddPokemon,
  closeModal
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <button>
        Randomise pokemon data
      </button>
      
      <form onSubmit={handleSubmit((data) => {onAddPokemon(data); closeModal()})}>
        <div>
          <label htmlFor="id">Id</label>
          {listPage.pokemonCount + listPage.newPokemons.length + 1}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input {...register('name', { required: true })} />
          {errors.name && <p>Name is required.</p>}
        </div>
        <div>
          <label htmlFor="abilities">Abilities</label>
          <input {...register('abilities')} />
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input {...register('height', { required: true, pattern: /\d+/ })} />
          {errors.height && <p>Please enter number for height.</p>}
        </div>
        <div>
          <label htmlFor="weight">Weight</label>
          <input {...register('weight', { required: true, pattern: /\d+/ })} />
          {errors.weight && <p>Please enter number for weight.</p>}
        </div>
        <div>
          <label htmlFor="moves">Moves</label>
          <input {...register('moves')} />
        </div>
        <div>
          <label htmlFor="order">Order</label>
          <input {...register('order')} />
        </div>
        <div>
          <label htmlFor="species">Species</label>
          <input {...register('species')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('sprites')} />
        </div>
        <div>
          <label htmlFor="stats">Stats</label>
          <input {...register('stats')} />
        </div>
        <div>
          <label htmlFor="types">Types</label>
          <Select
            defaultValue={[]}
            isMulti
            name="colors"
            options={typesOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

Form.propTypes = {};

export default Form;
