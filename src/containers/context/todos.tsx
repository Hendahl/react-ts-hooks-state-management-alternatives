import * as t from "../../ts/types";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import FilterComponent from "../../components/filter";
import List from "@material-ui/core/List";
import PayloadComponent from "../../components/payload";
import ProgressComponent from "../../components/progress";
import React, { FC, useContext, useEffect } from "react";
import SearchComponent from "../../components/search";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";
import { Context } from "../../stores/context";

const TodosContainer: FC = () => {
  const { todos, dispatch } = useContext(Context);

  useEffect(() => {
    if (todos.isUpdating) {
      dispatch({ type: t.UPDATE });
    }
  }, [todos, dispatch]);

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Context
        </Box>
      </Typography>
      <ProgressComponent isUpdating={todos.isUpdating} />
      <List>
        {todos.isSearchVisible ? (
          <SearchComponent
            dataFilteredLength={todos.dataFiltered.length}
            search={(searchTerm) => dispatch({ type: t.SEARCH, searchTerm })}
            searchVisible={() => dispatch({ type: t.VISIBILITY_SEARCH })}
          />
        ) : (
          <>
            <AddComponent
              add={(title) => dispatch({ type: t.ADD, title: title })}
            />
            <FilterComponent
              filter={(dataFilter) =>
                dispatch({
                  type: t.FILTER,
                  visibiltityFilter: dataFilter,
                })
              }
              removeAll={() => dispatch({ type: t.REMOVE_ALL })}
              searchVisible={() => dispatch({ type: t.VISIBILITY_SEARCH })}
              todos={todos}
              toggleAll={(isAllCompleted) =>
                dispatch({
                  type: t.TOGGLE_ALL,
                  isAllCompleted: isAllCompleted,
                })
              }
            />
          </>
        )}
        {todos.dataFiltered.map((_todo: t.TodoT) => (
          <TodoComponent
            key={_todo.id}
            remove={(todo) => dispatch({ type: t.REMOVE, id: todo.id })}
            todo={_todo}
            toggle={(todo) => dispatch({ type: t.TOGGLE, todo: todo })}
          />
        ))}
        <PayloadComponent
          payloadVisible={() => dispatch({ type: t.VISIBILITY_PAYLOAD })}
          todos={todos}
        />
      </List>
    </Container>
  );
};

export default TodosContainer;
