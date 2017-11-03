/**
 * Created by Kim Ning Ruan on 2017/10/16.
 */
import * as types from './mutation-type'

export const playSelect = function ({commit, state}, {list, index}) {
  console.log(state)
  commit(types.SET_PLAY_LIST, list);
  commit(types.SET_SEQUENCE_LIST, list);
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_PLAYING, true);
  commit(types.SET_FULL_PAGE, true)
}
