import "./SectionHeader.css";

function SectionHeader({
  liveText,
  label,
  title,
  dotColor
}) {

  return (

    <div className="sectionHeader">

      <div className="sectionLiveIndicator">

        <div
          className="sectionLiveDot"
          style={{
            background: dotColor,
            boxShadow: `0 0 12px ${dotColor}`
          }}
        ></div>

        <span>
          {liveText}
        </span>

      </div>

      <p className="sectionLabel">
        {label}
      </p>

      <h1 className="sectionTitle">
        {title}
      </h1>

    </div>

  );

}

export default SectionHeader;