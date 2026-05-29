import "./countrySkeleton.css";

function CountrySkeleton() {

  return (

    <div className="countrySkeleton">

      <div className="skeletonNav"></div>

      <div className="skeletonSection large"></div>

      <div className="skeletonGrid">

        <div className="skeletonCard"></div>

        <div className="skeletonCard"></div>

      </div>

      <div className="skeletonSection"></div>

      <div className="skeletonGrid">

        <div className="skeletonCard"></div>

        <div className="skeletonCard"></div>

      </div>

    </div>

  );
}

export default CountrySkeleton;