/* @flow */
import uuid from 'uuid/v4'

const dimensions = {
  TRACKING_VERSION: 'dimension1',
  CLIENT_ID: 'dimension2',
  WINDOW_ID: 'dimension3',
  HIT_ID: 'dimension4',
  HIT_TIME: 'dimension5',
  HIT_TYPE: 'dimension6'
}

const metrics = {
  RESPONSE_END_TIME: 'metric1',
  DOM_LOAD_TIME: 'metric2',
  WINDOW_LOAD_TIME: 'metric3'
}

export function init () {
  if (!process.env.GOOGLE_ANALYTICS_UA && typeof window !== 'undefined') {
    // Initialize the command queue in case analytics.js hasn't loaded yet.
    window.ga = window.ga || ((...args) => (window.ga.q = window.ga.q || []).push(args))
    window.ga('create', process.env.GOOGLE_ANALYTICS_UA, 'auto')
    window.ga('set', 'transport', 'beacon')
    setDimensions(window.ga)
    sendNavigationTimingMetrics(window.ga)
    window.ga('send', 'pageview')
    trackErrors()
  }
}

export function trackError (error: Error, fieldsObj: Object = {}) {
  if (!process.env.GOOGLE_ANALYTICS_UA && typeof window !== 'undefined') {
    window.ga('send', 'event', Object.assign({
      eventCategory: 'Script',
      eventAction: 'error',
      eventLabel: (error && error.stack) || '(not set)',
      nonInteraction: true
    }, fieldsObj))
  }
}

function trackErrors () {
  const loadErrorEvents = window.__e && window.__e.q || []
  const fieldsObj = {eventAction: 'uncaught error'}

  // Replay any stored load error events.
  for (let event of loadErrorEvents) {
    trackError(event.error, fieldsObj)
  }

  // Add a new listener to track event immediately.
  window.addEventListener('error', (event) => {
    trackError(event.error, fieldsObj)
  })
}

function setDimensions (ga) {
  ga('set', dimensions.TRACKING_VERSION, require('../package.json').version)
  ga((tracker) => {
    const clientId = tracker.get('clientId')
    const originalBuildHitTask = tracker.get('buildHitTask')
    tracker.set(dimensions.CLIENT_ID, clientId)
    tracker.set('buildHitTask', (model) => {
      model.set(dimensions.HIT_ID, uuid(), true)
      model.set(dimensions.HIT_TIME, String(Date.now()), true)
      model.set(dimensions.HIT_TYPE, model.get('hitType'), true)
      originalBuildHitTask(model)
    })
  })
  ga('set', dimensions.WINDOW_ID, uuid())
}

function sendNavigationTimingMetrics (ga) {
  // Only track performance in supporting browsers.
  if (!(window.performance && window.performance.timing)) return

  // If the window hasn't loaded, run this function after the `load` event.
  if (document.readyState !== 'complete') {
    window.addEventListener('load', sendNavigationTimingMetrics)
    return
  }

  const nt = window.performance.timing
  const navStart = nt.navigationStart

  const responseEnd = Math.round(nt.responseEnd - navStart)
  const domLoaded = Math.round(nt.domContentLoadedEventStart - navStart)
  const windowLoaded = Math.round(nt.loadEventStart - navStart)

  // In some edge cases browsers return very obviously incorrect NT values,
  // e.g. 0, negative, or future times. This validates values before sending.
  const allValuesAreValid = (...values) => {
    return values.every((value) => value > 0 && value < 1e6)
  }

  if (allValuesAreValid(responseEnd, domLoaded, windowLoaded)) {
    ga('send', 'event', {
      eventCategory: 'Navigation Timing',
      eventAction: 'track',
      nonInteraction: true,
      [metrics.RESPONSE_END_TIME]: responseEnd,
      [metrics.DOM_LOAD_TIME]: domLoaded,
      [metrics.WINDOW_LOAD_TIME]: windowLoaded
    })
  }
};
