import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores'
import PropertiesListingStore from '../stores/PropertiesListingStore'
import PropertiesListingActions from '../actions/PropertiesListingActions'
import PropertyGrid from './PropertyGrid'
import ReactPaginate from 'react-paginate'
import Translate from 'react-translate-component'

class Home extends React.Component {
  static getStores() {
    return [PropertiesListingStore]
  }

  static getPropsFromStores() {
    return PropertiesListingStore.getState()
  }

  componentDidMount() {
    PropertiesListingActions.getAllProperties(0)
    PropertiesListingActions.getPropertyCount()

    $(document).ajaxStart(() => {
      PropertiesListingActions.updateAjaxAnimation('fadeIn')
    })

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        PropertiesListingActions.updateAjaxAnimation('fadeOut')
      }, 750)
    })
  }

  handlePageClick(page) {
    const selected = page.selected
    const offset = Math.ceil(selected * this.props.limit)
    PropertiesListingActions.getAllProperties(offset)
  }

  render() {
    var propertyNodes = this.props.properties.map((property, index) =>
      <PropertyGrid property={property} key={property._id} />
    )

    return (
      <div className="container">
        <Translate
          count={this.props.propertiesCount}
          content="home.property.list.title"
          className="text-center"
          component="h3"
        />
        <div className="row">
          {propertyNodes}
        </div>
        <div id="react-paginate">
          <ReactPaginate previousLabel={<Translate content="pagination.previous" />}
            nextLabel={<Translate content="pagination.next" />}
            breakLabel={<li className="break"><a href="">...</a></li>}
            pageNum={Math.ceil(this.props.propertiesCount / this.props.limit)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            clickCallback={this.handlePageClick.bind(this)}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  limit: React.PropTypes.number,
  properties: React.PropTypes.array,
  propertiesCount: React.PropTypes.number
}

export default connectToStores(Home)
