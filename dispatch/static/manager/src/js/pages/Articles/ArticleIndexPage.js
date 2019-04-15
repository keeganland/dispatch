import React from 'react'
import { connect } from 'react-redux'

import ItemIndexPage from '../ItemIndexPage'
import {AuthorFilterInput, SectionFilterInput, TagsFilterInput}  from '../../components/inputs/filters/'
import articlesActions from '../../actions/ArticlesActions'
import { humanizeDatetime } from '../../util/helpers'

const mapStateToProps = (state) => {
  return {
    token: state.app.auth.token,
    listItems: state.app.articles.list,
    entities: {
      listItems: state.app.entities.articles,
      sections: state.app.entities.sections,
      authors: state.app.entities.persons
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listListItems: (token, query) => {
      dispatch(articlesActions.list(token, query))
    },
    toggleListItem: (articleId) => {
      dispatch(articlesActions.toggle(articleId))
    },
    toggleAllListItems: (articleIds) => {
      dispatch(articlesActions.toggleAll(articleIds))
    },
    clearSelectedListItems: () => {
      dispatch(articlesActions.clearSelected())
    },
    clearListItems: () => {
      dispatch(articlesActions.clearAll())
    },
    deleteListItems: (token, articleIds) => {
      dispatch(articlesActions.deleteMany(token, articleIds))
    },
    searchArticles: (author, section, tags, query) => {
      dispatch(articlesActions.search(author, section, tags, query))
    }
  }
}

function ArticlePageComponent(props) {
  const section = props.entities.sections[props.location.query.section]
  const title = section ? `${section.name} - Articles` : 'Articles'

  const hasFilters = props.location.query.section || props.location.query.author || props.location.query.tags

  const filters = [
    <SectionFilterInput
      key='SectionFilter'
      value={props.location.query.section}
      update={(section) => props.searchArticles(props.location.query.author, section, props.location.query.tags, props.location.query.q)} />,
    <AuthorFilterInput
      key='AuthorFilter'
      value={props.location.query.author}
      update={(author) => props.searchArticles(author, props.location.query.section, props.location.query.tags, props.location.query.q)} />,
    <TagsFilterInput
      key='TagsFilter'
      value={props.location.query.tags}
      update={(tags) => props.searchArticles(props.location.query.author, props.location.query.section, tags, props.location.query.q)} />
  ]

  const breakingNews = (
    <div className='c-article-editor__breaking'>Breaking</div>
  )

  return (
    <ItemIndexPage
      pageTitle={title}
      typePlural='articles'
      typeSingular='article'
      displayColumn='headline'
      filters={filters}
      hasFilters={hasFilters}
      headers={[ 'Headline', '', 'Section', 'Authors', 'Published', 'Revisions']}
      exclude={'subsection,subsection_id'}
      extraColumns={[
        item => item.currently_breaking ? breakingNews : '',
        item => props.entities.sections[item.section]['name'],
        item => item.authors_string,
        item => item.published_at ? humanizeDatetime(item.published_at) : 'Unpublished',
        item => item.latest_version + ' revisions' 
      ]}
      shouldReload={(prevProps, props) => {
        return (
          (prevProps.location.query.section !== props.location.query.section) ||
          (prevProps.location.query.author !== props.location.query.author)  ||
          (prevProps.location.query.tags !== props.location.query.tags)
        )
      }}
      queryHandler={(query, props) => {
        if (props.location.query.section) {
          query.section = props.location.query.section
        }
        if (props.location.query.author) {
          query.author = props.location.query.author
        }
        if (props.location.query.tags) {
          query.tags = props.location.query.tags
        }
        return query
      }}
      searchListItems={(query) => props.searchArticles(props.location.query.author, props.location.query.section, props.location.query.tags, query)}
      {...props} />
  )
}


const ArticlesPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePageComponent)

export default ArticlesPage
