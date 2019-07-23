import React from 'react'
import { connect } from 'react-redux'

import timelineNodesActions from '../../actions/TimelineNodesActions'
import TimelineNodeForm from './TimelineNodeForm'

import ItemEditor from '../ItemEditor'

const TYPE = 'TimelineNode'
const TYPE_PLURAL = 'Timeline-Nodes'
const AFTER_DELETE = 'timeline-nodes'

const mapStateToProps = (state) => {
  return {
    listItem: state.app.timeline_nodes.single,
    entities: {
      remote: state.app.entities.timeline_nodes,
      local: state.app.entities.local.timeline_nodes,
    },
    token: state.app.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListItem: (token, timelineNodeId) => {
      dispatch(timelineNodesActions.get(token, timelineNodeId))
    },
    setListItem: (timelineNode) => {
      dispatch(timelineNodesActions.set(timelineNode))
    },
    saveListItem: (token, timelineNodeId, timelineNode) => {
      dispatch(timelineNodesActions.save(token, timelineNodeId, timelineNode))
    },
    createListItem: (token, timelineNode) => {
      dispatch(timelineNodesActions.create(token, timelineNode, AFTER_DELETE))
    },
    deleteListItem: (token, timelineNodeId, next) => {
      dispatch(timelineNodesActions.delete(token, timelineNodeId, next))
    }
  }
}

function TimelineNodeEditorComponent(props) {
  return (
    <ItemEditor
      type={TYPE}
      typePlural={TYPE_PLURAL}
      afterDelete={AFTER_DELETE}
      form={TimelineNodeForm}
      displayField='headline'
      {... props} />
  )
}

const TimelineNodeEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineNodeEditorComponent)

export default TimelineNodeEditor
