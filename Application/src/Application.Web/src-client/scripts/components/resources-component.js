import React from 'react'
import { STORE } from '../store.js'
import { ACTIONS } from '../actions.js'

export const ResourcesComponent = React.createClass({

  render: function () {
    return (
      <div className="resource-container">
        <h1 className="resource-title">R<span className="smallcaps">ESOURCES</span></h1>
        <div className="resource-line"></div>
        <div className="resource-call-to-action">
          <div className="resource-action resource-pill">
            <p>TREE INFORMATION</p>
            <p>Kirkman, L. Katherine, Claud L. Brown, and Donald Joseph Leopold. 2007. Native trees of the Southeast: [an identification guide]. Portland, Or. [u.a.]: Timber Press.</p>
          </div>
          <div className="landing-identify-action resource-pill">
            <p>TREE INFORMATION</p>
            <p>Wikipedia contributors, "Glossary of leaf morphology," Wikipedia, The Free Encyclopedia, https://en.wikipedia.org/w/index.php?title=Glossary_of_leaf_morphology&oldid=767013415 (accessed March 29, 2017).</p>
          </div>
          <div className="resource-and">
            <em>— and —</em>
          </div>
          <div className="resource-action resource-pill">
            <p> DRAWINGS</p>
            <p> Flora of China Project. 1990. Flora of China. [Cambridge, Mass.]: [Flora of China Project]. http://bibpurl.oclc.org/web/4181.</p>
          </div>
          <div className="resource-action resource-pill">
            <p> DRAWINGS</p>
            <p> Russischer Gartenbau-Verein in St. Petersburg, Kaiserliche Russischer Gartenbau-Verein in St. Petersburg, Deutsche Gartenbau-Gesellschaft, and Verein zur Befrderung des Gartenbaues in den Kniglich Preussisch. 1852. Gartenflora. [Place of publication not identified]: [publisher not identified]. http://www.biodiversitylibrary.org/title/6769.</p>
          </div>
        </div>
      </div>
    )
  }
})
