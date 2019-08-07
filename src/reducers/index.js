import { combineReducers } from "redux";

import { auth } from "./auth.reducer";
import { alert } from "./alert.reducer";
import { star } from "./star.reducer";
import { user } from "./user.reducer";
import { template } from "./template.reducer";
import { category } from "./category.reducer";
import { dashboard } from "./dashboard.reducer";
import { errorhandler } from "./errorhandler.reducer";
import { news } from "./news.reducer";
import { mistag } from "./mistag.reducer";
import { post } from "./post.reducer";
import { approval } from "./approval.reducer";
import { alias } from "./alias.reducer";

const rootReducer = combineReducers({
  auth,
  alert,
  star,
  user,
  template,
  category,
  dashboard,
  errorhandler,
  news,
  mistag,
  post,
  approval,
  alias
});

export default rootReducer;
