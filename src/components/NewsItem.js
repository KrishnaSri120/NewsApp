import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsurl, author, date, source } = props
  return (
    <div className='my-3'>
      <div className="card">
        <div style={{ display: "flex", justifyContent: 'flex-end', position: "absolute", right: "0" }}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
        </div>
        <img src={!imageUrl ? "https://cdn.thewire.in/wp-content/uploads/2023/07/02125454/A-car-burns-in-France-800x400.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsurl} target='_black' className="btn btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )

}
export default NewsItem
