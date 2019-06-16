import React from 'react';


const Pages = props => {
    const count = props.count;
    let pages, template = ``;
    if(count % 3 === 0)  pages = count / 3;
    if(count % 3 !== 0)  pages = parseInt(count / 3) + 1;
    
    for(let i = 1; i <= pages; i++) {
       template += `<a href='/page=${i}' class='page' onClick='() => ${i}'>${i}</a>`
    }

    return (
        <div className='pages-container' dangerouslySetInnerHTML={{__html: 
            template}}>
          
        </div>
    )

}
export default Pages;