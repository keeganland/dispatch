import React from 'react'

import {
  FormInput,
  TextInput,
  TextAreaInput,
  ImageInput,
  DateTimeInput,
  AudioInput,
  SelectInput
} from '../../inputs'

const EXPLICIT_OPTIONS = [
  ['no', 'No'],
  ['yes', 'Yes'],
  ['clean', 'Clean'],
]

export default class PodcastEpisodeForm extends React.Component {

  updateFile(file) {
    const fileUrl = URL.createObjectURL(file)

    const type = file.type

    this.props.bulkUpdate({
      file: file.name,
      file_obj: file,
      file_url: fileUrl,
      type: type
    })
  }

  render() {
    return (
      <form>
        <FormInput
          label='Title'
          padded={false}
          error={this.props.errors.title}>
          <TextInput
            placeholder='Title'
            value={this.props.listItem.title || ''}
            fill={true}
            onChange={e => this.props.update('title', e.target.value)} />
        </FormInput>

        <FormInput
          label='Description'
          padded={false}
          error={this.props.errors.description}>
          <TextAreaInput
            placeholder='Description'
            value={this.props.listItem.description || ''}
            fill={true}
            onChange={e => this.props.update('description', e.target.value)} />
        </FormInput>

        <FormInput
          label='Author'
          padded={false}
          error={this.props.errors.author}>
          <TextInput
            placeholder='Author'
            value={this.props.listItem.author || ''}
            fill={true}
            onChange={e => this.props.update('author', e.target.value)} />
        </FormInput>

        <FormInput
          label='Published At'
          padded={false}
          error={this.props.errors.published_at}>
          <DateTimeInput
            value={this.props.listItem.published_at}
            onChange={dt => this.props.update('published_at', dt)} />
        </FormInput>

        <FormInput
          label='Image'
          padded={false}
          error={this.props.errors.image}>
          <ImageInput
            selected={this.props.listItem.image}
            onChange={imageId => this.props.update('image', imageId)} />
        </FormInput>

        <FormInput
          label='Explicit'
          padded={false}>
          <SelectInput
            options={EXPLICIT_OPTIONS}
            selected={this.props.listItem.explicit}
            onChange={e => this.props.update('explicit', e.target.value)} />
        </FormInput>

        <FormInput
          label='Audio File'
          padded={false}
          error={this.props.errors.file}>
          <AudioInput
            placeholder={this.props.listItem.file || 'Choose a file...'}
            value={this.props.listItem.file || ''}
            url={this.props.listItem.file_url}
            fill={true}
            onDurationChange={duration => this.props.update('duration', duration)}
            onChange={file => this.updateFile(file)} />
        </FormInput>

      </form>
    )
  }
}
