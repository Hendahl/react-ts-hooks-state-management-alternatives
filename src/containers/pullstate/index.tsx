import * as t from "../../ts/types";
import * as utils from "../../utils";
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
import { getFilteredDataApi, getTodosApi, setTodosApi } from "../../api";
import { pullStateStore } from "../../stores/pullstate";

const TodosContainer: FC = () => {
  const todosStore = pullStateStore.useState((s) => s);

  useEffect(() => {
    pullStateStore.update(() => {
      return getTodosApi();
    });
  }, []);

  useEffect(() => {
    if (todosStore.isUpdating) {
      pullStateStore.update(() => {
        return getFilteredDataApi(todosStore);
      });
    }
  }, [todosStore]);

  const handleAdd: t.Add = (title) => {
    pullStateStore.update((s) => {
      s.countAll = s.countAll + 1;
      s.isUpdating = true;
      s.data = [
        { id: utils.uuid(), isCompleted: false, title: title },
        ...s.data,
      ];
      s.dataFilter = t.FILTER_ALL;
    });
  };

  const handleFilter: t.Filter = (dataFilter) => {
    pullStateStore.update((s) => {
      s.isUpdating = true;
      s.dataFilter = dataFilter;
    });
  };

  const handlePayloadVisibility: t.Visibility = () => {
    pullStateStore.update((s) => {
      s.isPayloadVisible = !s.isPayloadVisible;
    });
  };

  const handleSearch: t.Search = (searchTerm) => {
    pullStateStore.update((s) => {
      s.filteredData = s.data.filter((_todo: t.TodoT) =>
        _todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      s.dataFilter = t.FILTER_ALL;
    });
  };

  const handleSearchVisibility: t.Visibility = () => {
    pullStateStore.update((s) => {
      s.isSearchVisible = !s.isSearchVisible;
      s.isUpdating = true;
    });
  };

  const handleRemove: t.Remove = (todo) => {
    pullStateStore.update((s) => {
      s.data = s.data.filter((_todo: t.TodoT) => _todo.id !== todo.id);
      s.countAll = --s.countAll;
      s.countCompleted = s.data.filter(
        (_todo: t.TodoT) => _todo.isCompleted
      ).length;
      s.isUpdating = true;
    });
  };

  const handleRemoveAll: t.RemoveAll = () => {
    pullStateStore.update((s) => {
      setTodosApi(t.initialTodos);
      return t.initialTodos;
    });
  };

  const handleToggle: t.Toggle = (todo) => {
    pullStateStore.update((s) => {
      s.data = s.data.map((_todo: t.TodoT) =>
        _todo.id === todo.id
          ? { ..._todo, isCompleted: !_todo.isCompleted }
          : _todo
      );
      s.countCompleted = s.data.filter((todo) => todo.isCompleted).length;
      s.isUpdating = true;
    });
  };

  const handleToggleAll: t.ToggleAll = (isAllCompleted) => {
    pullStateStore.update((s) => {
      s.data = s.data.map((_todo: t.TodoT) =>
        _todo.isCompleted === !isAllCompleted
          ? { ..._todo, isCompleted: isAllCompleted }
          : _todo
      );
      s.countCompleted = s.data.filter(
        (_todo: t.TodoT) => _todo.isCompleted
      ).length;
      s.isUpdating = true;
    });
  };

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Pullstate
        </Box>
      </Typography>
      <ProgressComponent isUpdating={todosStore.isUpdating} />
      <List>
        {todosStore.isSearchVisible ? (
          <SearchComponent
            searchVisible={handleSearchVisibility}
            search={handleSearch}
            filteredDataLength={todosStore.filteredData.length}
          />
        ) : (
          <>
            <AddComponent add={handleAdd} />
            <FilterComponent
              removeAll={handleRemoveAll}
              filter={handleFilter}
              searchVisible={handleSearchVisibility}
              toggleAll={handleToggleAll}
              todos={todosStore}
            />
          </>
        )}
        {todosStore.filteredData.map((_todo) => (
          <TodoComponent
            key={_todo.id}
            remove={handleRemove}
            toggle={handleToggle}
            todo={_todo}
          />
        ))}
        <PayloadComponent
          todos={todosStore}
          payloadVisible={handlePayloadVisibility}
        />
      </List>
    </Container>
  );
};

export default TodosContainer;
