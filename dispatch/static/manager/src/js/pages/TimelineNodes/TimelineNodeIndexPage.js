import React from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import ItemIndexPage from '../ItemIndexPage'
import TimelineNodesActions from '../../actions/TimelineNodesActions'
import {TagsFilterInput} from '../../components/inputs/filters'

const mapStateToProps = (state) => {
  return {
    token: state.app.auth.token,
    listItems: state.app.timeline_nodes.list,
    entities: {
      listItems: state.app.entities.timeline_nodes
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listListItems: (token, query) => {    
      dispatch(TimelineNodesActions.list(token, query))
    },
    toggleListItem: (timelineNodeId) => {
      dispatch(TimelineNodesActions.toggle(timelineNodeId))
    },
    toggleAllListItems: (timelineNodeIds) => {
      dispatch(TimelineNodesActions.toggleAll(timelineNodeIds))
    },
    clearSelectedListItems: () => {
      dispatch(TimelineNodesActions.clearSelected())
    },
    clearListItems: () => {
      dispatch(TimelineNodesActions.clearAll())
    },
    deleteListItems: (token, timelineNodeIds, goDownPage) => {
      dispatch(TimelineNodesActions.deleteMany(token, timelineNodeIds))
      if (goDownPage) {
        dispatch(replace({
          pathname: '/timeline-nodes/',
          query: {
            page: goDownPage
          }
        }))
      }
    },
    searchTimelineNodes: (tags, query) => {
      dispatch(TimelineNodesActions.search(tags, query))
    }
  }
}

function TimelineNodesPageComponent(props) {
  
  const filters = [
    <TagsFilterInput
      key={'tagsFilter'}
      value={props.location.query.tags}
      update={(tags) => props.searchTimelineNodes(tags, props.location.query.q)} />
  ]

  return (
    <ItemIndexPage
      pageTitle='Timeline-Nodes'  
      typePlural='timeline-nodes'
      typeSingular='timeline-node'
      displayColumn='headline'
      filters={filters}
      hasFilters={props.location.query.tags}
      headers={['Headline']}
      shouldReload={(prevProps) => {
        return prevProps.location.query.tags !== props.location.query.tags
      }}
      queryHandler={(query, props) => {
        if (props.location.query.tags) {
          query.tags = props.location.query.tags
        }
        return query
      }}
      searchListItems={(query) => props.searchTimelineNodes(props.location.query.tags, query)}
      {... props} />
  )
}

const TimelineNodesIndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineNodesPageComponent)

export default TimelineNodesIndexPage
