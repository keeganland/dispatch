import { push } from 'react-router-redux'

import * as types from '../constants/ActionTypes'
import { timelineNodeSchema } from '../constants/Schemas'

import DispatchAPI from '../api/dispatch'

import { ResourceActions } from '../util/redux'

class TimelineNodesActions extends ResourceActions {

  fromRemote(data) {
    // convert tag from object to id
    for (let [i, tag] of data.tags.entries()) {
      if (tag.id) {
        data.tags[i] = tag.id
      }
    }

    return data
  }

  toRemote(data) {
    data.tag_ids = data.tags ? data.tags : []
    
    return data
  }

  search(tags, query ) {
    let queryObj = {}

    if (tags) {
      queryObj.tags = tags
    }

    if (query) {
      queryObj.q = query
    }

    return dispatch => {
      dispatch(push({ pathname: '/timeline-nodes/', query: queryObj }))
    }
  }

}

export default new TimelineNodesActions(
  types.TIMELINE_NODES,
  DispatchAPI.timeline_nodes,
  timelineNodeSchema
)