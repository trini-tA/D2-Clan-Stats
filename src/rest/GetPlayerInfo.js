//getPlayerInfo.js
import React, { Component } from 'react';
import Immutable from 'immutable';
import GetLastConnect from './GetLastConnect';
import config from '../config.json'; //config.X_API_Key

class GetPlayerInfo extends Component {
    
  constructor (props) { 
    super(props); 
    this.state = {
      stats_get: false,
      stats_merged: {},
      stats_PVE: {},
      stats_PVP: {},
    };

    this._getPlayerStat = this._getPlayerStat.bind( this );
    
  }
 

  componentWillMount (){

    this._getPlayerStat( this.props.membershipId, this.props.membershipType );
    
  }
  

  _getPlayerStat ( membershipId, membershipType ){

    const request = 'https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Account/' + membershipId + '/Stats';
    
    fetch( request, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-Key': config.X_API_Key,
      },
            
    } )
      .then((response) => response.json() )
      .then((responseJson) => {
        
        const parseResponse = Immutable.fromJS( responseJson );
        const allTime = parseResponse.get('Response').get('mergedAllCharacters').get('merged').get('allTime');
      
        if ( responseJson.ErrorCode === 1 ){

          this.setState({ 
            stats_merged: allTime,
            stats_get: true 
          });
          
        } else {
          console.log( 'error no stat for player !' );
        }

            
      })
      .catch( (error) => {
        console.log( error );
      
      });
      
        
  }

  
  
 

  render () {

    const { stats_merged, stats_get, stats_PVE, stats_PVP } = this.state;
    
    
    if ( !stats_get ){
      this._getPlayerStat( membershipId, membershipType );
    }
    
    return (
      <div>
       
        
      </div>
    );


    
  }
  
}
  
  
  


var styles = {
  
};


export default GetPlayerInfo;


