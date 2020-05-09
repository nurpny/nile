/* global google */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShippingAddress from './ShippingAddress'
import { updatingShipping } from '../store/order'
import styled from 'styled-components'


const StyledInput = styled.input`
  width: 80%;
`

export class ShippingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      disabled: true,
    }
    this.autocomplete = null
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePlacesSelect = this.handlePlacesSelect.bind(this)
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
    this.autocomplete.addListener("place_changed", this.handlePlacesSelect)
    if (!this.props.order.id) {
      this.props.history.push('/cart');
    }
  }

  handlePlacesSelect() {
    let addressObj = this.autocomplete.getPlace();
    let address = addressObj.address_components;
    this.setState({
      address: `${address[0].long_name} ${address[1].long_name}`,
      city: address[2].short_name,
      state: address[5].short_name,
      zipcode: address[7].short_name,
    })
    if (this.state.name.length && this.state.address.length &&
      this.state.city.length && this.state.state.length && this.state.zipcode.length) {
      this.setState({ disabled: false })
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
    if (this.state.name.length && this.state.address.length &&
      this.state.city.length && this.state.state.length && this.state.zipcode.length) {
      this.setState({ disabled: false })
    }
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    await this.props.onSubmit(this.props.order.id, this.state.address, this.state.city, this.state.state, this.state.zipcode);
    this.props.showStripe();
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Recipient Name: </label>
            <StyledInput type='text' name='name' required onChange={this.handleChange} />
          </div>
          <div >
            <label>Enter Address: </label>
            <StyledInput type='text' id="autocomplete" required />
          </div>

          <div >
            <ShippingAddress address={this.state.address} city={this.state.city} state={this.state.state} zipcode={this.state.zipcode} />
          </div>
          <button type='submit' onClick={this.handleSubmit} disabled={this.state.disabled}>Continue to Payment</button>
        </form>
    )
  }
}

const mapStateToProps = (state) => ({
  order: state.order
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (orderId, address, city, state, zipCode) => dispatch(updatingShipping(orderId, address, city, state, zipCode)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm)



