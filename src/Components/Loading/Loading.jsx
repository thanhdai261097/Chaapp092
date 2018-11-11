import React from 'react';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    type="Puff"
    color="#00BFFF"
    height="150"	
    width="150"
`;
 
class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
      <center>
        <ClipLoader
          className={override}
          loading={this.state.loading}
        />
        </center>
      </div> 
    )
  }
}
export default Loading