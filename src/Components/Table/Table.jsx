import * as React from 'react';
import {
  Paper,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  Chip,
  TextField,
  styled,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Footer from './Extras/Footer';
import PropTypes from 'prop-types';

const StyledButton = styled(Button)({
  color: 'white',
  backgroundImage: 'linear-gradient(#454545, transparent)',
  backgroundColor: 'black',
  borderRadius: 8,
  transition: 'cubic-bezier(0.4, 0, 0.25, 0.6) 200ms',
  '&:hover': {
    backgroundColor: '#454545',
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  paddingLeft: theme.spacing(2), // Define um padding padrão
  paddingRight: theme.spacing(2), // Define um padding padrão
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(1), // Ajuste para telas menores
    paddingRight: theme.spacing(1), // Ajuste para telas menores
    fontSize: '0.65rem',
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='primeira página'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='página anterior'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='próxima página'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='última página'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const TableStatus = (status) => {
  return (
    <Chip
      label={status}
      sx={{
        bgcolor: 'transparent',
        borderRadius: '999px',
        border:
          status === 'Concluido'
            ? '1px solid rgb(197, 247, 197)'
            : status === 'Em Andamento'
              ? '1px solid rgb(218, 222, 231)'
              : '1px solid rgb(253, 206, 206)',
        height: 'auto',
        color:
          status === 'Concluido'
            ? 'rgb(31, 122, 31)'
            : status === 'Em Andamento'
              ? 'rgb(86, 100, 129)'
              : 'rgb(145, 8, 8)',
        '& .MuiChip-label': {
          fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' }, // Fontes responsivas
          fontWeight: 700,
        },
      }}
    />
  );
};

TableStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default function ToDoTable() {
  const [todo, setTodo] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const [todoError, setTodoError] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleAddTodo = () => {
    setIsVisible(!isVisible);
  };

  const handleSaveTodo = (value) => {
    if (!todo) return setTodoError('Por favor, coloque um valor valido.');
    setRows((prevRows) => [
      {
        id: prevRows.length + 1,
        todo: value,
        startDate: new Date().toLocaleDateString('pt-BR'),
        endDate: '',
        status: 'Em Andamento',
      },
      ...prevRows,
    ]);
    if (todoError) setTodoError('');
    setIsVisible(false);
    setTodo('');
    const newRow = {
      id: rows.length + 1,
      todo: value,
      startDate: new Date().toLocaleDateString('pt-BR'),
      endDate: '',
      status: 'Em Andamento',
    };
    const updatedRows = [newRow, ...rows];
    localStorage.setItem('rows', JSON.stringify(updatedRows));
  };

  const handleCancelAddTodo = () => {
    if (todoError) setTodoError('');
    setIsVisible(false);
    setTodo('');
  };

  const handleSetFinished = () => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (selectedRows.includes(row.id)) {
          // Remove o ID da lista de selecionados
          setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.filter((id) => id !== row.id),
          );
          // Atualiza o status e a data de conclusão
          return {
            ...row,
            endDate: new Date().toLocaleDateString('pt-BR'),
            status: 'Concluido',
          };
        }
        return row;
      });
      localStorage.setItem('rows', JSON.stringify(updatedRows));
      return updatedRows;
    });
  };

  const handleSetCanceled = () => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (selectedRows.includes(row.id)) {
          // Remove o ID da lista de selecionados
          setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.filter((id) => id !== row.id),
          );
          // Atualiza o status e a data de conclusão
          return {
            ...row,
            status: 'Cancelado',
          };
        }
        return row;
      });
      localStorage.setItem('rows', JSON.stringify(updatedRows));
      return updatedRows;
    });
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) setRows(JSON.parse(savedRows));
  }, []);

  return (
    <>
      <Box my={3} display={'flex'} flexDirection={'column'} gap={2}>
        <Box width={'100%'}>
          <Typography
            variant='h3'
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, // Fontes responsivas
            }}
          >
            Lista de Afazeres
          </Typography>
        </Box>
        <Box width={'100%'} display={'flex'} justifyContent={'end'} gap={1}>
          <StyledButton
            onClick={() => {
              if (selectedRows.some((currentValue) => currentValue > 0)) {
                return handleSetFinished();
              }
              if (!isVisible) return handleAddTodo();
              handleSaveTodo(todo);
            }}
          >
            {isVisible
              ? 'Salvar Afazer'
              : selectedRows.some((currentValue) => currentValue > 0)
                ? 'Marcar como Concluido'
                : 'Adicionar Afazer'}
          </StyledButton>
          {isVisible && (
            <StyledButton onClick={() => handleCancelAddTodo()}>
              Cancelar
            </StyledButton>
          )}
          {selectedRows.some((currentValue) => currentValue > 0) && (
            <StyledButton onClick={() => handleSetCanceled()}>
              Cancelar Afazer
            </StyledButton>
          )}
        </Box>
      </Box>
      <Box>
        <TableContainer
          component={Paper}
          elevation={14}
          sx={{
            maxHeight: { xs: '67vh', sm: '76vh' },
            borderRadius: 5,
          }}
        >
          <Table aria-label='Lista de Afazeres' stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell>Afazer</TableCell>
                <TableCell align='right'>Início</TableCell>
                <TableCell align='right'>Conclusão</TableCell>
                <TableCell align='right'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isVisible && (
                <TableRow>
                  <StyledTableCell>
                    <TextField
                      id='todo'
                      label='Afazer'
                      value={todo}
                      onChange={(e) => setTodo(e.target.value)}
                      error={!!todoError}
                      helperText={todoError}
                      slotProps={{
                        input: {
                          sx: {
                            borderRadius: 3,
                          },
                        },
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {new Date().toLocaleDateString('pt-BR')}
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align='right'>
                    {TableStatus('Em Andamento')}
                  </StyledTableCell>
                </TableRow>
              )}
              {/* eslint-disable indent */}
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.id}>
                  <StyledTableCell>
                    <Checkbox
                      size='small'
                      value='Afazer'
                      disabled={row.status !== 'Em Andamento'}
                      checked={selectedRows.includes(row.id)}
                      onChange={() => {
                        if (selectedRows.includes(row.id)) {
                          return setSelectedRows((prevSelectedRows) =>
                            prevSelectedRows.filter((id) => id !== row.id),
                          );
                        }
                        setSelectedRows((prevSelectedRows) => [
                          ...prevSelectedRows,
                          row.id,
                        ]);
                      }}
                      color='primary'
                    />
                    {row.todo}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.startDate}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{row.endDate}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {TableStatus(row.status)}
                  </StyledTableCell>
                </TableRow>
              ))}
              {/* eslint-enable indent */}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    10,
                    15,
                    25,
                    { label: 'Todas', value: -1 },
                  ]}
                  colSpan={4}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'Linhas por páginas',
                      },
                      native: true,
                    },
                  }}
                  labelRowsPerPage='Linhas por páginas:'
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  sx={{
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: 'white',
                    zIndex: 1, // Para garantir que o footer esteja acima de outros elementos
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </>
  );
}
