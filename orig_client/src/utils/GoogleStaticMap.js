import React from 'react-native';
const {
  Component,
  Image,
  PixelRatio
  } = React;

const defaultMapScale = ()=> {
  const isRetina = PixelRatio.get() >= 2;
  return isRetina ? 2 : 1;
}

const values = (obj)=> {
  return Object.keys(obj).map(key => obj[key]);
}

const IMAGE_FORMATS = {
  //png8 or png (default) specifies the 8-bit PNG format.
  PNG: 'png',

  //png32 specifies the 32-bit PNG format.
  PNG32: 'png32',

  //gif specifies the GIF format.
  GIF: 'gif',

  //jpg specifies the JPEG compression format.
  JPG: 'jpg',

  //jpg-baseline specifies a non-progressive JPEG compression format.
  JPG_BASELINE: 'jpg-baseline'
};

const MAP_TYPES = {
  //roadmap (default) specifies a standard roadmap image, as is normally shown on the Google Maps website.
  ROADMAP: 'roadmap',

  //satellite specifies a satellite image.
  SATELLITE: 'satellite',

  //terrain specifies a physical relief map image, showing terrain and vegetation.
  TERRAIN: 'terrain',

  //hybrid specifies a hybrid of the satellite and roadmap image,
  // showing a transparent layer of major streets and place names on the satellite image.
  HYBRID: 'hybrid'
}

const IMAGE_FORMATS_VALUES = values(IMAGE_FORMATS);
const MAP_TYPES_VALUES = values(MAP_TYPES);

// the Image's source should be ignored
const {source, ...imagePropTypes} = Image.propTypes;


/**
 * A wrapper for Google's Static Maps
 *
 * @see https://developers.google.com/maps/documentation/staticmaps/intro#Overview
 *
 * @example: http://staticmapmaker.com/google/
 */
class GoogleStaticMap extends Component {

  /**
   * https://developers.google.com/maps/documentation/staticmaps/intro#api_key
   */
  static ApiKey: 'AIzaSyAwp0Qycaz0CVQfNaNd4FtWew4tK3DRY9w'

  static RootUrl: 'http://maps.googleapis.com/maps/api/staticmap'

  static ImageFormats: IMAGE_FORMATS

  static MapTypes: MAP_TYPES


  static defaultProps: {
    scale: defaultMapScale(),
    format: IMAGE_FORMATS.PNG,
    mapType: MAP_TYPES.ROADMAP,
    hasCenterMarker: true
  }

  render() {
    return (
      <Image
        style={[this.props.style, this.props.size]}
        source={{uri: this.staticMapUrl}}
      />
    );
  }

  get staticMapUrl() {
    const {
      latitude,
      longitude,
      zoom,
      size,
      scale,
      format,
      mapType
      } = this.props;

    const {width, height} = size;
    const rootUrl = this.constructor.RootUrl;

    return `${rootUrl}?center=${latitude},${longitude}&zoom=${zoom}&scale=${scale}&size=${width}x${height}&maptype=${mapType}&format=${format}&${this.markerParams}&${this.apiKeyParam}`;
  }

  get markerParams() {
    const {
      latitude,
      longitude,
      hasCenterMarker
      } = this.props;

    const markerParams = `markers=icon:dot%7Cshadow:true%7C${latitude},${longitude}`;
    return hasCenterMarker ? markerParams : '';
  }

  get apiKeyParam() {
    const apiKey = this.constructor.ApiKey;
    return apiKey ? `key=${apiKey}` : '';
  }
}


export default GoogleStaticMap;
