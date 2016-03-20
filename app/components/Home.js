import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores'
import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions'
import PropertyGrid from './PropertyGrid'
import ReactPaginate from 'react-paginate'
import Translate from 'react-translate-component'
import Jumbotron from './Jumbotron'
import Navbar from './Navbar'
import config from '../../config'
import $ from 'jquery'

class Home extends React.Component {
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
    SearchActions.getAllProperties(0)
    SearchActions.getPropertyCount()

    $(document).ajaxStart(() => {
      SearchActions.updateAjaxAnimation('fadeIn')
    })

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        SearchActions.updateAjaxAnimation('fadeOut')
      }, 750)
    })
  }

  handlePageClick(page) {
    const offset = page.selected * config.perPage
    SearchActions.getAllProperties(offset.toString())
  }

  render() {
    var propertyNodes = this.props.properties.map((property, index) =>
      <PropertyGrid property={property} key={property._id} />
    )

    return (
      <div>
        <Navbar pageFlag="home" />
        <Jumbotron />
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
              pageNum={Math.ceil(this.props.propertiesCount / config.perPage)}
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

Home.propTypes = {
  properties: React.PropTypes.array,
  propertiesCount: React.PropTypes.number
}

export default connectToStores(Home)
