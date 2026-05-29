import "./CompareCountriesBar.css";

function CompareCountriesBar({
  leftCountry,
  rightCountry
}) {

  return (

    <div className="compareCountriesBar">

      <span>
        {leftCountry}
      </span>

      <div className="compareBarLine"></div>

      <span>
        {rightCountry}
      </span>

    </div>

  );

}

export default CompareCountriesBar;