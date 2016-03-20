import React from 'react'

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
      cover = (
        <div>
          <span className="glyphicon glyphicon-menu-right" />
          <img src={firstImage.src} />
          <span className="glyphicon glyphicon-menu-left" />
        </div>
        )
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
