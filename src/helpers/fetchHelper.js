import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import PropTypes from 'prop-types'
import { fetch } from 'whatwg-fetch'

function fetchHelper({ api, body, params }) {
  if (!api) {
    throw new Error('api object required by fetchHelper')
  }
  const abortController = new AbortController()
  const url = api.resource(params)

  const request = async () => {
    const abortableFetch = 'signal' in new Request('') ? window.fetch : fetch
    const requestConfig = {
      method: api.method,
      body,
      headers: {
        // Authorization: `Bearer USER_TOKEN`,
        'Content-Type': 'application/json'
      },
      signal: abortController.signal
    }
    const response = !api.mock ? await abortableFetch(url, requestConfig) : api.mock(params)
    if (response.ok) {
      const data = response.json ? await response.json() : undefined
      return {
        data,
        response // original response
      }
    } else {
      throw new Error(
        `Error: API (${api.key}) request failed with a '${response.status} ${
          response.statusText
        }' on uri: ${url}. Request: ${JSON.stringify(requestConfig)}`
      )
    }
  }

  return {
    request,
    cleanUp: () => {
      if (!api.mock) {
        if (!abortController.signal.aborted) {
          abortController.abort()
        }
      }
    }
  }
}

fetchHelper.propTypes = {
  // api - object with method and resource function returning URL. See API and API_MOCK
  api: PropTypes.shape({
    method: PropTypes.string.isRequired,
    resource: PropTypes.func.isRequired
  }).isRequired,
  // body - stringified JSON for POST methods
  body: PropTypes.string,
  // params - passed to reource function in api object to build URL
  params: PropTypes.object
}

export default fetchHelper
