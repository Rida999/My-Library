import { Link } from 'react-router-dom';

const categoryCopy = { Horror: 'Dark corners and sleepless nights', 'Detective-and-Mystery': 'Clues, secrets, and sharp minds', Romance: 'Love stories in every register', 'Kid-Zone': 'Big worlds for young readers', Historical: 'The past, vividly retold', 'Comic-Book': 'Stories in bold panels', 'Action-and-Adventure': 'Journeys beyond the familiar' };

export default function Categories({ books }) {
  const groups = Object.entries(categoryCopy);
  return <main className="page categories-page"><div className="page-heading"><p className="eyebrow">Browse by mood</p><h1>Every shelf has a doorway</h1><p>Move through the collection by genre and find the kind of story today calls for.</p></div><div className="category-grid">{groups.map(([name, copy]) => { const matches = books.filter((book) => book.category === name); return <Link className="category-tile" to={`/categories/${name}`} key={name}>{matches[0]?.url && <img src={matches[0].url} alt="" />}<div><span>{matches.length} books</span><h2>{name.replaceAll('-', ' ')}</h2><p>{copy}</p></div></Link>; })}</div></main>;
}
