import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import PropTypes from 'prop-types'
import { fetch } from 'whatwg-fetch'

function fetchHelper({ api, body, params }) {
  const abortController = new AbortController()
  const request = async () => {
    const url = api.resource(params)
    const abortableFetch = 'signal' in new Request('') ? window.fetch : fetch
    const requestConfig = {
      method: api.method,
      body,
      headers: {
        'Content-Type': 'application/json'
      },
      signal: abortController.signal
    }
    const response = !api.mock ? await abortableFetch(url, requestConfig) : api.mock(params)
    if (response.ok) {
      return {
        data: response.json ? await response.json() : undefined,
        response
      }
    } else {
      throw new Error(
        `Error: API (${api.key}) failed with a '${response.status} ${
          response.statusText
        }' on uri: ${url}. Request: ${JSON.stringify(requestConfig)}`
      )
    }
  }
  return {
    request,
    cleanUp: () => {
      if (!api.mock && !abortController.signal.aborted) {
        abortController.abort()
      }
    }
  }
}

fetchHelper.propTypes = {
  api: PropTypes.shape({
    key: PropTypes.string,
    method: PropTypes.string.isRequired,
    mock: PropTypes.func,
    resource: PropTypes.func.isRequired
  }).isRequired,
  body: PropTypes.string,
  params: PropTypes.object
}

export default fetchHelper
