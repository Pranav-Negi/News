import React from "react";

const Newitem = (props) => {
  let { imgurl, newsurl } = props;
  return (
    <div className="my-3">
      <div className="card">
        <img
          src={imgurl ? imgurl : ""}
          className="card-img-top"
          alt="Pic not found"
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.author}</p>
          <p className="card-text">
            <small className="text-muted">
              Published at - {new Date(props.date).toUTCString()}
            </small>
          </p>
          <a
            href={newsurl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newitem;
