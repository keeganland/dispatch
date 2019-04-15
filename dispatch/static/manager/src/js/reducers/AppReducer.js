import { combineReducers } from 'redux'

import entitiesReducer from './EntitiesReducer'
import authReducer from './AuthReducer'
import sectionsReducer from './SectionsReducer'
import articlesReducer from './ArticlesReducer'
import pagesReducer from './PagesReducer'
import filesReducer from './FilesReducer'
import issuesReducer from './IssuesReducer'
import imagesReducer from './ImagesReducer'
import templatesReducer from './TemplatesReducer'
import personsReducer from './PersonsReducer'
import topicsReducer from './TopicsReducer'
import tagsReducer from './TagsReducer'
import toasterReducer from './ToasterReducer'
import integrationsReducer from './IntegrationsReducer'
import dashboardReducer from './DashboardReducer'
import galleriesReducer from './GalleriesReducer'
import zonesReducer from './ZonesReducer'
import widgetsReducer from './WidgetsReducer'
import eventsReducer from './EventsReducer'
import userReducer from './UserReducer'
import videosReducer from './VideosReducer'
import podcastsReducer from './PodcastsReducer'
import podcastEpisodesReducer from './PodcastEpisodesReducer'
import settingsReducer from './SettingsReducer'
import invitesReducer from './InvitesReducer'
import pollsReducer from './PollsReducer'
import subsectionsReducer from './SubsectionsReducer'
import uploadReducer from './UploadReducer'
import notificationsReducer from './NotificationsReducer'
import subscriptionsReducer from './SubscriptionsReducer'

export default combineReducers({
  entities: entitiesReducer,
  auth: authReducer,
  sections: sectionsReducer,
  subsections: subsectionsReducer,
  articles: articlesReducer,
  pages: pagesReducer,
  files: filesReducer,
  images: imagesReducer,
  templates: templatesReducer,
  persons: personsReducer,
  topics: topicsReducer,
  tags: tagsReducer,
  issues: issuesReducer,
  toaster: toasterReducer,
  integrations: integrationsReducer,
  dashboard: dashboardReducer,
  galleries: galleriesReducer,
  zones: zonesReducer,
  widgets: widgetsReducer,
  events: eventsReducer,
  users: userReducer,
  invites: invitesReducer,
  videos: videosReducer,
  podcasts: podcastsReducer,
  podcastEpisodes: podcastEpisodesReducer,
  settings: settingsReducer,
  polls: pollsReducer,
  upload: uploadReducer,
  notifications: notificationsReducer,
  subscriptions: subscriptionsReducer,
})
