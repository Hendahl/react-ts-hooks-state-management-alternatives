import * as actions from "../../stores/redux/todos/actions";
import * as t from "../../ts/types";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import FilterComponent from "../../components/filter";
import List from "@material-ui/core/List";
import PayloadComponent from "../../components/payload";
import ProgressComponent from "../../components/progress";
import React, { FC, useEffect } from "react";
import SearchComponent from "../../components/search";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const TodosContainer: FC = () => {
  const typedTodosSelector: TypedUseSelectorHook<t.TodosI> = useSelector;
  const storeTodos = typedTodosSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.get());
  }, [dispatch]);

  useEffect(() => {
    if (storeTodos.isUpdating) {
      dispatch(actions.updateAll());
    }
  }, [storeTodos, dispatch]);
  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Redux
        </Box>
      </Typography>
      <ProgressComponent isUpdating={storeTodos.isUpdating} />
      <List>
        {storeTodos.isSearchVisible ? (
          <SearchComponent
            search={(searchTerm) => dispatch(actions.search(searchTerm))}
            filteredDataLength={storeTodos.filteredData.length}
            searchVisible={() => dispatch(actions.searchVisible())}
          />
        ) : (
          <>
            <AddComponent add={(title) => dispatch(actions.add(title))} />
            <FilterComponent
              filter={(dataFilter) => dispatch(actions.filter(dataFilter))}
              removeAll={() => dispatch(actions.removeAll())}
              searchVisible={() => dispatch(actions.searchVisible())}
              todos={storeTodos}
              toggleAll={(isAllCompleted) =>
                dispatch(actions.toggleAll(isAllCompleted))
              }
            />
          </>
        )}
        {storeTodos.filteredData.map((_todo: t.TodoT) => (
          <TodoComponent
            key={_todo.id}
            remove={(todo) => dispatch(actions.remove(todo))}
            todo={_todo}
            toggle={(todo) => dispatch(actions.toggle(todo))}
          />
        ))}
        <PayloadComponent
          payloadVisible={() => dispatch(actions.payloadVisible())}
          todos={storeTodos}
        />
      </List>
    </Container>
  );
};

export default TodosContainer;
