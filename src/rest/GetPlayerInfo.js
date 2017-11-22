//getPlayerInfo.js
import React, { Component } from 'react';
import Immutable from 'immutable';
import config from '../config.json'; //config.X_API_Key

class GetPlayerInfo extends Component {
    
  constructor (props) { 
    super(props); 

    this.state = {
      stats_get: false,
      pvp_efficiency: -1,
      pve_efficiency: -1,
      pvp_totalActivityDurationSeconds: -1,
      pve_totalActivityDurationSeconds: -1,
    };

    this._getPlayerStat = this._getPlayerStat.bind( this );
    
  }
 

  componentWillMount (){
    // <GetPlayerInfo membershipId={item.get('membershipId')} membershipType={item.get('membershipType')} />
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
        

        if ( responseJson.ErrorCode === 1 ){

          const results = parseResponse.get('Response').get('mergedAllCharacters').get('results');
          const pvp = results.get('allPvP').get('allTime');
          const pve = results.get('allPvE').get('allTime');

          let pvp_efficiency = -1;
          if ( pvp.get('killsDeathsRatio' ) != undefined ){
            pvp_efficiency = pvp.get('killsDeathsRatio' ).get('basic').get('displayValue');
          }

          let pvp_totalActivityDurationSeconds = -1;
          if ( pvp.get('totalActivityDurationSeconds' ) != undefined ){
            pvp_totalActivityDurationSeconds = pvp.get('totalActivityDurationSeconds' ).get('basic').get('displayValue');
          }

          let pve_efficiency = -1;
          if ( pve.get('efficiency') != undefined ){
            pve_efficiency = pve.get('efficiency' ).get('basic').get('displayValue');
          }
          
          let pve_totalActivityDurationSeconds = -1;
          if ( pve.get('totalActivityDurationSeconds' ) != undefined ){
            pve_totalActivityDurationSeconds = pve.get('totalActivityDurationSeconds' ).get('basic').get('displayValue');
          }

          this.setState({ 
            pvp_efficiency: pvp_efficiency,
            pvp_totalActivityDurationSeconds: pvp_totalActivityDurationSeconds,
            
            pve_efficiency: pve_efficiency,
            pve_totalActivityDurationSeconds: pve_totalActivityDurationSeconds,

            stats_get: true 
          });
          /**"efficiency": {
							"statId": "efficiency",
							"basic": {
								"value": 10.469309462915602,
								"displayValue": "10.47"
							}
						}, */
        } else {
          console.log( 'error no stat for player !' );
        }

            
      })
      .catch( (error) => {
        console.log( error );
      
      });
      
        
  }

  
  
 

  render () {

    const { stats_get, pvp_efficiency, pve_efficiency, pvp_totalActivityDurationSeconds, pve_totalActivityDurationSeconds } = this.state;
    
   
    return (
      <span>
        <div className="rTableCell">{ stats_get && pve_totalActivityDurationSeconds}</div>
        <div className="rTableCell">{ stats_get && pve_efficiency}</div>
        <div className="rTableCell">{ stats_get && pvp_totalActivityDurationSeconds}</div>
        <div className="rTableCell">{ stats_get && pvp_efficiency}</div>
      </span>
    );


    
  }
  
}
  
  
  


var styles = {
  
};


export default GetPlayerInfo;


