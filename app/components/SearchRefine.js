import React, { PropTypes } from 'react'
import Translate from 'react-translate-component'
import PropertyFeature from './PropertyFeature'
import SearchActions from '../actions/SearchActions'

const filterList = ['suburb', 'sort', 'term', 'room', 'property', 'feature', 'misc']

class SearchRefine extends React.Component {
  static PropTypes = {
    suburb: PropTypes.string,
    offset: PropTypes.string,
    sort: PropTypes.string,
    terms: PropTypes.string,
    room: PropTypes.string,
    property: PropTypes.string,
    feature: PropTypes.string,
    misc: PropTypes.string
  };

  _onRefine(filter = {}) {
    const self = this
    const refinedFilter = Object.assign({}, filter)

    return function (event) {
      filterList
        .forEach(key => refinedFilter[key] = refinedFilter[key] || self.props[key])

      SearchActions.searchRefinedFilter(refinedFilter)
    }
  }

  render() {
    const propertyFeatures = [
      'furnished',
      'femalePrefer',
      'nonSmoker',
      'petAllowed',
      'billInclude',
      'fastInternet'
    ]
    return (
      <div id="refine">
        <h3><Translate content="search.refine.sort.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ sort: 'time' })}>
              <Translate content="search.refine.sort.newest" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ sort: 'priceUp' })}>
              <Translate content="search.refine.sort.cheapest" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ sort: 'priceDown' })}>
              <Translate content="search.refine.sort.dearest" />
            </a>
          </li>
        </ul>
        <h3><Translate content="search.refine.term.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ term: 'any' })}>
              <Translate content="search.refine.term.any" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ term: 's' })}>
              <Translate content="search.refine.term.short" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ term: 'l' })}>
              <Translate content="search.refine.term.long" />
            </a>
          </li>
        </ul>
        <h3><Translate content="search.refine.room.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ room: 'any' })}>
              <Translate content="search.refine.room.all" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ room: 'private' })}>
              <Translate content="search.refine.room.private" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ room: 'shared' })}>
              <Translate content="search.refine.room.shared" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ room: 'living' })}>
              <Translate content="search.refine.room.living" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ room: 'master' })}>
              <Translate content="search.refine.room.master" />
            </a>
          </li>
        </ul>
        <h3><Translate content="search.refine.property.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ property: 'any' })}>
              <Translate content="search.refine.property.all" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ property: 'house' })}>
              <Translate content="search.refine.property.house" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ property: 'apartment' })}>
              <Translate content="search.refine.property.apart" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ property: 'studio' })}>
              <Translate content="search.refine.property.studio" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ property: 'whole' })}>
              <Translate content="search.refine.property.flat" />
            </a>
          </li>
        </ul>
        <h3><Translate content="search.refine.feature.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ feature: 'any' })}>
              <Translate content="search.refine.feature.any" />
            </a>
          </li>
          <PropertyFeature propertyFeatures={propertyFeatures} ref="refine" />
        </ul>
        <a data-closerefine href="#">×</a>
      </div>
    )
  }
}

SearchRefine.propTypes = {
  suburb: React.PropTypes.string
}

export default SearchRefine
