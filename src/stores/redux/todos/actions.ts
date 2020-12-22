import * as t from "../../../ts/types";

export const add: t.Add = (title) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.ADD, title: title });
  };
};

export const filter: t.Filter = (dataFilter) => {
  return (dispatch: t.Dispatch) => {
    dispatch({
      type: t.FILTER,
      visibiltityFilter: dataFilter,
    });
  };
};

export const get: t.Get = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.GET });
  };
};

export const payloadVisible: t.Visibility = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.VISIBILITY_PAYLOAD });
  };
};

export const remove: t.Remove = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.REMOVE, id: todo.id });
  };
};

export const removeAll: t.RemoveAll = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.REMOVE_ALL });
  };
};

export const search: t.Search = (searchTerm) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SEARCH, searchTerm: searchTerm });
  };
};

export const searchVisible: t.Visibility = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.VISIBILITY_SEARCH });
  };
};

export const save: t.Save = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SAVE, todo: todo });
  };
};

export const toggleAll: t.ToggleAll = (isAllCompleted) => {
  return (dispatch: t.Dispatch) => {
    dispatch({
      type: t.TOGGLE_ALL,
      isAllCompleted: isAllCompleted,
    });
  };
};

export const updateAll: t.UpdateAll = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.UPDATE });
  };
};
