import React from 'react'


export const PreloaderComponent = React.createClass({

   render: function(){
     if(this.props.ready === false){

      return (
       <div className = "preloader-container">
           <img className = "preloader-img" src = '../../images/mag-preload.gif'/>
       </div>
     )
   } else {
     return (
       <div className="hidden-div"></div>
     )
   }
 }
})
