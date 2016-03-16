import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores'
import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions'
import PropertyList from './PropertyList'
import ReactPaginate from 'react-paginate'
import Translate from 'react-translate-component'
import SearchRefine from './SearchRefine'
import Navbar from './Navbar'
import _ from 'underscore'
import config from '../../config'

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
    this.getPropertyList(this.props.location.query)
    this.getPropertyCount(this.props.location.query)
  }

  componentDidUpdate(prevProps) {
    // Fetch new properties data when URL path changes
    if (!_.isEqual(prevProps.location.query, this.props.location.query)) {
      this.getPropertyList(this.props.location.query)
      this.getPropertyCount(this.props.location.query)
    }
  }

  getPropertyList(filters) {
    SearchActions.searchProperties(
      filters.suburb,
      filters.price,
      filters.offset,
      filters.sort,
      filters.term,
      filters.room,
      filters.property,
      filters.feature,
      filters.misc
    )
  }

  getPropertyCount(filters) {
    SearchActions.getPropertyCount(
      filters.suburb,
      filters.price,
      filters.sort,
      filters.term,
      filters.room,
      filters.property,
      filters.feature,
      filters.misc
    )
  }

  handlePageClick(page) {
    const offset = page.selected * config.perPage
    SearchActions.updateOffset(
      offset.toString()
    )
    SearchActions.resultPageRedirect()
  }

  render() {
    var suburbName = this.props.filters.suburb
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
            <SearchRefine {...this.props.location.query} />
            <div id="react-paginate">
              <ReactPaginate previousLabel={<Translate content="pagination.previous" />}
                nextLabel={<Translate content="pagination.next" />}
                breakLabel={<li className="break"><a href="">...</a></li>}
                pageNum={Math.ceil(this.props.propertiesCount / config.perPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                clickCallback={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                forceSelected={parseInt(this.props.location.query.offset, 10) / config.perPage}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SearchResult.propTypes = {
  jumpFlag: React.PropTypes.bool,
  filters: React.PropTypes.object,
  propertiesCount: React.PropTypes.number,
  properties: React.PropTypes.array,
  location: React.PropTypes.object
}

export default connectToStores(SearchResult)
