//GetLastConnect.js
import React, { Component } from 'react';
import config from '../config.json'; //config.X_API_Key

//<GetLastConnect membershipId={item.get('membershipId')} membershipType={item.get('membershipType')}/>
class GetLastConnect extends Component {
    
  constructor (props) { 
    super(props); 
    
    this.state = {
      lastPlayDate_get: false,
      lastPlayDate: '',
      
    };

    this._getPlayerLastConnect = this._getPlayerLastConnect.bind( this );

    
  }
 

  componentWillMount (){

    this._getPlayerLastConnect( this.props.membershipId, this.props.membershipType );

  }


  


  _getPlayerLastConnect ( membershipId, membershipType ){
    //
    const request = 'https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Profile/' + membershipId + '/?components=100,1';
    
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
             
        if ( responseJson.ErrorCode === 1 ){
          const responsePlayer = responseJson.Response;
          if ( responsePlayer.size > 1 ){
            console.log( 'Error more player find not just one !');
          } else {
           
            //console.log( 'responsePlayer ', responsePlayer);
            this.setState({
              lastPlayDate_get: true,
              lastPlayDate: responsePlayer.profile.data.dateLastPlayed,
            });
            
            
                
          }
        } else {
          console.log( 'error for this player last date played message ' + responseJson.Message );
        }
                          
            
      })
      .catch( (error) => {
        console.log( error );
      
      });
      
        
  }

  
  render () {

    const { lastPlayDate } = this.state;
    
    
    return (
      
      <span>{lastPlayDate}</span>
        
      
    );


   
  }
   
  
}


var styles = {
  rowStat: {
    display: 'inline-block',
    width: '100%', 
    height: '50%',
    backgroundColor: 'none',
    marginLeft: 10,
  },
  rowLine: {
    display: 'inline-block',
   
    backgroundColor: 'none',
  },
  spanLine: {
    marginLeft: 10,
  }

};


export default GetLastConnect;

