import * as t from "../../../ts/types";

export const add: t.Add = (title) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.ADD, title: title });
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

export const edit: t.Edit = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.EDIT, todo: todo });
  };
};

export const filter: t.Filter = (visibilityFilter) => {
  return (dispatch: t.Dispatch) => {
    dispatch({
      type: t.FILTER,
      visibiltityFilter: visibilityFilter,
    });
  };
};

export const get: t.Get = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.GET });
  };
};

export const save: t.Save = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SAVE });
  };
};

export const search: t.Search = (searchTerm) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SEARCH, searchTerm: searchTerm });
  };
};

export const showEdit: t.ShowEdit = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SHOW_EDIT, todo: todo });
  };
};

export const showSearch: t.ShowSearch = () => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.SHOW_SEARCH });
  };
};

export const toggle: t.Toggle = (todo) => {
  return (dispatch: t.Dispatch) => {
    dispatch({ type: t.TOGGLE, todo: todo });
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
