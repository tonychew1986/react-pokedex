/**
 *
 * ListPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectListPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Modal from 'react-modal';
import Form from '../../components/Form';

import {
  Link,
} from 'react-router-dom';

import styled from 'styled-components'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

// import { useTable } from 'react-table'
import { useTable, usePagination } from 'react-table'

import {
  retrievePokemon,
  addPokemon,
  setPage
} from './actions';

export function ListPage({
  listPage,
  onRetrievePokemon,
  onAddPokemon,
  onSetPage
}) {
  useInjectReducer({ key: 'listPage', reducer });
  useInjectSaga({ key: 'listPage', saga });

  const [initated, setInitState] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  // const dispatch = useDispatch();
  useEffect(() => {
    // if (initated == 0) {
    onRetrievePokemon(1)
    //   setInitState(1)
    // }
  },[])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Pokemon',
        columns: [
          {
            Header: 'id',
            accessor: "",
            Cell: (row) => {
              return (
                <div>{((listPage.currentListPage) * 20) + (parseInt(row.row.id) + 1)}</div>
              )
            },
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Url',
            accessor: 'url',
          }
        ],
      },
    ],
    []
  )

  function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })

    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      <Link to={`/detail/${((1 * 20) + (i+1))}`}>
                        {cell.render('Cell')}
                      </Link>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }


  let totalPokemonCount = listPage.pokemonCount + listPage.newPokemons.length

  let maxPage = Math.ceil((listPage.pokemonCount + listPage.newPokemons.length)/20)

  return (

    <div>
      <FormattedMessage {...messages.header} />
      {totalPokemonCount} :: {listPage.pokemonCount} + {listPage.newPokemons.length}

      <div>
        <button onClick={() => openModal()}>
          Add pokemon
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Form listPage={listPage} onAddPokemon={onAddPokemon} closeModal={closeModal} />
      </Modal>

      <Link to="/detail/1154">
        link to existing pokemon
      </Link>
      <Link to="/detail/1155">
        link to new pokemon
      </Link>
      <Link to="/detail/1156">
        no such pokemon
      </Link>

      <Styles>
        <Table
          columns={columns}
          data={listPage.pokemonList}
        />

        {listPage.currentListPage > 1 && (
          <>
            <button onClick={() => onRetrievePokemon(1)}>
              first
            </button>
            <button onClick={() => onRetrievePokemon(listPage.currentListPage - 1)}>
              prev
            </button>
          </>
        )}
        {listPage.currentListPage < maxPage && (
          <>
            <button onClick={() => onRetrievePokemon(listPage.currentListPage + 1)}>
              next
            </button>
            <button onClick={() => onRetrievePokemon(maxPage)}>
              last
            </button>
          </>
        )}

        <div>
          Page {listPage.currentListPage} of {maxPage}
        </div>
      </Styles>

    </div>
  );
}

//  onClick={() => onRetrievePokemon()}

ListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listPage: makeSelectListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRetrievePokemon: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(retrievePokemon(evt));
    },
    onAddPokemon: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(addPokemon(evt));
    },
    onSetPage: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(setPage(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ListPage);
