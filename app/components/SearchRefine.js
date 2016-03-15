import React from 'react'
import Translate from 'react-translate-component'
import SearchActions from '../actions/SearchActions'
import Slider from 'react-slider'
import config from '../../config'

const filterList = ['suburb', 'price', 'offset',
  'sort', 'term', 'room', 'property', 'feature', 'misc']

class SearchRefine extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleSliderAfterChange = this.handleSliderAfterChange.bind(this)
  }

  handleSliderAfterChange(price) {
    SearchActions.updatePrice(price.toString())
    SearchActions.updateOffset('0')
    SearchActions.resultPageRedirect()
  }

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
      SearchActions.updateOffset('0')
      SearchActions.resultPageRedirect()
    }
  }

  render() {
    var price = this.props.price === '' ? 0 : parseInt(this.props.price, 10)
    return (
      <div id="refine">
        <h3><Translate content="search.refine.price.label" /></h3>
        <Slider
          min={config.rentalMin}
          max={config.rentalMax}
          step={config.rentalStep}
          value={price}
          defaultValue={config.rentalMax}
          withBars
          className="price-slider"
          onAfterChange={this.handleSliderAfterChange}
        >
          <span>{`~$${price}`}</span>
        </Slider>
        <h3><Translate content="search.refine.sort.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ sort: 'time' })}
              className={this.props.sort === 'time' ? 'active' : ''}
            >
              <Translate content="search.refine.sort.time" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ sort: 'priceUp' })}
              className={this.props.sort === 'priceUp' ? 'active' : ''}
            >
              <Translate content="search.refine.sort.priceUp" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ sort: 'priceDown' })}
              className={this.props.sort === 'priceDown' ? 'active' : ''}
            >
              <Translate content="search.refine.sort.priceDown" />
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
              <Translate content="search.refine.term.s" />
            </a>
          </li>
          <li>
            <a onClick={this._onRefine({ term: 'l' })}
              className={this.props.term === 'l' ? 'active' : ''}
            >
              <Translate content="search.refine.term.l" />
            </a>
          </li>
        </ul>
        <h3><Translate content="search.refine.room.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ room: 'any' })}
              className={this.props.room === 'any' ? 'active' : ''}
            >
              <Translate content="search.refine.room.any" />
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
          <li>
            <a onClick={this._onRefine({ room: 'car' })}
              className={this.props.room === 'car' ? 'active' : ''}
            >
              <Translate content="search.refine.room.car" />
            </a>
          </li>
        </ul>
        <h3><Translate content="search.refine.property.label" /></h3>
        <ul>
          <li>
            <a onClick={this._onRefine({ property: 'any' })}
              className={this.props.property === 'any' ? 'active' : ''}
            >
              <Translate content="search.refine.property.any" />
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
              <Translate content="search.refine.property.apartment" />
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
              <Translate content="search.refine.property.whole" />
            </a>
          </li>
        </ul>
        <a data-closerefine href="#">×</a>
      </div>
    )
  }
}

SearchRefine.propTypes = {
  suburb: React.PropTypes.string,
  price: React.PropTypes.string,
  offset: React.PropTypes.string,
  sort: React.PropTypes.string,
  term: React.PropTypes.string,
  room: React.PropTypes.string,
  property: React.PropTypes.string,
  feature: React.PropTypes.string,
  misc: React.PropTypes.string
}

export default SearchRefine
