/**
 *
 * FormPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFormPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { useForm } from 'react-hook-form';

export function FormPage() {
  useInjectReducer({ key: 'formPage', reducer });
  useInjectSaga({ key: 'formPage', saga });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <FormattedMessage {...messages.header} />

      <button>
        Randomise pokemon data
      </button>

      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('abilities')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('base_experience')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('forms')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('game_indices')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('height')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('held_items')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('id')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('location_area_encounters')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('moves')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('name')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('order')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('past_types')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('species')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('sprites')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('stats')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('types')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('weight')} />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register('lastName', { required: true })} />
        </div>
        {errors.lastName && <p>Last name is required.</p>}
        <input {...register('age', { pattern: /\d+/ })} />
        {errors.age && <p>Please enter number for age.</p>}
        <input type="submit" />
      </form>
    </div>
  );
}

FormPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  formPage: makeSelectFormPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FormPage);
