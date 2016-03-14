import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores'
import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions'
import PropertyList from './PropertyList'
import ReactPaginate from 'react-paginate'
import Translate from 'react-translate-component'
import SearchRefine from './SearchRefine'
import Navbar from './Navbar'

class SearchResult extends React.Component {
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
    console.log(this.props.location)

    this.getPropertyList()
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
    if (this.props.location.query && this.props.location.query.suburb) {
        SearchActions.keepSuburb(this.props.location.query.suburb)
    }
  }

  componentDidUpdate(prevProps) {
    console.log('update prev ' + prevProps.location.search)
    console.log('update current ' + this.props.location.search)
    // Fetch new properties data when URL path changes
    if (prevProps.location.pathname === this.props.location.pathname && prevProps.location.search !== this.props.location.search) {
      this.getPropertyList()
    }
  }

  getPropertyList() {
    SearchActions.searchProperties(
      this.props.location.query.suburb,
      0,
      this.props.location.query.sort,
      this.props.location.query.terms,
      this.props.location.query.room,
      this.props.location.query.property,
      this.props.location.query.feature
    )
    SearchActions.getPropertyCount(
      this.props.location.query.suburb,
      this.props.location.query.sort,
      this.props.location.query.terms,
      this.props.location.query.room,
      this.props.location.query.property,
      this.props.location.query.feature
    )
  }

  handlePageClick(page) {
    const selected = page.selected
    const offset = Math.ceil(selected * this.props.limit)
    SearchActions.searchProperties(this.props.location.query.suburb, offset)
  }

  render() {
    var suburbName = this.props.location.query.suburb
    var propertyNodes = this.props.properties.map((property, index) => {
      suburbName = property.suburb
      return (
        <PropertyList property={property} key={property._id} />
      )
    })

    return (
      <div>
        <Navbar pageFlag="searchResult" />
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
            <SearchRefine {...this.props.filters} />
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
      </div>
    )
  }
}

SearchResult.propTypes = {
  params: React.PropTypes.object,
  filters: React.PropTypes.object,
  limit: React.PropTypes.number,
  propertiesCount: React.PropTypes.number,
  properties: React.PropTypes.array,
  location: React.PropTypes.object
}

export default connectToStores(SearchResult)
