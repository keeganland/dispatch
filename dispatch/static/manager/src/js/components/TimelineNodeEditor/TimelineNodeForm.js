import React from 'react'

import { TextInput, TextAreaInput } from '../inputs'
import TagSelectInput from '../inputs/selects/TagSelectInput'

import * as Form from '../Form'

export default function TimelineNodeForm(props) {

  return (
    <Form.Container>

      <Form.Input
        label='Headline'
        error={props.errors.headline}>
        <TextInput
          placeholder='Headline'
          value={props.listItem.headline || ''}
          fill={true}
          onChange={e => props.update('headline', e.target.value)} />
      </Form.Input>

      <Form.Input label='Snippet'>
        <TextAreaInput
          placeholder='Snippet'
          value={props.listItem.snippet || ''}
          rows='10'
          onChange={e => props.update('snippet', e.target.value)} />
      </Form.Input>

      <Form.Input label='Timeline Date'>
        <DateTimeInput
          hidden={false}
          value={props.listItem.date}
          onChange={dt => props.update('date', dt)} />
      </Form.Input>

      <Form.Input
        label='Tags'
        error={props.errors.tag_ids}>
        <TagSelectInput
          value={props.listItem.tags || []}
          update={tags => props.update('tags', tags)} />
      </Form.Input>

    </Form.Container>
  )
}
