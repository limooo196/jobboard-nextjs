import React from 'react'


function FullCard(props) {

  var stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  };

  var parse = require('html-react-parser');
  const test = stringToHTML("<p>Wolfram, creator of Mathematica, WolframlAlpha and the Wolfram Language, is seeking an In-House Immigration Counsel. The In-House Immigration Counsel is responsible for providing legal advice and services for the company and employees for a wide variety of immigration matters and, occasionally, other legal matters.</p> ")

 var desc =  JSON.stringify(props.description)
 
var desc1 = parse(String(props.description))

 console.log(typeof(desc))
  return (
    <div>
      <div className='  text-black my-3 md:w-4/6 m-auto bg-yellow-200 rounded-lg border-2 w-10/12 p-4'> 
      <p> 
      {desc1}


      </p>
       
    </div>

    </div>
  )
}

export default FullCard