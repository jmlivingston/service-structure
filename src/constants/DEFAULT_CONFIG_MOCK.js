import uuid from 'uuid/v4'
import HTTP_VERB from './HTTP_VERB'

const DEFAULT_RESOURCE = () => ''

export default Object.freeze({
  ADD: {
    method: HTTP_VERB.POST,
    resource: DEFAULT_RESOURCE,
    mock: () => ({ ok: true, json: () => uuid() })
  },
  GET: {
    method: HTTP_VERB.GET,
    resource: DEFAULT_RESOURCE,
    mock: () => ({ ok: true, json: () => [] })
  },
  PUT: {
    method: HTTP_VERB.PUT,
    resource: DEFAULT_RESOURCE,
    mock: () => ({ ok: true, json: () => {} })
  },
  REMOVE: {
    method: HTTP_VERB.DELETE,
    resource: DEFAULT_RESOURCE,
    mock: () => ({ ok: true, json: () => {} })
  }
})
