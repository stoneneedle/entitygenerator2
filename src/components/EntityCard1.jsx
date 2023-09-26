import _ from 'lodash';

export default function EntityCard(props) {
  const entityItems = props.keysArray.map((key, i) => 
  <li key={key}><b>{_.capitalize(key)}:</b> {_.capitalize(props.entity[key])}</li>
  );
  return(
    <>
      <div className="entityCard">
        {entityItems}
      </div>
    </>
  );
}