import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores'
import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions'
import PropertyList from './PropertyList'
import ReactPaginate from 'react-paginate'
import Translate from 'react-translate-component'
import SearchRefine from './SearchRefine'

class Search extends React.Component {
  static getStores() {
    return [SearchStore]
  }

  static getPropsFromStores() {
    return SearchStore.getState()
  }

  constructor(props, context) {
    super(props, context)
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  componentDidMount() {
    if (this.props.location.search === '') {
      SearchActions.getPropertiesInSuburb(this.props.params.suburb, 0)
      SearchActions.getPropertyCount(this.props.params.suburb)
    } else {
      SearchActions.searchPropertiesRefine(
        this.props.params.suburb,
        0,
        this.props.location.query.sort,
        this.props.location.query.terms,
        this.props.location.query.room,
        this.props.location.query.property,
        this.props.location.query.feature
      )
      SearchActions.getPropertyCountRefine(
        this.props.params.suburb,
        this.props.location.query.sort,
        this.props.location.query.terms,
        this.props.location.query.room,
        this.props.location.query.property,
        this.props.location.query.feature
      )
    }
    $('.magnific-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-zoom-in',
      closeOnContentClick: true,
      midClick: true,
      zoom: {
        enabled: true,
        duration: 300
      }
    })
  }

  componentDidUpdate(prevProps) {
    // Fetch new properties data when URL path changes
    if (prevProps.params.suburb !== this.props.params.suburb) {
      SearchActions.getPropertiesInSuburb(this.props.params.suburb, 0)
      SearchActions.getPropertyCount(this.props.params.suburb)
    }
  }

  handlePageClick(page) {
    const selected = page.selected
    const offset = Math.ceil(selected * this.props.limit)
    SearchActions.getPropertiesInSuburb(this.props.params.suburb, offset)
  }

  render() {
    var suburbName = this.props.params.suburb
    var propertyNodes = this.props.properties.map((property, index) => {
      suburbName = property.suburb
      return (
        <PropertyList property={property} key={property._id} />
      )
    })

    return (
      <div className="container">
        <Translate
          suburb={suburbName}
          content="search.title"
          count={this.props.propertiesCount}
          component="h3"
          className="text-center"
        />
        <div className="row">
          <div id="results">
            <ul className="list-offer-col">{propertyNodes}</ul>
          </div>
          <SearchRefine suburb={this.props.params.suburb} />
          <div id="react-paginate">
            <ReactPaginate previousLabel={<Translate content="pagination.previous" />}
              nextLabel={<Translate content="pagination.next" />}
              breakLabel={<li className="break"><a href="">...</a></li>}
              pageNum={Math.ceil(this.props.propertiesCount / this.props.limit)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              clickCallback={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  params: React.PropTypes.object,
  limit: React.PropTypes.number,
  propertiesCount: React.PropTypes.number,
  properties: React.PropTypes.array,
  location: React.PropTypes.object
}

export default connectToStores(Search)
