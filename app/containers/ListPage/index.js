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
  retrievePokemon
} from './actions';

export function ListPage({
  listPage,
  onRetrievePokemon
}) {
  useInjectReducer({ key: 'listPage', reducer });
  useInjectSaga({ key: 'listPage', saga });

  // const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(retrievePokemon());
    onRetrievePokemon(1)
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
                <div>{(row.state.pageIndex * 20) + (parseInt(row.row.id) + 1)}</div>
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

  function Table({
    columns,
    data,
    fetchData,
    pageCount: controlledPageCount
  }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page

      // The rest of these things are super handy, too ;)
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: {
          pageIndex: 0,
          pageSize: 20
        },
        manualPagination: true,
        pageCount: Math.ceil(controlledPageCount / 20),
      },
      usePagination
    )

    React.useEffect(() => {
      fetchData({ pageIndex })
    }, [fetchData, pageIndex])

    // Render the UI for your table
    return (
      <>
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
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>
                          <Link to={`/detail/${((pageIndex * 20) + (i+1))}`}>
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
        {/*
          Pagination can be built however you'd like.
          This is just a very basic UI implementation:
        */}
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    )
  }

  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ pageIndex }) => {
    console.log('xxx', pageIndex)

    // const fetchId = ++fetchIdRef.current
    //
    // setTimeout(() => {
    //   // Only update the data if this is the latest fetch
    //   if (fetchId === fetchIdRef.current) {
    //     onRetrievePokemon(pageIndex)
    //   }
    // }, 1000)
  }, [])

  return (
    <div>
      <FormattedMessage {...messages.header} />
      {listPage.pokemonCount}
      <Styles>
        <Table
          columns={columns}
          data={listPage.pokemonList}
          fetchData={fetchData}
          pageCount={listPage.pokemonCount}
        />
      </Styles>

      <div>
        <Link to="/form">
          <button>
            Add pokemon
          </button>
        </Link>
      </div>
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ListPage);
