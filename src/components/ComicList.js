import './comic.css'

const ComicList = ({data, showError}) => {
  if (showError === true) {
    return(
      <h2>404: No comics found</h2>
    )
  } else {
    return(
      <div className="comic-list">
      {data.map(comic => {
        return(
          <div key={comic.id} className="comic">
            <h2>{comic.title}</h2>
            <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt="thumbnail"/>
          </div>
        )
      })}
      </div>
    )
  }
}

export default ComicList
