import React from 'react'

class LightGallery extends React.Component {

  componentDidMount() {
    $(document).ready(function() {
      $('.property-cover').click(function(){
        $(this).lightGallery({
          dynamic:true,
          dynamicEl: [
            {
              "src":"/img/jumbotron.jpg",
              "thumb":"/img/logo.png",
              "mobileSrc":"/img/grid-offer.jpg"
            },
            {
              "src":"/img/jumbotron.jpg",
              "thumb":"/img/logo.png",
              "mobileSrc":"/img/grid-offer.jpg"
            }
          ]
        })
      });
    })
  }

  render() {
    return (
      <div className="property-cover">
        <img src="/img/grid-offer.jpg" />
      </div>
    )
  }
}

export default LightGallery
