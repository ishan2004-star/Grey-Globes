import "./compareSplitLayout.css";

function CompareSplitLayout({
left,
right,
sectionTitle,
sectionLabel,
id
}) {

return (


<section
  id={id}
  className="compareSplitSection"
>

  <div className="compareSplitHeader">

    <span>
      {sectionLabel}
    </span>

    <h1>
      {sectionTitle}
    </h1>

  </div>

  <div className="compareSplitGrid">

    <div className="comparePanel">

      {left}

    </div>

    <div className="compareCenterLine">

      <div className="compareLine"></div>

    </div>

    <div className="comparePanel">

      {right}

    </div>

  </div>

</section>


);

}

export default CompareSplitLayout;
