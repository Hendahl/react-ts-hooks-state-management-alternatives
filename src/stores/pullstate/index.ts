import { Store } from "pullstate";
import * as t from "../../ts/types";

export const store = new Store({
  countAll: 0,
  countCompleted: 0,
  data: [],
  dataFilter: t.FILTER_ALL,
  filteredData: [],
  isPayloadVisible: false,
  isSearchVisible: false,
  isUpdating: false,
});
