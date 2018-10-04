import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolBar'
import EnhancedTableHead from '../EnhancedTableHead/EnhancedTableHead';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

let counter = 0;

function createData(status, queueName, scheduleName, holidayName, promptStatus) {
  counter += 1;
  return { id: counter, status, queueName, scheduleName, holidayName, promptStatus };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

interface IStateTable {
  data: any,
  order: any,
  orderBy: any,
  selected: any,
  page: any,
  rowsPerPage: any,
}

interface IPropsTable {
}

class EnhancedTable extends React.Component<WithStyles<typeof styles> & IPropsTable, IStateTable> {
  state = {
    order: 'asc',
    orderBy: 'queueName',
    selected: [],
    data: [
      createData('Open', 'Brooklyn', "Regular Hours", "Regular", "ON"),
      createData('Open', 'Brooklyn', "Regular Hours", "Regular", "ON"),
      createData('Open', 'Brooklyn', "Regular Hours", "Regular", "ON"),
      createData('Closing', 'Brooklyn', "Regular Hours", "Regular", "OFF"),
      createData('Closed', 'Brooklyn', "Regular Hours", "Regular", "OFF"),
      createData('Closing', 'Brooklyn', "Regular Hours", "Regular", "ON"),
      createData('Closed', 'Brooklyn', "Regular Hours", "Regular", "ON"),
    ],
    page: 0,
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    // const selected: any[] = this.state.selected
    // const selectedIndex = selected.indexOf(id);
    // let newSelected: any[] = [];

    // console.log("selected", selected);
    // console.log("selected Index", selectedIndex);
    
    
    // if(newSelected.length === 0) {
    //   newSelected.push(selected)
    // } else {
    //   newSelected = []
    // }

    // this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => {
    let selected: number[] = this.state.selected
    return selected.indexOf(id) !== -1;
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (  
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  let statusStyle = "";
                  switch (n.status) {
                    case "Open":
                    statusStyle = "#01d901"
                      break;
                    case "Closed":
                    statusStyle = "#d90101"
                    break;
                    case "Closing":
                    statusStyle = "#FDDD08"
                      break;
                    default:
                    statusStyle = "#d90101"
                      break;
                  }
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell component="th" scope="row" padding="default">
                      <div style={{display: "flex", alignItems: "center"}}>
                        <div style={{width: "10px", height: "10px", borderRadius: "50%", backgroundColor: statusStyle}}></div>
                        <div style={{paddingLeft: "5px"}}>{n.status}</div>
                      </div>
                        
                      </TableCell>
                      <TableCell>{n.queueName}</TableCell>
                      <TableCell>{n.scheduleName}</TableCell>
                      <TableCell>{n.holidayName}</TableCell>
                      <TableCell>{n.promptStatus}</TableCell>
                      <TableCell><button>EDIT</button></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(EnhancedTable);