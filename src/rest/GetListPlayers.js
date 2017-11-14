//GetListPlayers.js
import React, { Component } from 'react';
import Immutable from 'immutable';
import GetLastConnect from './GetLastConnect';
import '../App.css';
import config from '../config.json'; //config.X_API_Key

class GetListPlayers extends Component {
    
  constructor (props) { 
    super(props); 
    this.state = {
      getListOfMembers: false,
      parsePlayers: {}
    };

    
    this._getListPlayerOfClan = this._getListPlayerOfClan.bind( this );
  
    
  }
 

  componentWillMount (){
    
    this._getListPlayerOfClan( this.props.clanId, 1 );
    
  }


  
  
  
  _getListPlayerOfClan ( clan_id, pageNumber ){

    const request = 'https://www.bungie.net/Platform/GroupV2/' + clan_id + '/Members/?currentPage=' + pageNumber;
    
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
        
        //const parseResponse = Immutable.fromJS( responseJson );
      
        if ( responseJson.ErrorCode === 1 ){

          //console.log( '_getListPlayerOfClan', responseJson.Response.results );
          let parsePlayers = {};
          responseJson.Response.results.map( (item, index) => {
            //console.log( 'parse list of player', item.destinyUserInfo );
            
            parsePlayers[index] = {
              isOnline: item.isOnline,
              membershipId: item.destinyUserInfo.membershipId,
              membershipType: item.destinyUserInfo.membershipType,
              displayName: item.destinyUserInfo.displayName,
              lastPlayed: null,
            };
            this.setState({
              parsePlayers: Immutable.fromJS( parsePlayers ),
            });

            
          });
          /*
          var sorted = fiends.sort(
            (a, b) => a.get('name').localeCompare(b.get('name'))
          );
          sorted.map(x => x.get('name')).toJS();
          */
          let sortParsePlayers = this.state.parsePlayers.sort(
            (a, b) => a.get('displayName').localeCompare(b.get('displayName'))
          );
          
          this.setState({
            getListOfMembers: true,
            parsePlayers: sortParsePlayers
          });

        } else {
          console.log( 'error _getListPlayerOfClan', responseJson );
        }

            
      })
      .catch( (error) => {
        console.log( error );
      
      });

  }

  render () {

    const { getListOfMembers, parsePlayers } = this.state;
              
    /**
     *<div class="rTable">
<div class="rTableRow">
<div class="rTableHead"><strong>Name</strong></div>
<div class="rTableHead"><span style="font-weight: bold;">Telephone</span></div>
<div class="rTableHead">&nbsp;</div>
</div>
<div class="rTableRow">
<div class="rTableCell">John</div>
     */
    
    /**
      *   <div style={styles.rowStat} key={index} id={index}>
              <span style={styles.rowLineHidden}>IndexPlayer: {index}</span> &nbsp;
             
              {this._renderParsePlayer( item )}
            </div>
          
      */
    return (
      <div>
        <div className="rTable">
          <div className="rTableRow">
            <div className="rTableHead"><strong>PlayerName</strong></div>
            <div className="rTableHead"><span>LastDatePlayed</span></div>
            <div className="rTableHead"><span>PVE totalActivityDurationSeconds</span></div>
            <div className="rTableHead"><span>PVE efficiency</span></div>
            <div className="rTableHead"><span>PVP totalActivityDurationSeconds</span></div>
            <div className="rTableHead"><span>PVP efficiency</span></div>
            
          </div>

          { parsePlayers.size > 0 && 
          parsePlayers.map( (item, index) => 
           
            <div className="rTableRow" key={index}>
              <div className="rTableCell">{item.get('displayName')}</div>
              <div className="rTableCell">
                <GetLastConnect membershipId={item.get('membershipId')} membershipType={item.get('membershipType')}/>
          
              </div>
              <div className="rTableCell">&nbsp;</div>
              <div className="rTableCell">&nbsp;</div>
              <div className="rTableCell">&nbsp;</div>
              <div className="rTableCell">&nbsp;</div>
            </div>  
         
              
           
          )
          }
        </div>
      </div>
    );


   
  }
   
 

  
}


var styles = {
  
  /*rTable: {
    display: 'table',
    width: '100%',
  },
  rTableRow: {
    display: 'table-row',
  },
  rTableHeading: {
    display: 'table-header-group',
    backgroundColor: '#ddd',
    fontWeight: 'bold',
  },
  rTableCell: {
    display: 'table-cell',
    padding: '3px 10px',
    border: '1px solid #999999',
  },
  rTableHead: {
    display: 'table-cell',
    padding: '3px 10px',
    border: '1px solid #999999',
  },
  rTableFoot: {
    display: 'table-footer-group',
    fontWeight: 'bold',
    backgroundColor: '#ddd',
  },
  rTableBody: {
    display: 'table-row-group',
  }*/

};


export default GetListPlayers;


/** */