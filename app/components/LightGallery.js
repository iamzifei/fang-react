import React from 'react'
import $ from 'jquery'

class LightGallery extends React.Component {

  componentDidMount() {
    $(document).ready(
      () => {
        $('.property-cover').click(
          () => {
            $(this).lightGallery({
              dynamic: true,
              dynamicEl: this.props.images
            })
          }
        )
      }
    )
  }

  render() {
    var cover = <span />
    if (this.props.images.length > 0) {
      var firstImage = this.props.images[0]
      cover = <img src={firstImage.src} />
    }
    return (
      <div className="property-cover">
        {cover}
      </div>
    )
  }
}

LightGallery.propTypes = {
  images: React.PropTypes.array
}

export default LightGallery
