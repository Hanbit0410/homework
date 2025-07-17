import React from 'react';

const ChildComponents = React.memo(({name})=> {
  console.log('child components');
  return (
    <div>
      <p>안녕 나는 {name}이다. </p>
    </div>
  );
})

export default ChildComponents;