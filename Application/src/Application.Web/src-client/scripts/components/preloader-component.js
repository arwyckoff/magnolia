import React from 'react'


export const PreloaderComponent = React.createClass({

   render: function(){
    return (
       <div className = "preloader-container">
           <img className = "preloader-img" src = '../../images/mag-preload.gif'/>
       </div>)
   }
})
