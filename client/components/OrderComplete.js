import React from 'react'
import { connect } from 'react-redux'

function OrderComplete(props) {
  return (
    <div>
      Order has been completed.
      Order #{props.order.id}
    </div>
  )
}


const mapStateToProps = (state) => ({
  order: state.order
})



export default connect(mapStateToProps)(OrderComplete)
