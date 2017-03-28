import React from 'react'


export const PreloaderComponent = React.createClass({

   render: function(){
    return (
        <div className="preloader-container">
           <h1 className="preloader-heading">M<span className="smallcaps">AGNOLIA</span> T<span className="smallcaps">REE</span> ID</h1> 
           <img className="preloader-img" src='../../images/mag-repeater.gif' />
           <h1 className="preloader-loading">L<span className="smallcaps">OADING</span></h1> 
       </div>)
   }
})
