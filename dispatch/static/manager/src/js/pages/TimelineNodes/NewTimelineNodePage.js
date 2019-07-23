import React from 'react'

import TimelineNodeEditor from '../../components/TimelineNodeEditor'

export default function NewTimelineNodePage(props) {
  return (
    <TimelineNodeEditor
      isNew={true}
      goBack={props.router.goBack}
      route={props.route} />
  )
}