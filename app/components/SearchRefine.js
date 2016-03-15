import React from 'react'
import Translate from 'react-translate-component'
import PropertyFeature from './PropertyFeature'
import SearchActions from '../actions/SearchActions'

const filterList = ['suburb', 'offset', 'sort', 'term', 'room', 'property', 'feature', 'misc']

class SearchRefine extends React.Component {
  _onRefine(filter = {}) {
    const self = this
    const refinedFilter = Object.assign({}, filter)

    return function onClick(event) {
      filterList
        .forEach(
          key =>
            (refinedFilter[key] = refinedFilter[key] || self.props[key])
        )
      SearchActions.updateFilters(refinedFilter)
      SearchActions.resultPageRedirect()
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
            <a onClick={this._onRefine({ sort: 'time' })}
              className={this.props.sort === 'time' ? 'active' : ''}
            >
              <Translate content="search.refine.sort.newest" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ sort: 'priceUp' })}
              className={this.props.sort === 'priceUp' ? 'active' : ''}
            >
              <Translate content="search.refine.sort.cheapest" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ sort: 'priceDown' })}
              className={this.props.sort === 'priceDown' ? 'active' : ''}
            >
              <Translate content="search.refine.sort.dearest" />
            </a>
          </li>
        </ul>
        <h3><Translate content="search.refine.term.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ term: 'any' })}
              className={this.props.term === 'any' ? 'active' : ''}
            >
              <Translate content="search.refine.term.any" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ term: 's' })}
              className={this.props.term === 's' ? 'active' : ''}
            >
              <Translate content="search.refine.term.short" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ term: 'l' })}
              className={this.props.term === 'l' ? 'active' : ''}
            >
              <Translate content="search.refine.term.long" />
            </a>
          </li>
        </ul>
        <h3><Translate content="search.refine.room.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ room: 'any' })}
              className={this.props.room === 'any' ? 'active' : ''}
            >
              <Translate content="search.refine.room.all" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ room: 'private' })}
              className={this.props.room === 'private' ? 'active' : ''}
            >
              <Translate content="search.refine.room.private" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ room: 'shared' })}
              className={this.props.room === 'shared' ? 'active' : ''}
            >
              <Translate content="search.refine.room.shared" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ room: 'living' })}
              className={this.props.room === 'living' ? 'active' : ''}
            >
              <Translate content="search.refine.room.living" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ room: 'master' })}
              className={this.props.room === 'master' ? 'active' : ''}
            >
              <Translate content="search.refine.room.master" />
            </a>
          </li>
        </ul>
        <h3><Translate content="search.refine.property.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ property: 'any' })}
              className={this.props.property === 'any' ? 'active' : ''}
            >
              <Translate content="search.refine.property.all" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ property: 'house' })}
              className={this.props.property === 'house' ? 'active' : ''}
            >
              <Translate content="search.refine.property.house" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ property: 'apartment' })}
              className={this.props.property === 'apartment' ? 'active' : ''}
            >
              <Translate content="search.refine.property.apart" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ property: 'studio' })}
              className={this.props.property === 'studio' ? 'active' : ''}
            >
              <Translate content="search.refine.property.studio" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ property: 'whole' })}
              className={this.props.property === 'whole' ? 'active' : ''}
            >
              <Translate content="search.refine.property.flat" />
            </a>
          </li>
        </ul>
        <h3><Translate content="search.refine.feature.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ feature: 'any' })}
              className={this.props.feature === 'any' ? 'active' : ''}
            >
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
  suburb: React.PropTypes.string,
  offset: React.PropTypes.string,
  sort: React.PropTypes.string,
  term: React.PropTypes.string,
  room: React.PropTypes.string,
  property: React.PropTypes.string,
  feature: React.PropTypes.string,
  misc: React.PropTypes.string
}

export default SearchRefine
