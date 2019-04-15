import React from 'react'
import R from 'ramda'
import { dateObjToAPIString } from '../../../util/helpers'

import { FormInput, SelectInput, LinkButton, DateTimeInput } from '../../inputs'
import { Switch } from '@blueprintjs/core'

const IMPORTANCE_OPTIONS = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5]
]

const READING_TIME_OPTIONS = [
  ['morning', 'Morning'],
  ['midday', 'Midday'],
  ['evening', 'Evening']
]

function updateInstantArticle(update, integrations, enabled) {

  integrations = R.merge(
    integrations,
    {
      'fb-instant-articles': R.merge(
        integrations['fb-instant-articles'],
        {
          enabled: enabled
        }
      )
    }
  )

  return update('integrations', integrations)

}

export default function DeliveryTab(props) {
  const isInstantArticlesEnabled = props.availableIntegrations['fb-instant-articles'] && props.availableIntegrations['fb-instant-articles'].settings.page_configured

  let warningMessage = null

  if (!isInstantArticlesEnabled) {
    warningMessage = (
      <div className='u-flex pt-callout pt-intent-danger'>
        <div className='u-flex--fill u-flex--align-middle'>Please enable Facebook Instant Articles to use this feature</div>
        <div><LinkButton to='integrations/fb-instant-articles'>Enable</LinkButton></div>
      </div>
    )
  }

  const timeoutPicker = props.is_breaking ?
    <div>
      <p>Timeout</p>
      <DateTimeInput
        value={props.breaking_timeout}
        onChange={dt => props.update('breaking_timeout', dt)} />
    </div> : null

  const notificationScheduler = () => {
    return (
      <FormInput label='Schedule Notification'>
        <DateTimeInput
          hidden={props.is_breaking}
          value={props.scheduled_notification}
          onChange={dt => props.update('scheduled_notification', dateObjToAPIString(dt))} />
      </FormInput>
    )
  }

  return (
    <div>

      <FormInput label='Importance'>
        <SelectInput
          options={IMPORTANCE_OPTIONS}
          selected={props.importance}
          onChange={e => props.update('importance', e.target.value)} />
      </FormInput>

      <FormInput label='Reading Time'>
        <SelectInput
          options={READING_TIME_OPTIONS}
          selected={props.reading_time}
          onChange={e => props.update('reading_time', e.target.value)} />
      </FormInput>

      <FormInput label='Enable as Facebook Instant Article'>
        <Switch
          className='pt-large'
          disabled={!isInstantArticlesEnabled}
          checked={R.path(['fb-instant-articles', 'enabled'], props.integrations)}
          onChange={e => updateInstantArticle(props.update, props.integrations, e.target.checked)} />
        {warningMessage}
      </FormInput>

      <FormInput
        label='Breaking news'>
        <Switch
          className='pt-large'
          checked={props.is_breaking}
          onChange={e => props.update('is_breaking', e.target.checked)} />
          {timeoutPicker}
      </FormInput>

      <div>Hello</div>
      {props.is_breaking ? null : notificationScheduler()}

    </div>
  )

}
