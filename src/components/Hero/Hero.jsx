import Button from "../Button/Button";

const Hero = () => {
  return (
    <div className="hero">
      <div className="row align-items-center gy-5 gx-0">
        <div className="col-12 col-lg-6 text-primary">
          <h1 className="fw-bold display-5 mb-1">One More Friend</h1>
          <h2 className="fw-bold mb-5">Thousands More Fun</h2>
          <p className="text-muted mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
            laborum quisquam, quo nesciunt quam quibusdam beatae officiis
            quaerat dolor vero eveniet odio non tempora provident, natus eius
            cumque sunt doloribus.
          </p>
          <Button
            text={[
              "View Intro",
              <img
                src="icons/Play_Circle.png"
                className="ms-2"
                alt="Play Circle"
                key="image"
              />,
            ]}
            onClick={() => {}}
            bgColor="outline-primary"
          />

          <Button text="Explore Now" onClick={() => {}} bgColor="primary" />
        </div>
        <div className="col-12 col-lg-6">
          <img src="./heroImage.png" alt="Hero" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
