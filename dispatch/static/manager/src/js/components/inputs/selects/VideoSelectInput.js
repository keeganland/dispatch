import React from 'react'
import { connect } from 'react-redux'

import ItemSelectInput from './ItemSelectInput'

import videosActions from '../../../actions/VideosActions'

class VideoSelectInputComponent extends React.Component {

  listVideos(query) {
    let queryObj = {}

    if (query) {
      queryObj['q'] = query
    }

    this.props.listVideos(this.props.token, queryObj)
  }

  render() {

    return (
      <ItemSelectInput
        many={false}
        value={this.props.value}
        inline={this.props.inline}
        showSortableList={this.props.showSortableList}
        results={this.props.videos.ids}
        entities={this.props.entities.videos}
        onChange={(value) => this.props.update(value)}
        fetchResults={(query) => this.listVideos(query)}
        attribute='title'
        editMessage={this.props.value ? 'Edit video' : 'Add video'} />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    videos: state.app.videos.list,
    entities: {
      videos: state.app.entities.videos
    },
    token: state.app.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listVideos: (token, query) => {
      dispatch(videosActions.list(token, query))
    }
  }
}

const VideoSelectInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoSelectInputComponent)

export default VideoSelectInput
