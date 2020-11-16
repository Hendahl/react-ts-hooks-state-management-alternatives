import * as t from "../../ts/types";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import PayloadComponent from "../../components/payload";
import FilterComponent from "../../components/filter";
import List from "@material-ui/core/List";
import ProgressComponent from "../../components/progress";
import React, { FC, useEffect } from "react";
import SearchComponent from "../../components/search";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";
import { getTodosApi } from "../../api";
import { RootState } from "../../stores/reduxtoolkit/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  filter,
  get,
  remove,
  removeAll,
  search,
  payloadVisible,
  searchVisible,
  toggle,
  toggleAll,
  updateAll,
} from "../../stores/reduxtoolkit/todos/slices";

const TodosContainer: FC = () => {
  const dispatch = useDispatch();
  const storeTodos = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(get(getTodosApi()));
  }, [dispatch]);

  useEffect(() => {
    if (storeTodos.isUpdating) {
      dispatch(updateAll());
    }
  }, [storeTodos.isUpdating, dispatch]);

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Redux - Toolkit
        </Box>
      </Typography>
      <ProgressComponent isUpdating={storeTodos.isUpdating} />
      <List>
        {storeTodos.isSearchVisible ? (
          <SearchComponent
            search={(searchTerm) =>
              dispatch(search({ searchTerm: searchTerm }))
            }
            filteredDataLength={storeTodos.filteredData.length}
            searchVisible={() => dispatch(searchVisible())}
          />
        ) : (
          <>
            <AddComponent add={(title) => dispatch(add({ title: title }))} />
            <FilterComponent
              filter={(dataFilter) => dispatch(filter({ filter: dataFilter }))}
              removeAll={() => dispatch(removeAll())}
              searchVisible={() => dispatch(searchVisible())}
              todos={storeTodos}
              toggleAll={(isAllCompleted) =>
                dispatch(toggleAll({ isAllCompleted: isAllCompleted }))
              }
            />
          </>
        )}
        {storeTodos.filteredData.map((_todo: t.TodoT) => (
          <TodoComponent
            key={_todo.id}
            remove={(todo) => dispatch(remove(todo))}
            todo={_todo}
            toggle={(todo) => dispatch(toggle(todo))}
          />
        ))}
        <PayloadComponent
          payloadVisible={() => dispatch(payloadVisible())}
          todos={storeTodos}
        />
      </List>
    </Container>
  );
};

export default TodosContainer;
