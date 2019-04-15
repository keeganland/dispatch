import React from 'react'
import { connect } from 'react-redux'

import ItemSelectInput from './ItemSelectInput'

import galleriesActions from '../../../actions/GalleriesActions'

class GallerySelectInputComponent extends React.Component {

  listGalleries(query) {
    let queryObj = {}

    if (query) {
      queryObj['q'] = query
    }

    this.props.listGalleries(this.props.token, queryObj)
  }

  render() {
    return (
      <ItemSelectInput
        many={false}
        value={this.props.value}
        results={this.props.galleries.ids}
        entities={this.props.entities.galleries}
        onChange={(value) => this.props.update(value)}
        fetchResults={(query) => this.listGalleries(query)}
        attribute='title'
        editMessage='Select Gallery' />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    galleries: state.app.galleries.list,
    entities: {
      galleries: state.app.entities.galleries
    },
    token: state.app.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listGalleries: (token, query) => {
      dispatch(galleriesActions.list(token, query))
    }
  }
}

const GallerySelectInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(GallerySelectInputComponent)

export default GallerySelectInput
