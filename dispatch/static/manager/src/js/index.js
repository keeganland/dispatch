import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createHistory } from 'history'
import { loadingBarReducer, loadingBarMiddleware } from 'react-redux-loading-bar'
import promiseMiddleware from 'redux-promise-middleware'

// Base CSS styles
require('../styles/admin.scss')

import * as Pages from './pages'
import * as Containers from './containers'
import appReducer from './reducers/AppReducer'
import modalReducer from './reducers/ModalReducer'

const BASE_PATH = '/admin'

const browserHistory = useRouterHistory(createHistory)({ basename: BASE_PATH })
const router = routerMiddleware(browserHistory)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  combineReducers({
    app: appReducer,
    routing: routerReducer,
    loadingBar: loadingBarReducer,
    modal: modalReducer
  }),
  composeEnhancers(
    applyMiddleware(
      thunk,
      router,
      promiseMiddleware(),
      loadingBarMiddleware({
        promiseTypeSuffixes: ['PENDING', 'FULFILLED', 'REJECTED'],
      })
    )
  )
)

const history = syncHistoryWithStore(browserHistory, store)

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Containers.App}>

        <Route component={Containers.Main}>
          <IndexRoute component={Pages.Dashboard} />

          <Route path='sections'>
            <IndexRoute component={Pages.Sections.Index} />
            <Route path='new' component={Pages.Sections.NewSection} />
            <Route path=':sectionId' component={Pages.Sections.Section} />
          </Route>

          <Route path='articles'>
            <IndexRoute component={Pages.Articles.Index} />
            <Route path='new' component={Pages.Articles.NewArticle} />
            <Route path=':articleId' component={Pages.Articles.Article} />
          </Route>

          <Route path='pages'>
            <IndexRoute component={Pages.Pages.Index} />
            <Route path='new' component={Pages.Pages.New} />
            <Route path=':pageId' component={Pages.Pages.Page} />
          </Route>

          <Route path='files' component={Pages.Files} />
          <Route path='profile' component={Pages.Profile} />

          <Route path='integrations' component={Pages.Integrations.Index}>
            <Route path='fb-instant-articles' component={Pages.Integrations.FBInstantArticles} />
          </Route>

          <Route path='tags'>
            <IndexRoute component={Pages.Tags.Index} />
            <Route path='new' component={Pages.Tags.NewTag} />
            <Route path=':tagId' component={Pages.Tags.Tag} />
          </Route>

          <Route path='topics'>
            <IndexRoute component={Pages.Topics.Index} />
            <Route path='new' component={Pages.Topics.NewTopic} />
            <Route path=':topicId' component={Pages.Topics.Topic} />
          </Route>

          <Route path='galleries'>
            <IndexRoute component={Pages.Galleries.Index} />
            <Route path='new' component={Pages.Galleries.NewGallery} />
            <Route path=':galleryId' component={Pages.Galleries.Gallery} />
          </Route>

          <Route path='widgets'>
            <IndexRoute component={Pages.Widgets.Index} />
            <Route path=':zoneId' component={Pages.Widgets.Zone} />
          </Route>

          <Route path='persons'>
            <IndexRoute component={Pages.Persons.Index} />
            <Route path='new' component={Pages.Persons.NewPerson} />
            <Route path=':personId' component={Pages.Persons.Person} />
          </Route>

          <Route path='events'>
            <IndexRoute component={Pages.Events.Index} />
            <Route path='new' component={Pages.Events.NewEvent} />
            <Route path='audit' component={Pages.Events.Audit} />
            <Route path=':eventId' component={Pages.Events.Event} />
          </Route>

        </Route>

        <Route component={Containers.Basic}>
          <Route path='/login' component={Pages.Login} />
        </Route>

      </Route>
    </Router>
  </Provider>
), document.getElementById('container'))
