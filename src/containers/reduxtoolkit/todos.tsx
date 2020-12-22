import * as slices from "../../stores/reduxtoolkit/todos/slices";
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
import { getTodosApi } from "../../api";
import { RootState } from "../../stores/reduxtoolkit/rootReducer";
import { useDispatch, useSelector } from "react-redux";

const TodosContainer: FC = () => {
  const dispatch = useDispatch();
  const storeTodos = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(slices.get(getTodosApi()));
  }, [dispatch]);

  useEffect(() => {
    if (storeTodos.isUpdating) {
      dispatch(slices.updateAll());
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
              dispatch(slices.search({ searchTerm: searchTerm }))
            }
            dataFilteredLength={storeTodos.dataFiltered.length}
            searchVisible={() => dispatch(slices.searchVisible())}
          />
        ) : (
          <>
            <AddComponent
              add={(title) => dispatch(slices.add({ title: title }))}
            />
            <FilterComponent
              filter={(dataFilter) =>
                dispatch(slices.filter({ filter: dataFilter }))
              }
              removeAll={() => dispatch(slices.removeAll())}
              searchVisible={() => dispatch(slices.searchVisible())}
              todos={storeTodos}
              toggleAll={(isAllCompleted) =>
                dispatch(slices.toggleAll({ isAllCompleted: isAllCompleted }))
              }
            />
          </>
        )}
        {storeTodos.dataFiltered.map((_todo: t.TodoT) => (
          <TodoComponent
            key={_todo.id}
            remove={(todo) => dispatch(slices.remove(todo))}
            todo={_todo}
            save={(todo) => dispatch(slices.save(todo))}
          />
        ))}
        <PayloadComponent
          payloadVisible={() => dispatch(slices.payloadVisible())}
          todos={storeTodos}
        />
      </List>
    </Container>
  );
};

export default TodosContainer;
