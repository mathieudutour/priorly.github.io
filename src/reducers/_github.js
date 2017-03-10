import queryString from 'query-string';

export default function github(endpoint, { method, token, accept, data } = {}) {
  let url = 'https://api.github.com' + endpoint;
  if ((!method || method === 'GET') && data) {
    url += '?' + queryString.stringify(data);
  }
  return {
    method: method || 'GET',
    url,
    headers: {
      ...(token && { Authorization: 'Token ' + token }),
      Accept: accept || 'application/vnd.github.v3+json'
    },
    ...(data && { data })
  };
}
