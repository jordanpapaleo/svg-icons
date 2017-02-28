const subjectPath = 'M24.5 9h-8.1l-2.9-7.7C13.4 1.1 13.2 1 13 1c-0.2 0-0.4 0.1-0.5 0.3L9.6 9H1.5C1.3 9 1.1 9.1 1 9.3 1 9.5 1 9.8 1.2 9.9l6.7 5.8L5 24.3c-0.1 0.2 0 0.4 0.2 0.6 0.2 0.1 0.4 0.1 0.6 0l7.2-5.3 7.2 5.3c0.1 0.1 0.2 0.1 0.3 0.1 0.1 0 0.2 0 0.3-0.1 0.2-0.1 0.2-0.4 0.2-0.6l-2.9-8.7 6.7-5.8C25 9.8 25 9.5 25 9.3 24.9 9.1 24.7 9 24.5 9z'
const compPath = 'M9.5 22C10.1 22 18 14.2 18 9.5S14.2 1 9.5 1 1 4.9 1 9.5 8.9 22 9.5 22z'

const subjectSvg = `
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="26px" height="26px" xml:space="preserve">
    <path fill="{{fillColor}}" fill-opacity="0.8" stroke="{{strokeColor}}" stroke-width="{{strokeWidth}}" d="${subjectPath}"/>
  </svg>
`
const compSvg = `
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 23" width="19px" height="23px" xml:space="preserve">
    <path fill="{{fillColor}}" stroke="{{strokeColor}}" stroke-width="{{strokeWidth}}" d="${compPath}"/>
    <text transform="translate(0, 1.5)" font-family="Roboto" stroke="none" x="50%" y="50%" fill="{{textColor}}" font-size="{{fontSize}}" text-anchor="middle">{{value}}</text>
  </svg>`

const RED = 'rgb(220,50,50)'
const BLUE = 'rgb(27,163,228)'
const ORANGE = 'rgb(255,151,15)'
const WHITE = 'rgb(255,255,255)'
const BLACK = 'rgb(0,0,0)'
const GRAY = 'rgb(252,252,251)'
const SUBJECT = 'SUBJECT'
const COMP = 'COMP'

/*
 * Unmatched type will return a black and white comp icon
 * @param type oneof ['SALE', 'SALEAPPRAISAL', 'LISTING', 'LISTINGAPPRAISAL', 'VALUE_CONCLUSION']
 */
function getConfig (type, value) {
  var fillColor = WHITE
  var strokeColor = BLACK
  var textColor = BLACK
  var path = compPath
  var fontSize = (value >= 100) ? 8 : 10
  var strokeWidth = 1.5
  var fontFamily = 'Roboto'

  if (type) {
    var isAppraisal = (type.indexOf('APPRAISAL') !== -1)
    if (type.indexOf('SALE') !== -1) {
      strokeColor = RED
      fillColor = (isAppraisal) ? RED : GRAY
      textColor = (isAppraisal) ? WHITE : RED
    } else if (type.indexOf('LISTING') !== -1) {
      strokeColor = BLUE
      fillColor = (isAppraisal) ? BLUE : WHITE
      textColor = (isAppraisal) ? WHITE : BLUE
    } else if (type.indexOf('VALUE_CONCLUSION') !== -1) {
      fillColor = WHITE
      textColor = WHITE
      strokeColor = ORANGE
      path = subjectPath
    }
  }

  return {
    fillColor,
    fontFamily,
    fontSize,
    path,
    strokeColor,
    strokeWidth,
    textColor
  }
}

/**
 * Returns the icon and label config objects used to create map markers.
 * We're using a Symbol object for the MarkerOptions object's icon property and a MarkerLabel object
 * for the label property.  This allows us to control the font family and a number of other aspects
 * of the svg being used for the marker.
 *
 * See the links below for more info:
 * https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions
 * https://developers.google.com/maps/documentation/javascript/reference#Symbol
 * https://developers.google.com/maps/documentation/javascript/reference#MarkerLabel
 *
 * @param type oneof ['SALE', 'SALEAPPRAISAL', 'LISTING', 'LISTINGAPPRAISAL', 'VALUE_CONCLUSION']
 */
function getMarkerData (type, value) {
  const {google} = window

  if (!google) {
    return false
  }

  var svgConfig = getConfig(type, value)
  var labelOrigin = (value >= 10) ? 0.4 : 0.41
  var scaleRatio = 1.2
  var width = 19 * scaleRatio
  var height = 23 * scaleRatio
  var anchor = (type === 'VALUE_CONCLUSION') ? [width / 2, height] : [width / 2, height * 0.9]

  if (type.indexOf('VALUE_CONCLUSION') !== -1) {
    width = 26 * scaleRatio
    height = 26 * scaleRatio
  }

  var icon = {
    anchor: new google.maps.Point(anchor[0], anchor[1]),
    fillColor: svgConfig.fillColor,
    fillOpacity: 1,
    labelOrigin: new google.maps.Point(width * labelOrigin, height * labelOrigin),
    path: svgConfig.path,
    strokeColor: svgConfig.strokeColor,
    strokeWeight: svgConfig.strokeWidth
  }

  var label = {
    color: svgConfig.textColor,
    fontFamily: svgConfig.fontFamily,
    fontSize: svgConfig.fontSize + 'px',
    fontWeight: 'normal',
    text: value + ''
  }

  return {
    icon: icon,
    label: label
  }
}

/*
 * Returns the markup string representing the svg
 * @param type oneof ['SALE', 'SALEAPPRAISAL', 'LISTING', 'LISTINGAPPRAISAL', 'VALUE_CONCLUSION']
 */
function getTemplate (type, value) {
  var iconType = getType(type)
  var svgConfig = getConfig(type, value)
  var svgTemplate = (iconType === SUBJECT) ? subjectSvg : compSvg

  svgTemplate = svgTemplate
    .replace(/{{fillColor}}/g, svgConfig.fillColor)
    .replace(/{{strokeColor}}/g, svgConfig.strokeColor)
    .replace(/{{strokeWidth}}/g, svgConfig.strokeWidth)

  if (iconType === COMP) {
    svgTemplate = svgTemplate
      .replace(/{{value}}/g, value)
      .replace(/{{textColor}}/g, svgConfig.textColor)
      .replace(/{{fontSize}}/g, svgConfig.fontSize)
  }

  return svgTemplate
}

/*
 * @param type oneof ['SALE', 'SALEAPPRAISAL', 'LISTING', 'LISTINGAPPRAISAL', 'VALUE_CONCLUSION']
 */
function getType (type) {
  return (type.indexOf('VALUE_CONCLUSION') !== -1) ? SUBJECT : COMP
}

const svgService = {}

Object.defineProperties(svgService, {
  getConfig: {
    get () {
      return getConfig
    }
  },
  getMarkerData: {
    get () {
      return getMarkerData
    }
  },
  getTemplate: {
    get () {
      return getTemplate
    }
  },
  getType: {
    get () {
      return getType
    }
  }
})

Object.freeze(svgService)

export default svgService
