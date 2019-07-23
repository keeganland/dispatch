import React from 'react'

import TimelineNodeEditor from '../../components/TimelineNodeEditor'

export default function TimelineNodePage(props) {
  return (
    <TimelineNodeEditor
      itemId={props.params.timelineNodeId}
      goBack={props.router.goBack}
      route={props.route} />
  )
}